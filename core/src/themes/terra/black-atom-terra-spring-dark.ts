import { defineThemeColors } from "../define-theme-colors.ts";
import { oklch } from "../../utils/color.ts";

import createFeedback from "./create-feedback-dark.ts";
import createPalette from "./create-palette-dark.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

export default defineThemeColors({
    primaries: {
        d10: oklch(0.24, 0.005, 173.99),
        d20: oklch(0.26, 0.007, 164.43),
        d30: oklch(0.287, 0.008, 169.81),
        d40: oklch(0.327, 0.008, 169.94),

        m10: oklch(0.383, 0.022, 163.57),
        m20: oklch(0.482, 0.026, 163.63),
        m30: oklch(0.571, 0.032, 162.48),
        m40: oklch(0.657, 0.029, 162.75),

        l10: oklch(0.744, 0.035, 79.2),
        l20: oklch(0.786, 0.03, 82.58),
        l30: oklch(0.859, 0.02, 87.52),
        l40: oklch(0.897, 0.016, 95.24),
    },
    accents: {
        a10: oklch(0.752, 0.1, 78.73),
        a20: oklch(0.752, 0.119, 55.94),
    },
    palette: ({ primaries, accents }) =>
        createPalette(primaries, {
            darkRed: oklch(0.576, 0.129, 31.54),
            red: oklch(0.618, 0.1, 32.01),

            darkGreen: oklch(0.702, 0.123, 140.78),
            green: oklch(0.81, 0.105, 147.58),

            darkYellow: accents.a20,
            yellow: accents.a10,

            darkBlue: oklch(0.705, 0.095, 270.31),
            blue: oklch(0.778, 0.074, 256.94),

            darkMagenta: oklch(0.782, 0.062, 342.39),
            magenta: oklch(0.795, 0.058, 307.1),

            darkCyan: oklch(0.64, 0.066, 162.06),
            cyan: oklch(0.714, 0.048, 171.45),
        }),
    feedback: ({ palette }) => createFeedback(palette),
    ui: createUi,
    syntax: createSyntax,
});
