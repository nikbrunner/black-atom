import { build, targetDirectory } from "./build.ts";
import { cp } from "node:fs/promises";
import { dirname, join } from "node:path";

export async function installArtifact(source: string, destination: string) {
    await Deno.mkdir(dirname(destination), { recursive: true });
    const staging = await Deno.makeTempDir({
        dir: dirname(destination),
        prefix: ".livery-install-",
    });
    const prepared = join(staging, "prepared");
    const backup = join(staging, "previous");
    try {
        await cp(source, prepared, { recursive: true, preserveTimestamps: true });
        let previous = false;
        try {
            await Deno.rename(destination, backup);
            previous = true;
        } catch (error) {
            if (!(error instanceof Deno.errors.NotFound)) throw error;
        }
        try {
            await Deno.rename(prepared, destination);
        } catch (error) {
            if (previous) await Deno.rename(backup, destination);
            throw error;
        }
    } finally {
        await Deno.remove(staging, { recursive: true });
    }
}

export async function installMacos({
    appOnly = false,
    appDestination = "/Applications/livery.app",
    cliDestination = join(
        Deno.env.get("CARGO_HOME") ?? join(Deno.env.get("HOME")!, ".cargo"),
        "bin/livery",
    ),
    buildArtifacts = build,
    artifactRoot = join(targetDirectory, "release"),
} = {}) {
    await buildArtifacts({ appOnly, bundles: "app" });
    await installArtifact(join(artifactRoot, "bundle/macos/livery.app"), appDestination);
    console.log(`Installed app: ${appDestination}`);
    if (!appOnly) {
        try {
            await installArtifact(join(artifactRoot, "livery"), cliDestination);
            console.log(`Installed CLI: ${cliDestination}`);
        } catch (error) {
            throw new Error(
                `App installed at ${appDestination}; CLI installation failed: ${error}`,
            );
        }
    }
}

if (import.meta.main) {
    if (Deno.build.os !== "darwin") throw new Error("install:macos requires macOS");
    await installMacos({ appOnly: Deno.args.includes("--app-only") });
}
