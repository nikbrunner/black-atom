import { strict as assert } from "node:assert";
import { join } from "node:path";
import { installMacos } from "./install-macos.ts";

Deno.test("installation builds before replacing both artifacts and preserves executable mode", async () => {
    const root = await Deno.makeTempDir();
    try {
        const artifactRoot = join(root, "release");
        const appDestination = join(root, "Applications/livery.app");
        const cliDestination = join(root, "bin/livery");
        await Deno.mkdir(appDestination, { recursive: true });
        await Deno.writeTextFile(join(appDestination, "old"), "old");
        await installMacos({
            artifactRoot,
            appDestination,
            cliDestination,
            buildArtifacts: async (options) => {
                assert.equal(options?.bundles, "app");
                assert.equal(await Deno.readTextFile(join(appDestination, "old")), "old");
                await Deno.mkdir(join(artifactRoot, "bundle/macos/livery.app"), {
                    recursive: true,
                });
                await Deno.writeTextFile(join(artifactRoot, "bundle/macos/livery.app/new"), "new");
                await Deno.writeTextFile(join(artifactRoot, "livery"), "#!/bin/sh\nexit 0\n", {
                    mode: 0o755,
                });
            },
        });
        assert.equal(await Deno.readTextFile(join(appDestination, "new")), "new");
        assert.equal((await Deno.stat(cliDestination)).mode! & 0o111, 0o111);
    } finally {
        await Deno.remove(root, { recursive: true });
    }
});

Deno.test("build failure leaves installed artifacts untouched", async () => {
    const root = await Deno.makeTempDir();
    try {
        const appDestination = join(root, "livery.app");
        const cliDestination = join(root, "livery");
        await Deno.writeTextFile(appDestination, "old app");
        await Deno.writeTextFile(cliDestination, "old cli");
        await assert.rejects(() =>
            installMacos({
                appDestination,
                cliDestination,
                buildArtifacts: () => Promise.reject(new Error("build failed")),
            }), /build failed/);
        assert.equal(await Deno.readTextFile(appDestination), "old app");
        assert.equal(await Deno.readTextFile(cliDestination), "old cli");
    } finally {
        await Deno.remove(root, { recursive: true });
    }
});

Deno.test("CLI installation failure reports app partial success", async () => {
    const root = await Deno.makeTempDir();
    try {
        await Deno.mkdir(join(root, "bundle/macos/livery.app"), { recursive: true });
        await assert.rejects(() =>
            installMacos({
                artifactRoot: root,
                appDestination: join(root, "installed.app"),
                cliDestination: join(root, "bin/livery"),
                buildArtifacts: () => Promise.resolve(),
            }), /App installed.*CLI installation failed/);
        assert.equal((await Deno.stat(join(root, "installed.app"))).isDirectory, true);
    } finally {
        await Deno.remove(root, { recursive: true });
    }
});
