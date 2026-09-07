import { assertEquals, assertRejects } from "@std/assert";
import { join } from "@std/path";
import { discoverAdapters } from "./discover-adapters.ts";

Deno.test("adapter discovery skips missing configs and disabled adapters", async () => {
    const directory = await Deno.makeTempDir();
    try {
        for (const name of ["missing", "disabled", "enabled"]) {
            await Deno.mkdir(join(directory, name));
        }
        for (const enabled of [false, true]) {
            const name = enabled ? "enabled" : "disabled";
            await Deno.writeTextFile(
                join(directory, name, "black-atom-adapter.json"),
                JSON.stringify({ $schema: "schema.json", collections: {}, enabled }),
            );
        }
        assertEquals(await discoverAdapters(directory), ["enabled"]);
    } finally {
        await Deno.remove(directory, { recursive: true });
    }
});

Deno.test("adapter discovery rejects malformed JSON and invalid schema with config path", async () => {
    const directory = await Deno.makeTempDir();
    const adapter = join(directory, "broken");
    const configPath = join(adapter, "black-atom-adapter.json");
    try {
        await Deno.mkdir(adapter);
        for (const content of ["{", JSON.stringify({ $schema: "schema.json", collections: 42 })]) {
            await Deno.writeTextFile(configPath, content);
            await assertRejects(() => discoverAdapters(directory), Error, configPath);
        }
    } finally {
        await Deno.remove(directory, { recursive: true });
    }
});
