import { defineCollection } from "../define-collection.ts";

import blackAtomMnmlClayDark from "./black-atom-mnml-clay-dark.ts";
import blackAtomMnmlClayLight from "./black-atom-mnml-clay-light.ts";
import blackAtomMnmlOrangeDark from "./black-atom-mnml-orange-dark.ts";
import blackAtomMnmlOrangeLight from "./black-atom-mnml-orange-light.ts";
import blackAtomMnmlOsmanLight from "./black-atom-mnml-osman-light.ts";
import blackAtomMnmlMikadoDark from "./black-atom-mnml-mikado-dark.ts";
import blackAtomMnmlMikadoLight from "./black-atom-mnml-mikado-light.ts";
import blackAtomMnml47Light from "./black-atom-mnml-47-light.ts";
import blackAtomMnml47Dark from "./black-atom-mnml-47-dark.ts";
import blackAtomMnmlEinkDark from "./black-atom-mnml-eink-dark.ts";
import blackAtomMnmlEinkLight from "./black-atom-mnml-eink-light.ts";
import blackAtomMnmlMonoDark from "./black-atom-mnml-mono-dark.ts";
import blackAtomMnmlMonoLight from "./black-atom-mnml-mono-light.ts";
import blackAtomMnmlItaLight from "./black-atom-mnml-ita-light.ts";

const collection = defineCollection({
    meta: { key: "mnml", label: "MNML", order: 4 },
    themes: {
        "black-atom-mnml-clay-dark": {
            meta: { name: "Clay Dark", appearance: "dark", status: "development" },
            colors: blackAtomMnmlClayDark,
        },
        "black-atom-mnml-clay-light": {
            meta: { name: "Clay Light", appearance: "light", status: "development" },
            colors: blackAtomMnmlClayLight,
        },
        "black-atom-mnml-orange-dark": {
            meta: { name: "Orange Dark", appearance: "dark", status: "development" },
            colors: blackAtomMnmlOrangeDark,
        },
        "black-atom-mnml-orange-light": {
            meta: { name: "Orange Light", appearance: "light", status: "development" },
            colors: blackAtomMnmlOrangeLight,
        },
        "black-atom-mnml-osman-light": {
            meta: { name: "Osman Light", appearance: "light", status: "development" },
            colors: blackAtomMnmlOsmanLight,
        },
        "black-atom-mnml-mikado-dark": {
            meta: { name: "Mikado Dark", appearance: "dark", status: "development" },
            colors: blackAtomMnmlMikadoDark,
        },
        "black-atom-mnml-mikado-light": {
            meta: { name: "Mikado Light", appearance: "light", status: "development" },
            colors: blackAtomMnmlMikadoLight,
        },
        "black-atom-mnml-47-light": {
            meta: { name: "47 Light", appearance: "light", status: "development" },
            colors: blackAtomMnml47Light,
        },
        "black-atom-mnml-47-dark": {
            meta: { name: "47 Dark", appearance: "dark", status: "development" },
            colors: blackAtomMnml47Dark,
        },
        "black-atom-mnml-eink-dark": {
            meta: { name: "E-Ink Dark", appearance: "dark", status: "development" },
            colors: blackAtomMnmlEinkDark,
        },
        "black-atom-mnml-eink-light": {
            meta: { name: "E-Ink Light", appearance: "light", status: "development" },
            colors: blackAtomMnmlEinkLight,
        },
        "black-atom-mnml-mono-dark": {
            meta: { name: "Mono Dark", appearance: "dark", status: "development" },
            colors: blackAtomMnmlMonoDark,
        },
        "black-atom-mnml-mono-light": {
            meta: { name: "Mono Light", appearance: "light", status: "development" },
            colors: blackAtomMnmlMonoLight,
        },
        "black-atom-mnml-ita-light": {
            meta: { name: "ITA Light", appearance: "light", status: "development" },
            colors: blackAtomMnmlItaLight,
        },
    },
});

export default collection;
