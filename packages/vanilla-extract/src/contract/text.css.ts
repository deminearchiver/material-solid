import { createThemeContract } from "@vanilla-extract/css";

const FONT = {
  fontFamily: "",
  fontSize: "",
  fontWeight: "",
  lineHeight: "",
  letterSpacing: "",
}

const FONTS = {
  large: FONT,
  medium: FONT,
  small: FONT,
}


export const TEXT = createThemeContract({
  typeface: {
    plain: "",
    brand: "",
  },
  display: FONTS,
  headline: FONTS,
  title: FONTS,
  body: FONTS,
  label: FONTS,
});
