/**
 * @module
 *
 * Core theme definitions and generation engine for the Black Atom Industries theme ecosystem.
 *
 * This package provides type-safe access to all Black Atom theme definitions,
 * including color primaries, palettes, UI tokens, and syntax highlighting colors.
 *
 * @example
 * ```ts
 * import { themeCatalog } from "@black-atom/core";
 * import type * as Theme from "@black-atom/core";
 *
 * // Access theme meta (narrowed to exact literal types)
 * const meta = themeCatalog["black-atom-jpn-koyo-yoru"].meta;
 *
 * // Access a specific theme definition
 * const theme: Theme.Definition = themeCatalog["black-atom-jpn-koyo-yoru"]!;
 *
 * console.log(theme.ui.bg.default); // hex color for the background
 * console.log(theme.syntax.keyword.default); // hex color for keywords
 * ```
 */

export * from "./types/theme.ts";
export * from "./themes/catalog.ts";
