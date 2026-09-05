import { defineThemeColors } from "../define-theme-colors.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "../mnml/create-palette-dark.ts";
import createSyntax from "../mnml/create-syntax-dark.ts";
import createUi from "../mnml/create-ui-dark.ts";
import createFeedback from "../mnml/create-feedback-dark.ts";

export default defineThemeColors({
    primaries: {
        d10: oklch(0.300, 0.055, 250),
        d20: oklch(0.325, 0.055, 250),
        d30: oklch(0.350, 0.055, 250),
        d40: oklch(0.375, 0.055, 250),

        m10: oklch(0.550, 0.075, 250),
        m20: oklch(0.600, 0.075, 250),
        m30: oklch(0.650, 0.075, 250),
        m40: oklch(0.750, 0.075, 250),

        l10: oklch(0.835, 0.015, 250),
        l20: oklch(0.885, 0.015, 250),
        l30: oklch(0.935, 0.015, 250),
        l40: oklch(0.985, 0.005, 250),
    },
    accents: {
        a10: oklch(0.80, 0.150, 72.00),
        a20: oklch(0.75, 0.125, 255.0),
        a30: oklch(0.70, 0.175, 30.00),
    },
    palette: ({ primaries, accents }) =>
        createPalette(primaries, {
            debug: false,
            override: (palette) => ({
                ...palette,
                yellow: accents.a10,
                darkYellow: accents.a10,
                blue: accents.a20,
                darkBlue: accents.a20,
            }),
        }),
    feedback: ({ accents }) => createFeedback(accents),
    ui: createUi,
    syntax: (context) => ({
        ...createSyntax(context),
        keyword: {
            default: context.accents.a30 ?? context.accents.a20,
            import: context.accents.a30 ?? context.accents.a20,
            export: context.accents.a30 ?? context.accents.a20,
        },
    }),
});
