import { defineCollection } from "../define-collection.ts";

import blackAtomClayDark from "./black-atom-clay-dark.ts";
import blackAtomClayLight from "./black-atom-clay-light.ts";

export default defineCollection({
    meta: { key: "clay", label: "Clay", order: 4 },
    themes: {
        "black-atom-clay-dark": {
            meta: { name: "Dark", appearance: "dark", status: "development" },
            colors: blackAtomClayDark,
        },
        "black-atom-clay-light": {
            meta: { name: "Light", appearance: "light", status: "development" },
            colors: blackAtomClayLight,
        },
    },
});
