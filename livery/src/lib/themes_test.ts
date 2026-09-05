import { assertEquals, assertGreater, assertNotEquals } from "@std/assert";
import { themeCatalog } from "@black-atom/core";
import { collectionOrder } from "@black-atom/core";
import type * as Theme from "@black-atom/core";
import { formatCollectionTitle, getGroupedThemes, pickRandomOtherTheme } from "./themes.ts";
import expectedCatalog from "../../core/tests/fixtures/catalog.json" with { type: "json" };

Deno.test("Livery exposes the exact embedded catalog metadata and all seven groups", () => {
    const actual = Object.values(themeCatalog).map(({ meta }) => ({
        key: meta.key,
        collection_key: meta.collection.key,
        appearance: meta.appearance,
        label: meta.label,
    })).sort((a, b) => a.key.localeCompare(b.key));
    assertEquals(actual, expectedCatalog);
    assertEquals(getGroupedThemes(themeCatalog).map((group) => group.collectionKey), [
        "default",
        "facility",
        "terra",
        "jpn",
        "clay",
        "minium",
        "mono",
    ]);
});

Deno.test("formatCollectionTitle collapses a label that merely echoes the key", () => {
    assertEquals(formatCollectionTitle("jpn", "JPN"), "JPN");
    assertEquals(formatCollectionTitle("default", "Default"), "DEFAULT");
});

Deno.test("formatCollectionTitle keeps the em-dash form for distinct labels", () => {
    assertEquals(formatCollectionTitle("jpn", "Japan"), "JPN — JAPAN");
});

Deno.test("getGroupedThemes returns populated groups in collectionOrder", () => {
    const groups = getGroupedThemes(themeCatalog);
    const keys = groups.map((group) => group.collectionKey);
    const populatedKeys = new Set<Theme.CollectionKey>(
        Object.values(themeCatalog).map((theme) => theme.meta.collection.key),
    );

    assertEquals(
        keys,
        collectionOrder.filter((collectionKey) => populatedKeys.has(collectionKey)),
    );
});

Deno.test("getGroupedThemes sorts themes within each group alphabetically", () => {
    const groups = getGroupedThemes(themeCatalog);
    groups.forEach((group) => {
        const names = group.themes.map((t) => t.meta.name);
        const sorted = [...names].sort((a, b) => a.localeCompare(b));
        assertEquals(names, sorted);
    });
});

Deno.test("getGroupedThemes uses collection label from theme meta", () => {
    const groups = getGroupedThemes(themeCatalog);
    groups.forEach((group) => {
        assertEquals(group.label, group.themes[0].meta.collection.label);
    });
});

Deno.test("getGroupedThemes includes all themes from themeCatalog", () => {
    const grouped = getGroupedThemes(themeCatalog);
    const flatCount = grouped.reduce((sum, g) => sum + g.themes.length, 0);
    const totalThemes = Object.values(themeCatalog).filter(Boolean).length;
    assertGreater(flatCount, 0);
    assertEquals(flatCount, totalThemes);
});

Deno.test("pickRandomOtherTheme never returns the current theme", () => {
    const currentKey = "black-atom-default-dark";
    for (let i = 0; i < 20; i++) {
        const picked = pickRandomOtherTheme(themeCatalog, currentKey, () => i / 20);
        assertNotEquals(picked?.meta.key, currentKey);
    }
});

Deno.test("pickRandomOtherTheme is deterministic given a fixed random source", () => {
    const currentKey = "black-atom-default-dark";
    const first = pickRandomOtherTheme(themeCatalog, currentKey, () => 0);
    const second = pickRandomOtherTheme(themeCatalog, currentKey, () => 0);
    assertEquals(first?.meta.key, second?.meta.key);
});
