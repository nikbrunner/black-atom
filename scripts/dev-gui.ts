import { join } from "node:path";

export function createGuiRefresh(sessionDirectory: string) {
    const directory = join(sessionDirectory, "gui-watch");
    Deno.mkdirSync(directory);
    let previous = "";
    return {
        directory,
        config: JSON.stringify({ build: { additionalWatchFolders: [directory] } }),
        publish(embeddedFingerprint: string) {
            if (previous && previous !== embeddedFingerprint) {
                Deno.writeTextFileSync(join(directory, "embedded"), embeddedFingerprint);
            }
            previous = embeddedFingerprint;
        },
    };
}
