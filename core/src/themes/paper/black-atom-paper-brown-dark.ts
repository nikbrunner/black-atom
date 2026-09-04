import type * as Theme from "../../types/theme.ts";
import { defineThemeColors } from "../define-theme-colors.ts";
import { oklch } from "../../utils/color.ts";

import createFeedback from "./create-feedback-dark.ts";
import createPalette from "./create-palette-dark.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

const primaries: Theme.Primaries = {
    d10: oklch(0.18, 0.004, 75),
    d20: oklch(0.24, 0.006, 75),
    d30: oklch(0.32, 0.012, 75),
    d40: oklch(0.40, 0.018, 75),

    m10: oklch(0.50, 0.025, 75),
    m20: oklch(0.58, 0.025, 75),
    m30: oklch(0.66, 0.025, 75),
    m40: oklch(0.74, 0.025, 75),

    l10: oklch(0.82, 0.025, 75),
    l20: oklch(0.86, 0.025, 75),
    l30: oklch(0.90, 0.025, 75),
    l40: oklch(0.94, 0.025, 75),
};

const accents: Theme.Accents = {
    a10: oklch(0.90, 0.020, 80),
    a20: oklch(0.76, 0.018, 75),
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
