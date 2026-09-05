import { defineCollection } from "../define-collection.ts";

import blackAtomFacilityDark from "./black-atom-facility-dark.ts";
import blackAtomFacilityDimmedDark from "./black-atom-facility-dimmed-dark.ts";
import blackAtomFacilityLight from "./black-atom-facility-light.ts";
import blackAtomFacilityDimmedLight from "./black-atom-facility-dimmed-light.ts";

export default defineCollection({
    meta: { key: "facility", label: "Facility", order: 1 },
    themes: {
        "black-atom-facility-dark": {
            meta: { name: "Dark", appearance: "dark", status: "release" },
            colors: blackAtomFacilityDark,
        },
        "black-atom-facility-dimmed-dark": {
            meta: { name: "Dimmed Dark", appearance: "dark", status: "release" },
            colors: blackAtomFacilityDimmedDark,
        },
        "black-atom-facility-light": {
            meta: { name: "Light", appearance: "light", status: "release" },
            colors: blackAtomFacilityLight,
        },
        "black-atom-facility-dimmed-light": {
            meta: { name: "Dimmed Light", appearance: "light", status: "release" },
            colors: blackAtomFacilityDimmedLight,
        },
    },
});
