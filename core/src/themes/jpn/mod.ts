import { defineCollection } from "../define-collection.ts";

import blackAtomJpnKoyoYoru from "./black-atom-jpn-koyo-yoru.ts";
import blackAtomJpnKoyoHiru from "./black-atom-jpn-koyo-hiru.ts";
import blackAtomJpnTsukiYoru from "./black-atom-jpn-tsuki-yoru.ts";
import blackAtomJpnMurasakiYoru from "./black-atom-jpn-murasaki-yoru.ts";

const collection = defineCollection({
    meta: { key: "jpn", label: "JPN", order: 1 },
    themes: {
        "black-atom-jpn-koyo-yoru": {
            meta: { name: "Koyo Yoru", appearance: "dark", status: "release" },
            colors: blackAtomJpnKoyoYoru,
        },
        "black-atom-jpn-koyo-hiru": {
            meta: { name: "Koyo Hiru", appearance: "light", status: "release" },
            colors: blackAtomJpnKoyoHiru,
        },
        "black-atom-jpn-tsuki-yoru": {
            meta: { name: "Tsuki Yoru", appearance: "dark", status: "release" },
            colors: blackAtomJpnTsukiYoru,
        },
        "black-atom-jpn-murasaki-yoru": {
            meta: { name: "Murasaki Yoru", appearance: "dark", status: "release" },
            colors: blackAtomJpnMurasakiYoru,
        },
    },
});

export default collection;
