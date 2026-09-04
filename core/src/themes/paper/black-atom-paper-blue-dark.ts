import type * as Theme from "../../types/theme.ts";
import { defineThemeColors } from "../define-theme-colors.ts";
import { oklch } from "../../utils/color.ts";

import createFeedback from "./create-feedback-dark.ts";
import createPalette from "./create-palette-dark.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

// oklch(44.9% 0.087 259.4)
const primaries: Theme.Primaries = {
    d10: oklch(0.22, 0.08, 265),
    d20: oklch(0.28, 0.08, 265),
    d30: oklch(0.32, 0.08, 265),
    d40: oklch(0.36, 0.08, 265),

    m10: oklch(0.50, 0.08, 265),
    m20: oklch(0.58, 0.08, 265),
    m30: oklch(0.68, 0.08, 265),
    m40: oklch(0.78, 0.08, 265),

    l10: oklch(0.88, 0.020, 265),
    l20: oklch(0.92, 0.020, 265),
    l30: oklch(0.96, 0.020, 265),
    l40: oklch(0.99, 0.020, 265),
};

const accents: Theme.Accents = {
    // a10: oklch(0.70, 0.15, 265),
    a10: oklch(0.75, 0.17, 60.0),
    // a20: oklch(0.75, 0.15, 30),
    a20: oklch(0.85, 0.1, 225),
};

const palette = createPalette(primaries);

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
