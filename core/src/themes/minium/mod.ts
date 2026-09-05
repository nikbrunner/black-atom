import { defineCollection } from "../define-collection.ts";

import blackAtomMiniumPolymerDark from "./black-atom-minium-polymer-dark.ts";
import blackAtomMiniumPolymerLight from "./black-atom-minium-polymer-light.ts";
import blackAtomMiniumViridianDark from "./black-atom-minium-viridian-dark.ts";
import blackAtomMiniumViridianLight from "./black-atom-minium-viridian-light.ts";

export default defineCollection({
    meta: { key: "minium", label: "Minium", order: 5 },
    themes: {
        "black-atom-minium-polymer-dark": {
            meta: { name: "Polymer Dark", appearance: "dark", status: "development" },
            colors: blackAtomMiniumPolymerDark,
        },
        "black-atom-minium-polymer-light": {
            meta: { name: "Polymer Light", appearance: "light", status: "development" },
            colors: blackAtomMiniumPolymerLight,
        },
        "black-atom-minium-viridian-dark": {
            meta: { name: "Viridian Dark", appearance: "dark", status: "development" },
            colors: blackAtomMiniumViridianDark,
        },
        "black-atom-minium-viridian-light": {
            meta: { name: "Viridian Light", appearance: "light", status: "development" },
            colors: blackAtomMiniumViridianLight,
        },
    },
});
