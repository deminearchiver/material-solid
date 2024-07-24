import { listItemTheme } from "@material-solid/components/list/theme";
import { fallbackVar, style } from "@vanilla-extract/css";
import { THEME } from "~/theme";

export const materialSymbolStyle = style({
  fontSize: 32,
  color: THEME.color.onSurface,
});

export const containerStyle = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  gap: 16,
  paddingInline: fallbackVar(listItemTheme.paddingInline, "16px"),
  paddingBlock: 8,
});

export const labelStyle = style({
  height: "100%",
  flexGrow: 1,

  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
  // gap: 8,

  fontFamily: THEME.text.title.medium.family,
  fontSize: THEME.text.title.medium.size,
  fontWeight: THEME.text.title.medium.weight,
  lineHeight: THEME.text.title.medium.lineHeight,
  letterSpacing: THEME.text.title.medium.letterSpacing,
  color: THEME.color.onSurface,
});
