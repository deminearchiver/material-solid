import { style } from "@vanilla-extract/css";
import { THEME } from "~/theme";

export const headingStyle = style({
  fontFamily: THEME.text.headline.large.family,
  fontSize: THEME.text.headline.large.size,
  fontWeight: THEME.text.headline.large.weight,
  lineHeight: THEME.text.headline.large.lineHeight,
  letterSpacing: THEME.text.headline.large.letterSpacing,
  color: THEME.color.onSurface,
})
