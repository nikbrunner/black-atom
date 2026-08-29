import { assertEquals, assertStringIncludes } from "@std/assert";
import { join } from "@std/path";

const repoRoot = Deno.cwd().endsWith("/core") ? join(Deno.cwd(), "..") : Deno.cwd();
const installer = join(repoRoot, ".claude/hooks/install-cli.sh");

async function makeExecutable(path: string, contents: string) {
    await Deno.writeTextFile(path, contents);
    await Deno.chmod(path, 0o755);
}

Deno.test("Livery installer generates adapters before installing when outputs change", async () => {
    const root = await Deno.makeTempDir();
    const bin = join(root, "bin");
    const log = join(root, "commands.log");
    await Deno.mkdir(join(root, "livery/cli/src"), { recursive: true });
    await Deno.mkdir(join(root, "livery/core/src"), { recursive: true });
    await Deno.mkdir(join(root, "adapters"), { recursive: true });
    await Deno.mkdir(bin);
    await Deno.writeTextFile(join(root, "livery/cli/Cargo.toml"), "[package]\n");
    await Deno.writeTextFile(join(root, "livery/core/Cargo.toml"), "[package]\n");
    await Deno.writeTextFile(join(root, "Cargo.lock"), "lock\n");

    await makeExecutable(
        join(bin, "deno"),
        `#!/bin/sh
printf 'deno %s\\n' "$*" >> "$TEST_LOG"
printf '%s\\n' "\${TEST_GENERATED:-generated}" > "$TEST_ROOT/adapters/generated.theme"
`,
    );
    await makeExecutable(
        join(bin, "cargo"),
        `#!/bin/sh
printf 'cargo %s\\n' "$*" >> "$TEST_LOG"
`,
    );
    await makeExecutable(join(bin, "livery"), "#!/bin/sh\n");

    async function runInstaller(testGenerated: string) {
        const result = await new Deno.Command(installer, {
            cwd: root,
            env: {
                PATH: `${bin}:/usr/bin:/bin:/usr/sbin:/sbin`,
                LIVERY_ROOT: root,
                TEST_GENERATED: testGenerated,
                TEST_LOG: log,
                TEST_ROOT: root,
            },
            stdout: "piped",
            stderr: "piped",
        }).output();
        assertEquals(result.code, 0);
    }

    await runInstaller("generated");
    let commands = await Deno.readTextFile(log);
    assertStringIncludes(commands, "deno task generate");
    assertStringIncludes(commands, "cargo install --locked --path");
    assertEquals(commands.indexOf("deno task generate") < commands.indexOf("cargo install"), true);

    await runInstaller("generated");
    commands = await Deno.readTextFile(log);
    assertEquals(commands.match(/^cargo /gm)?.length, 1);

    await runInstaller("changed");
    commands = await Deno.readTextFile(log);
    assertEquals(commands.match(/^cargo /gm)?.length, 2);
});

Deno.test("Livery installer status mode exits non-zero when generation fails", async () => {
    const root = await Deno.makeTempDir();
    const bin = join(root, "bin");
    await Deno.mkdir(join(root, "livery/cli"), { recursive: true });
    await Deno.mkdir(bin);
    await makeExecutable(join(bin, "deno"), "#!/bin/sh\nexit 42\n");

    const result = await new Deno.Command(installer, {
        args: ["--status-exit"],
        cwd: root,
        env: {
            PATH: `${bin}:/usr/bin:/bin:/usr/sbin:/sbin`,
            LIVERY_ROOT: root,
        },
        stdout: "piped",
        stderr: "piped",
    }).output();

    assertEquals(result.code, 1);
});
