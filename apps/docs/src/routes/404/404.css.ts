import { style } from "@vanilla-extract/css";
import { THEME } from "~/theme";

export const layoutStyle = style({
  maxWidth: 840,
  marginInline: "auto",
  // display: "flex",
  // flexDirection: "column",
  // alignItems: "center",
  // justifyContent: "center",
  paddingBlockStart: "24px",
});

export const imageStyle = style({
  width: "100%",
  objectFit: "scale-down",

});

export const contentStyle = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
});

export const headlineStyle = style({
  fontFamily: THEME.text.headline.medium.family,
  fontSize: THEME.text.headline.medium.size,
  fontWeight: THEME.text.headline.medium.weight,
  lineHeight: THEME.text.headline.medium.lineHeight,
  letterSpacing: THEME.text.headline.medium.letterSpacing,
  color: THEME.color.onSurface,
});
