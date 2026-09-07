import { fileURLToPath } from "node:url";

export const repoRoot = new URL("../", import.meta.url);
export const targetDirectory = fileURLToPath(new URL("target/", repoRoot));

export async function run(args: string[], cwd = repoRoot) {
    const [command, ...commandArgs] = args;
    const status = await new Deno.Command(command, {
        args: commandArgs,
        cwd,
        env: { CARGO_TARGET_DIR: targetDirectory },
        stdin: "inherit",
        stdout: "inherit",
        stderr: "inherit",
    }).spawn().status;
    if (!status.success) throw new Error(`${args.join(" ")} failed (${status.code})`);
}

export async function build(
    { appOnly = false, bundles = Deno.build.os === "darwin" ? "app" : undefined }: {
        appOnly?: boolean;
        bundles?: string;
    } = {},
) {
    await run([Deno.execPath(), "run", "-A", "core/src/tasks/generate.ts"]);
    await run([
        Deno.execPath(),
        "run",
        "-A",
        "npm:@tauri-apps/cli",
        "build",
        ...(bundles ? ["--bundles", bundles] : []),
    ], new URL("livery/", repoRoot));
    if (!appOnly) await run(["cargo", "build", "--release", "-p", "livery-cli"]);
}

if (import.meta.main) await build();
