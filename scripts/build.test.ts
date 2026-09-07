import { strict as assert } from "node:assert";
import { fileURLToPath } from "node:url";
import { repoRoot, run } from "./build.ts";

Deno.test("release commands share the installer target despite inherited CARGO_TARGET_DIR", async () => {
    const fixture = await Deno.makeTempDir();
    const previous = Deno.env.get("CARGO_TARGET_DIR");
    Deno.env.set("CARGO_TARGET_DIR", `${fixture}/custom-target`);
    try {
        for (const cwd of [repoRoot, new URL("livery/", repoRoot)]) {
            const output = `${fixture}/target-directory`;
            await run([
                Deno.execPath(),
                "eval",
                "--no-config",
                'Deno.writeTextFileSync(Deno.args[0], Deno.env.get("CARGO_TARGET_DIR")!);',
                output,
            ], cwd);
            assert.equal(
                await Deno.readTextFile(output),
                fileURLToPath(new URL("target/", repoRoot)),
            );
        }
    } finally {
        if (previous === undefined) Deno.env.delete("CARGO_TARGET_DIR");
        else Deno.env.set("CARGO_TARGET_DIR", previous);
        await Deno.remove(fixture, { recursive: true });
    }
});
