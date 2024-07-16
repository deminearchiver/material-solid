import { createMaterialTheme, Hct } from "@material-solid/vanilla-extract/theme";

const { contract, light, dark } = createMaterialTheme({
  color: {
    seed: Hct.fromInt(0xFF0000FF),
    variant: "tonalSpot",
  },
});

export const THEME = contract();
export const LIGHT_THEME = light();
export const DARK_THEME = dark();
