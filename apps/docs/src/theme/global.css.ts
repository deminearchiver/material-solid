import { assignVars, createGlobalTheme, globalStyle } from "@vanilla-extract/css";
import { DARK_THEME, LIGHT_THEME, THEME } from ".";

const DATA_THEME_LIGHT = "light";
const DATA_THEME_DARK = "dark";

const createThemeSelector = (
  themes: string | string[],
  not: boolean = false,
) => {
  const values = typeof themes === "string" ? [themes] : themes;
  const attributes = values.map(
    theme => `[data-theme="${theme}"]`,
  );

  // return `:root${attribute}, ${attribute} ::backdrop`;
  let is = `:is(${attributes.join(",")})`;
  if(not) is = `:not(${is})`;
  return `:root${is}, ${is} ::backdrop`;
}

globalStyle(
  createThemeSelector([DATA_THEME_LIGHT, DATA_THEME_DARK], true),
  {
    colorScheme: "light dark",
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


globalStyle(
  createThemeSelector(DATA_THEME_LIGHT),
  {
    colorScheme: "light",
    vars: assignVars(THEME, LIGHT_THEME),
  }
);
globalStyle(
  createThemeSelector(DATA_THEME_DARK),
  {
    colorScheme: "dark",
    vars: assignVars(THEME, DARK_THEME),
  }
);
