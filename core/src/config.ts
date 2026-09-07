import { fromFileUrl, join } from "@std/path";

export const config = {
    adapterFileName: "black-atom-adapter.json",
    get dir() {
        return {
            core: fromFileUrl(new URL("../", import.meta.url)),
            themes: join(fromFileUrl(new URL("../", import.meta.url)), "src", "themes"),
            adapters: fromFileUrl(new URL("../../adapters", import.meta.url)),
        };
    },
} as const;
