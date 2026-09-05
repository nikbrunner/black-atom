import type * as Theme from "@black-atom/core";
import { themeToStyleSheet } from "../../lib/tokens.ts";

import styles from "./theme-provider.module.css";

interface Props {
    theme: Theme.Definition;
    children: React.ReactNode;
}

export function ThemeProvider({ theme, children }: Props) {
    return (
        <div data-component="theme-provider" data-theme={theme.meta.key} className={styles.root}>
            <style>{themeToStyleSheet(theme)}</style>

            {children}
        </div>
    );
}
