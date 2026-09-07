import { load } from "@std/dotenv";
import { join } from "@std/path";
import { config } from "../../config.ts";

const adapterDir = join(config.dir.adapters, "obsidian");

export async function copyToVault(): Promise<void> {
    const env = await load({ envPath: join(adapterDir, ".env") });
    const raw = Deno.env.get("OBSIDIAN_DEV_VAULT") ?? env.OBSIDIAN_DEV_VAULT;
    if (!raw) return;
    const vault = raw.startsWith("~/") ? join(Deno.env.get("HOME")!, raw.slice(2)) : raw;
    const dest = join(vault, ".obsidian/themes/Black Atom Development");
    await Deno.mkdir(dest, { recursive: true });
    await Deno.copyFile(join(adapterDir, "theme.css"), join(dest, "theme.css"));
    const manifest = JSON.parse(await Deno.readTextFile(join(adapterDir, "manifest.json")));
    manifest.name = "Black Atom Development";
    await Deno.writeTextFile(join(dest, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
    console.log(`Copied Obsidian theme to ${dest}`);
}
