/// <reference lib="deno.ns" />
import { assertEquals } from "@std/assert";
import { groupByCollection } from "./theme-utils.ts";
import type * as Theme from "@core/types/theme.ts";
import { themeCatalog } from "@core/themes/catalog.ts";

Deno.test("Monitor groups all 32 current themes into seven collections", () => {
    const groups = groupByCollection(Object.values(themeCatalog));
    assertEquals([...groups].map(([key, themes]) => [key, themes.length]), [
        ["default", 4],
        ["facility", 4],
        ["terra", 8],
        ["jpn", 6],
        ["clay", 2],
        ["minium", 4],
        ["mono", 4],
    ]);
    assertEquals([...groups.values()].flat().length, 32);
});

const makeTheme = (key: string, collection: string) =>
    ({
        meta: {
            key,
            name: key,
            appearance: "dark",
            status: "release",
            collection: { key: collection, label: collection },
        },
    }) as unknown as Theme.Definition;

Deno.test("groupByCollection groups themes by collection key", () => {
    const themes = [
        makeTheme("a", "default"),
        makeTheme("b", "jpn"),
        makeTheme("c", "default"),
    ];
    const result = groupByCollection(themes);
    assertEquals(result.size, 2);
    assertEquals(result.get("default")?.length, 2);
    assertEquals(result.get("jpn")?.length, 1);
});

Deno.test("groupByCollection preserves insertion order", () => {
    const themes = [
        makeTheme("a", "jpn"),
        makeTheme("b", "default"),
    ];
    const keys = Array.from(groupByCollection(themes).keys());
    assertEquals(keys[0], "jpn");
    assertEquals(keys[1], "default");
});

Deno.test("groupByCollection returns empty map for empty input", () => {
    assertEquals(groupByCollection([]).size, 0);
});
