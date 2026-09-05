import { defineThemeColors } from "../define-theme-colors.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "../mnml/create-palette-light.ts";
import createSyntax from "../mnml/create-syntax-light.ts";
import createUi from "../mnml/create-ui-light.ts";
import createFeedback from "../mnml/create-feedback-light.ts";

export default defineThemeColors({
    primaries: {
        d10: oklch(0.20, 0.01, 220),
        d20: oklch(0.28, 0.01, 220),
        d30: oklch(0.36, 0.01, 220),
        d40: oklch(0.42, 0.01, 220),

        m10: oklch(0.48, 0.01, 220),
        m20: oklch(0.58, 0.01, 220),
        m30: oklch(0.64, 0.01, 220),
        m40: oklch(0.72, 0.01, 220),

        l10: oklch(0.94, 0.005, 220),
        l20: oklch(0.96, 0.005, 220),
        l30: oklch(0.98, 0.005, 220),
        l40: oklch(1.00, 0.005, 220),
    },
    accents: {
        a10: oklch(0.7506, 0.175, 60.0),
        a20: oklch(0.66, 0.185, 250.0),
        a30: oklch(0.70, 0.185, 40.0),
    },
    palette: ({ primaries, accents }) =>
        createPalette(primaries, {
            debug: false,
            override: (palette) => ({
                ...palette,
                yellow: accents.a10,
                darkYellow: accents.a20,
            }),
        }),
    feedback: ({ accents }) => createFeedback(accents),
    ui: createUi,
    syntax: (context) => ({
        ...createSyntax(context),
        keyword: {
            default: context.accents.a20,
            import: context.accents.a30 ?? context.accents.a20,
            export: context.accents.a30 ?? context.accents.a20,
        },
    }),
});
