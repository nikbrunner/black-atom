import type * as Theme from "@core/types/theme.ts";

/** Groups themes by their collection key. */
export function groupByCollection(
    themes: Theme.Definition[],
): Map<Theme.CollectionKey, Theme.Definition[]> {
    return Map.groupBy(themes, (t) => t.meta.collection.key);
}
