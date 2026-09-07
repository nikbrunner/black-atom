import { assertEquals } from "@std/assert";
import { join } from "@std/path";
import { config } from "../../config.ts";
import { isGenerationInput } from "./watch.ts";
import { copyToVault } from "./obsidian.ts";

Deno.test("generation inputs include sources and Obsidian styles, excluding generated output", () => {
    for (
        const path of [
            "obsidian/styles/ui/editor.css",
            "obsidian/styles/ui/a.settings.yaml",
            "ghostty/themes/default/collection.template",
        ]
    ) {
        const actual = path.endsWith(".template") ? path + ".conf" : path;
        assertEquals(isGenerationInput(join(config.dir.adapters, actual)), true);
    }
    assertEquals(isGenerationInput(join(config.dir.themes, "default.ts")), true);
    for (
        const path of [
            "ghostty/themes/default/generated.conf",
            "obsidian/theme.css",
            "obsidian/styles/editor.css.tmp",
        ]
    ) {
        assertEquals(isGenerationInput(join(config.dir.adapters, path)), false);
    }
});

Deno.test("Obsidian dev copy writes CSS and renamed manifest to explicit temporary vault", async () => {
    const vault = await Deno.makeTempDir();
    const previous = Deno.env.get("OBSIDIAN_DEV_VAULT");
    Deno.env.set("OBSIDIAN_DEV_VAULT", vault);
    try {
        await copyToVault();
        const dest = join(vault, ".obsidian/themes/Black Atom Development");
        assertEquals(
            await Deno.readTextFile(join(dest, "theme.css")),
            await Deno.readTextFile(join(config.dir.adapters, "obsidian/theme.css")),
        );
        assertEquals(
            JSON.parse(await Deno.readTextFile(join(dest, "manifest.json"))).name,
            "Black Atom Development",
        );
    } finally {
        if (previous === undefined) Deno.env.delete("OBSIDIAN_DEV_VAULT");
        else Deno.env.set("OBSIDIAN_DEV_VAULT", previous);
        await Deno.remove(vault, { recursive: true });
    }
});

import { assertRejects } from "@std/assert";
import { generateDevelopment } from "./watch.ts";

Deno.test("development generation skips disabled templates and rejects malformed configs", async () => {
    const fixture = await Deno.makeTempDir();
    const adapter = join(fixture, "disabled");
    await Deno.mkdir(adapter);
    const configPath = join(adapter, "black-atom-adapter.json");
    const marker = join(adapter, "postGenerate-ran");
    const script = join(adapter, "postGenerate.ts");
    await Deno.writeTextFile(
        script,
        `Deno.writeTextFileSync(${JSON.stringify(marker)}, "generated");`,
    );
    const adapterConfig = {
        $schema: "schema.json",
        collections: {},
        enabled: false,
        postGenerate: `${Deno.execPath()} run -A ${script}`,
    };
    const original = Object.getOwnPropertyDescriptor(config, "dir")!;
    const directories = config.dir;
    Object.defineProperty(config, "dir", {
        get: () => ({ ...directories, adapters: fixture }),
        configurable: true,
    });
    try {
        await Deno.writeTextFile(configPath, JSON.stringify(adapterConfig));
        await generateDevelopment([join(adapter, "collection.template.conf")]);
        await assertRejects(() => Deno.stat(marker), Deno.errors.NotFound);
        await Deno.writeTextFile(configPath, JSON.stringify({ ...adapterConfig, enabled: true }));
        await generateDevelopment([configPath]);
        assertEquals(await Deno.readTextFile(marker), "generated");
        await Deno.remove(marker);
        await Deno.writeTextFile(configPath, "{");
        await assertRejects(
            () => generateDevelopment([configPath]),
            Error,
            "Cannot read adapter config",
        );
        await assertRejects(() => Deno.stat(marker), Deno.errors.NotFound);
    } finally {
        Object.defineProperty(config, "dir", original);
        await Deno.remove(fixture, { recursive: true });
    }
});
