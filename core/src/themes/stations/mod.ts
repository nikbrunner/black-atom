import { defineCollection } from "../define-collection.ts";

import blackAtomStationsEngineering from "./black-atom-stations-engineering.ts";
import blackAtomStationsOperations from "./black-atom-stations-operations.ts";
import blackAtomStationsMedical from "./black-atom-stations-medical.ts";
import blackAtomStationsResearch from "./black-atom-stations-research.ts";

const collection = defineCollection({
    meta: { key: "stations", label: "Stations", order: 3 },
    themes: {
        "black-atom-stations-engineering": {
            meta: { name: "Engineering", appearance: "dark", status: "release" },
            colors: blackAtomStationsEngineering,
        },
        "black-atom-stations-operations": {
            meta: { name: "Operations", appearance: "dark", status: "release" },
            colors: blackAtomStationsOperations,
        },
        "black-atom-stations-medical": {
            meta: { name: "Medical", appearance: "light", status: "release" },
            colors: blackAtomStationsMedical,
        },
        "black-atom-stations-research": {
            meta: { name: "Research", appearance: "light", status: "release" },
            colors: blackAtomStationsResearch,
        },
    },
});

export default collection;
