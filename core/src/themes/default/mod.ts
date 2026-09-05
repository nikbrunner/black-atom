import { defineCollection } from "../define-collection.ts";

import blackAtomDefaultDark from "./black-atom-default-dark.ts";
import blackAtomDefaultDimmedDark from "./black-atom-default-dimmed-dark.ts";
import blackAtomDefaultLight from "./black-atom-default-light.ts";
import blackAtomDefaultDimmedLight from "./black-atom-default-dimmed-light.ts";

export default defineCollection({
    meta: { key: "default", label: "Default", order: 0 },
    themes: {
        "black-atom-default-dark": {
            meta: { name: "Dark", appearance: "dark", status: "release" },
            colors: blackAtomDefaultDark,
        },
        "black-atom-default-dimmed-dark": {
            meta: { name: "Dimmed Dark", appearance: "dark", status: "release" },
            colors: blackAtomDefaultDimmedDark,
        },
        "black-atom-default-light": {
            meta: { name: "Light", appearance: "light", status: "release" },
            colors: blackAtomDefaultLight,
        },
        "black-atom-default-dimmed-light": {
            meta: { name: "Dimmed Light", appearance: "light", status: "release" },
            colors: blackAtomDefaultDimmedLight,
        },
    },
});
