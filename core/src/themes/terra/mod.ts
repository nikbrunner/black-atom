import { defineCollection } from "../define-collection.ts";

import blackAtomTerraSpringDay from "./black-atom-terra-spring-day.ts";
import blackAtomTerraSpringNight from "./black-atom-terra-spring-night.ts";
import blackAtomTerraFallDay from "./black-atom-terra-fall-day.ts";
import blackAtomTerraFallNight from "./black-atom-terra-fall-night.ts";
import blackAtomTerraSummerDay from "./black-atom-terra-summer-day.ts";
import blackAtomTerraSummerNight from "./black-atom-terra-summer-night.ts";
import blackAtomTerraWinterDay from "./black-atom-terra-winter-day.ts";
import blackAtomTerraWinterNight from "./black-atom-terra-winter-night.ts";

const collection = defineCollection({
    meta: { key: "terra", label: "TERRA", order: 2 },
    themes: {
        "black-atom-terra-spring-day": {
            meta: { name: "Spring Day", appearance: "light", status: "development" },
            colors: blackAtomTerraSpringDay,
        },
        "black-atom-terra-spring-night": {
            meta: { name: "Spring Night", appearance: "dark", status: "release" },
            colors: blackAtomTerraSpringNight,
        },
        "black-atom-terra-fall-day": {
            meta: { name: "Fall Day", appearance: "light", status: "development" },
            colors: blackAtomTerraFallDay,
        },
        "black-atom-terra-fall-night": {
            meta: { name: "Fall Night", appearance: "dark", status: "release" },
            colors: blackAtomTerraFallNight,
        },
        "black-atom-terra-summer-day": {
            meta: { name: "Summer Day", appearance: "light", status: "development" },
            colors: blackAtomTerraSummerDay,
        },
        "black-atom-terra-summer-night": {
            meta: { name: "Summer Night", appearance: "dark", status: "release" },
            colors: blackAtomTerraSummerNight,
        },
        "black-atom-terra-winter-day": {
            meta: { name: "Winter Day", appearance: "light", status: "development" },
            colors: blackAtomTerraWinterDay,
        },
        "black-atom-terra-winter-night": {
            meta: { name: "Winter Night", appearance: "dark", status: "release" },
            colors: blackAtomTerraWinterNight,
        },
    },
});

export default collection;
