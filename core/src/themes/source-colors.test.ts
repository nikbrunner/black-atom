import { assertEquals } from "@std/assert";
import type * as Theme from "../types/theme.ts";
import sourceColors from "./__fixtures__/source-colors.json" with { type: "json" };
import { themeCatalog } from "./catalog.ts";

const sourceThemeKeys = Object.keys(sourceColors) as (keyof typeof sourceColors)[];

function selectColors(theme: Theme.Colors): Theme.Colors {
    const { primaries, accents, palette, feedback, ui, syntax } = theme;
    return { primaries, accents, palette, feedback, ui, syntax };
}

Deno.test("source theme colors stay unchanged", () => {
    for (const key of sourceThemeKeys) {
        assertEquals(selectColors(themeCatalog[key]), sourceColors[key]);
    }
});
