import { assertEquals, assertExists } from "@std/assert";
import type * as Theme from "../types/theme.ts";
import defaultCollection from "./default/mod.ts";
import { collectionOrder, themeCatalog } from "./catalog.ts";

Deno.test("collection modules expose metadata and finished themes", () => {
    const theme = defaultCollection.themes["black-atom-default-dark"];

    assertEquals(defaultCollection.meta.key, "default");
    assertEquals(theme.meta.name, "Dark");
    assertEquals(theme.meta.collection.key, "default");
    assertExists(theme.ui.bg.default);
});

Deno.test("themeCatalog entries contain metadata and finished colors", () => {
    const theme = themeCatalog["black-atom-default-dark"];

    assertEquals(theme.meta.key, "black-atom-default-dark");
    assertEquals(theme.meta.label, "Black Atom — Dark");
    assertExists(theme.ui.bg.default);
    assertExists(theme.syntax.keyword.default);
});

Deno.test("collectionOrder follows collection metadata", () => {
    assertEquals(collectionOrder, [
        "default",
        "facility",
        "terra",
        "jpn",
        "clay",
        "minium",
        "mono",
    ]);
});

type DefaultThemeKey = Theme.KeysForCollection<"default">;

function acceptDefaultThemeKey(_: DefaultThemeKey) {}

acceptDefaultThemeKey("black-atom-default-dark");

// @ts-expect-error JPN themes do not belong to the default collection.
acceptDefaultThemeKey("black-atom-jpn-koyo-dark");

const defaultThemeKey = "black-atom-default-dark" satisfies keyof typeof defaultCollection.themes;
assertEquals(defaultThemeKey, "black-atom-default-dark");
