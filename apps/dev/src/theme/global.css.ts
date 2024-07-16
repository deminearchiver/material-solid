import { assignVars, createGlobalTheme, globalStyle } from "@vanilla-extract/css";
import { DARK_THEME, LIGHT_THEME, THEME } from ".";
import type { ThemeMode } from "~/components/theme";

const createThemeSelector = (theme: ThemeMode) => {
  return `:root[data-theme="${theme}"], [data-theme="${theme}"] ::backdrop`;
}

createGlobalTheme(
  createThemeSelector("light"),
  THEME, LIGHT_THEME,
);

createGlobalTheme(
  createThemeSelector("dark"),
  THEME, DARK_THEME,
);

globalStyle(
  createThemeSelector("auto"),
  {
    "@media": {
      "(prefers-color-scheme: light)": {
        vars: assignVars(THEME, LIGHT_THEME),
      },
      "(prefers-color-scheme: dark)": {
        vars: assignVars(THEME, DARK_THEME),
      },
    },
  },
);
