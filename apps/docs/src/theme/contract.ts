import { createMaterialTheme, Hct } from "@material-solid/vanilla-extract/theme";

const { contract, light, dark } = createMaterialTheme({
  color: {
    // seed: Hct.fromInt(0xFF2C4F7C), // SolidJS Primary
    seed: Hct.fromInt(0xFF4F88C6), // SolidJS Light
    variant: "tonalSpot",
  },
});

export const THEME = contract();
export const LIGHT_THEME = light();
export const DARK_THEME = dark();
