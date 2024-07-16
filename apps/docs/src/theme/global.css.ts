import { assignVars, createGlobalTheme, globalStyle } from "@vanilla-extract/css";
import { DARK_THEME, LIGHT_THEME, THEME } from ".";

const createThemeSelector = (theme: "auto" | "light" | "dark") => {
  return `:root[data-theme="${theme}"], [data-theme="${theme}"] ::backdrop`;
}

globalStyle(
  // createThemeSelector("auto"),
  ":root",
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

createGlobalTheme(
  createThemeSelector("light"),
  THEME, LIGHT_THEME,
);

createGlobalTheme(
  createThemeSelector("dark"),
  THEME, DARK_THEME,
);
