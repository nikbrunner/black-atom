import { defineCollection } from "../define-collection.ts";

import blackAtomPaperBrownLight from "./black-atom-paper-brown-light.ts";
import blackAtomPaperBrownDark from "./black-atom-paper-brown-dark.ts";
import blackAtomPaperBlueLight from "./black-atom-paper-blue-light.ts";
import blackAtomPaperBlueDark from "./black-atom-paper-blue-dark.ts";

const collection = defineCollection({
    meta: { key: "paper", label: "PAPER", order: 5 },
    themes: {
        "black-atom-paper-brown-light": {
            meta: { name: "Brown Light", appearance: "light", status: "development" },
            colors: blackAtomPaperBrownLight,
        },
        "black-atom-paper-brown-dark": {
            meta: { name: "Brown Dark", appearance: "dark", status: "development" },
            colors: blackAtomPaperBrownDark,
        },
        "black-atom-paper-blue-light": {
            meta: { name: "Blue Light", appearance: "light", status: "development" },
            colors: blackAtomPaperBlueLight,
        },
        "black-atom-paper-blue-dark": {
            meta: { name: "Blue Dark", appearance: "dark", status: "development" },
            colors: blackAtomPaperBlueDark,
        },
    },
});

export default collection;
