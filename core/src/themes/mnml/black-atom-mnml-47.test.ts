import { assertEquals } from "@std/assert";
import dark from "./black-atom-mnml-47-dark.ts";
import light from "./black-atom-mnml-47-light.ts";

Deno.test("MNML 47 maps its primary and secondary accents consistently", () => {
    for (const theme of [light, dark]) {
        assertEquals(theme.ui.fg.accent, theme.accents.a10);
        assertEquals(theme.palette.green, theme.accents.a20);
        assertEquals(theme.palette.yellow, theme.accents.a10);
    }
});
