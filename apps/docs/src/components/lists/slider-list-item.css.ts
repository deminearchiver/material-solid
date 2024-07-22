import { style } from "@vanilla-extract/css";
import { THEME } from "~/theme";

export const materialSymbolStyle = style({
  fontSize: 40,
  color: THEME.color.onSurface,
});

export const containerStyle = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  color: THEME.color.onSurface,
  gap: 16,
});

export const labelStyle = style({
  height: "100%",
  flexGrow: 1,

  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
  // gap: 8,

  fontFamily: THEME.text.title.large.family,
  fontSize: THEME.text.title.large.size,
  fontWeight: THEME.text.title.large.weight,
  lineHeight: THEME.text.title.large.lineHeight,
  letterSpacing: THEME.text.title.large.letterSpacing,
  color: THEME.color.onSurface,
});
