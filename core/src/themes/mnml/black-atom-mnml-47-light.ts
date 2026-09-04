import type * as Theme from "../../types/theme.ts";
import { defineThemeColors } from "../define-theme-colors.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette-light.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";
import createFeedback from "./create-feedback-light.ts";

const primaries: Theme.Primaries = {
    d10: oklch(0.30, 0.045, 170),
    d20: oklch(0.34, 0.050, 170),
    d30: oklch(0.38, 0.055, 170),
    d40: oklch(0.42, 0.065, 170),

    m10: oklch(0.55, 0.080, 170),
    m20: oklch(0.64, 0.080, 170),
    m30: oklch(0.72, 0.080, 170),
    m40: oklch(0.80, 0.080, 170),

    l10: oklch(0.84, 0.0450, 170),
    l20: oklch(0.88, 0.0350, 170),
    l30: oklch(0.94, 0.0250, 170),
    l40: oklch(0.98, 0.0125, 170),
};

const accents: Theme.Accents = {
    a10: oklch(0.65, 0.20, 50),
    a20: oklch(0.65, 0.20, 150),
    a30: oklch(0.65, 0.20, 70),
    a40: oklch(0.65, 0.20, 170),
};

const palette = createPalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        green: accents.a20,
        darkGreen: accents.a20,
        yellow: accents.a10,
        darkYellow: accents.a10,
        darkCyan: accents.a40!,
        cyan: accents.a40!,
        magenta: oklch(0.70, 0.05, 365),
        darkMagenta: oklch(0.65, 0.05, 365),
    }),
});

const feedback: Theme.Feedback = createFeedback(accents);

const options = { primaries, palette, feedback, accents };
const ui = createUi(options);
const syntax = createSyntax(options);

const colors = defineThemeColors({
    primaries,
    palette,
    accents,
    feedback,
    ui,
    syntax,
});

export default colors;
