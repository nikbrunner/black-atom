import { assertEquals } from "@std/assert";
import type * as Theme from "../types/theme.ts";
import sourceColors from "./__fixtures__/source-colors.json" with { type: "json" };
import { themeCatalog } from "./catalog.ts";

const targetSources = {
    "black-atom-default-dark": "black-atom-default-dark",
    "black-atom-default-dimmed-dark": "black-atom-default-dark-dimmed",
    "black-atom-default-light": "black-atom-default-light",
    "black-atom-default-dimmed-light": "black-atom-default-light-dimmed",
    "black-atom-facility-dark": "black-atom-stations-engineering",
    "black-atom-facility-dimmed-dark": "black-atom-stations-operations",
    "black-atom-facility-light": "black-atom-stations-research",
    "black-atom-facility-dimmed-light": "black-atom-stations-medical",
    "black-atom-terra-spring-dark": "black-atom-terra-spring-night",
    "black-atom-terra-spring-light": "black-atom-terra-spring-day",
    "black-atom-terra-summer-dark": "black-atom-terra-summer-night",
    "black-atom-terra-summer-light": "black-atom-terra-summer-day",
    "black-atom-terra-fall-dark": "black-atom-terra-fall-night",
    "black-atom-terra-fall-light": "black-atom-terra-fall-day",
    "black-atom-terra-winter-dark": "black-atom-terra-winter-night",
    "black-atom-terra-winter-light": "black-atom-terra-winter-day",
    "black-atom-jpn-koyo-dark": "black-atom-jpn-koyo-yoru",
    "black-atom-jpn-koyo-light": "black-atom-jpn-koyo-hiru",
    "black-atom-jpn-murasaki-dark": "black-atom-jpn-murasaki-yoru",
    "black-atom-jpn-tsuki-dark": "black-atom-jpn-tsuki-yoru",
    "black-atom-jpn-sanshoku-dark": "black-atom-mnml-mikado-dark",
    "black-atom-jpn-sanshoku-light": "black-atom-mnml-mikado-light",
    "black-atom-clay-dark": "black-atom-mnml-clay-dark",
    "black-atom-clay-light": "black-atom-mnml-clay-light",
    "black-atom-minium-polymer-dark": "black-atom-mnml-orange-dark",
    "black-atom-minium-polymer-light": "black-atom-mnml-orange-light",
    "black-atom-minium-viridian-dark": "black-atom-mnml-47-dark",
    "black-atom-minium-viridian-light": "black-atom-mnml-47-light",
    "black-atom-mono-dark": "black-atom-mnml-mono-dark",
    "black-atom-mono-light": "black-atom-mnml-mono-light",
    "black-atom-mono-dimmed-dark": "black-atom-mnml-eink-dark",
    "black-atom-mono-dimmed-light": "black-atom-mnml-eink-light",
} as const satisfies Record<Theme.Key, keyof typeof sourceColors>;

function selectColors(theme: Theme.Colors): Theme.Colors {
    const { primaries, accents, palette, feedback, ui, syntax } = theme;
    return { primaries, accents, palette, feedback, ui, syntax };
}

Deno.test("source theme colors stay unchanged", () => {
    assertEquals(Object.keys(themeCatalog).sort(), Object.keys(targetSources).sort());
    assertEquals(Object.values(targetSources).sort(), Object.keys(sourceColors).sort());
    for (const [target, source] of Object.entries(targetSources)) {
        assertEquals(selectColors(themeCatalog[target as Theme.Key]), sourceColors[source], target);
    }
});
