import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { apiClient } from "../lib/api-client";
import { DEFAULT_THEME_KEY } from "@core/themes/catalog.ts";
import type * as Theme from "@core/types/theme.ts";

const TOPIC = "themes" as const;

function queryKey(keys: string[]) {
    return [TOPIC, ...keys];
}

type UseThemeQueryOptions<TD extends Theme.Definition | Theme.Definition[]> = Omit<
    UseQueryOptions<TD>,
    "queryKey" | "queryFn"
>;

export function useThemes(queryOptions?: UseThemeQueryOptions<Theme.Definition[]>) {
    return useQuery<Theme.Definition[]>({
        queryKey: queryKey(["all"]),
        queryFn: ({ signal }) => apiClient<Theme.Definition[]>("/themes", { signal }),
        ...queryOptions,
    });
}

export function useTheme(
    key: Theme.Key = DEFAULT_THEME_KEY,
    queryOptions?: UseThemeQueryOptions<Theme.Definition>,
) {
    return useQuery<Theme.Definition>({
        queryKey: queryKey([key]),
        queryFn: ({ signal }) => apiClient<Theme.Definition>(`/themes/${key}`, { signal }),
        ...queryOptions,
    });
}
