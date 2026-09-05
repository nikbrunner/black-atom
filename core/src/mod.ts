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
 * // Access theme metadata with exact theme and collection key types
 * const meta = themeCatalog["black-atom-jpn-koyo-dark"].meta;
 *
 * // Access a specific theme definition
 * const theme: Theme.ThemeDefinition = themeCatalog["black-atom-jpn-koyo-dark"];
 *
 * console.log(theme.ui.bg.default); // hex color for the background
 * console.log(theme.syntax.keyword.default); // hex color for keywords
 * ```
 */

export * from "./types/theme.ts";
export * from "./themes/catalog.ts";
