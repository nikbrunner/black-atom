import { dirname, join } from "@std/path";

export const config = {
    adapterFileName: "black-atom-adapter.json",
    get dir() {
        return {
            core: Deno.cwd(),
            themes: join(Deno.cwd(), "src", "themes"),
            adapters: join(dirname(Deno.cwd()), "adapters"),
        };
    },
} as const;
