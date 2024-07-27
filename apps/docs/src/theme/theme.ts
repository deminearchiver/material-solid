import { createMaterialTheme, Hct } from "@material-solid/vanilla-extract";

const COLORS = {
  primary: Hct.fromInt(0xFF2C4F7C),
  secondary: Hct.fromInt(0xFF335D92),
  light: Hct.fromInt(0xFF4F88C6),
  accent: Hct.fromInt(0xFF66E6AC),
  secondAccent: Hct.fromInt(0xFF0CDC73),
} satisfies Record<string, Hct>;

const TYPEFACE_PLAIN = ["Roboto Flex Variable", "Roboto Flex", "Roboto", "Open Sans", "system-ui", "sans-serif"];

export const { createContract, createTheme } = createMaterialTheme({
  color: {
    seed: COLORS.primary,
    variant: "tonalSpot",
  },
  typeface: {
    plain: TYPEFACE_PLAIN,
    brand: ["Manrope Variable", ...TYPEFACE_PLAIN],
  }
});


// export const THEME = contract();
// export const LIGHT_THEME = light();
// export const DARK_THEME = dark();
