import { defineCollection } from "../define-collection.ts";

import blackAtomDefaultDark from "./black-atom-default-dark.ts";
import blackAtomDefaultDarkDimmed from "./black-atom-default-dark-dimmed.ts";
import blackAtomDefaultLight from "./black-atom-default-light.ts";
import blackAtomDefaultLightDimmed from "./black-atom-default-light-dimmed.ts";

const collection = defineCollection({
    meta: { key: "default", label: "Default", order: 0 },
    themes: {
        "black-atom-default-dark": {
            meta: { name: "Dark", appearance: "dark", status: "release" },
            colors: blackAtomDefaultDark,
        },
        "black-atom-default-dark-dimmed": {
            meta: { name: "Dark Dimmed", appearance: "dark", status: "release" },
            colors: blackAtomDefaultDarkDimmed,
        },
        "black-atom-default-light": {
            meta: { name: "Light", appearance: "light", status: "release" },
            colors: blackAtomDefaultLight,
        },
        "black-atom-default-light-dimmed": {
            meta: { name: "Light Dimmed", appearance: "light", status: "release" },
            colors: blackAtomDefaultLightDimmed,
        },
    },
});

export default collection;
