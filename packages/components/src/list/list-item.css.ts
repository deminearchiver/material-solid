import { fallbackVar, style } from "@vanilla-extract/css";
import { THEME } from "@material-solid/vanilla-extract/contract";
import { rippleTheme } from "../ripple/theme.css";
import { listItemTheme } from "./theme.css";

export const listItemStyle = style({
  WebkitTapHighlightColor: "transparent",
  position: "relative",
  minHeight: 56,
  display: "flex",
  outline: "none",
  alignItems: "center",
  gap: 16,
  paddingInline: fallbackVar(listItemTheme.paddingInline, "16px"),
  paddingBlock: 8,
  color: THEME.color.onSurfaceVariant,
  textDecoration: "none",
  width: "100%",
  userSelect: "none",
  vars: {
    [rippleTheme.hoverColor]: THEME.color.onSurface,
    [rippleTheme.pressedColor]: THEME.color.onSurface,
  }
});
export const listItemContentStyle = style({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
});

export const listItemHeadlineStyle = style({
  color: THEME.color.onSurface,
  fontFamily: THEME.text.body.large.family,
  fontSize: THEME.text.body.large.size,
  fontWeight: THEME.text.body.large.weight,
  lineHeight: THEME.text.body.large.lineHeight,
  letterSpacing: THEME.text.body.large.letterSpacing,
});
export const listItemSubtitleStyle = style({
  color: THEME.color.onSurfaceVariant,
  fontFamily: THEME.text.body.medium.family,
  fontSize: THEME.text.body.medium.size,
  fontWeight: THEME.text.body.medium.weight,
  lineHeight: THEME.text.body.medium.lineHeight,
  letterSpacing: THEME.text.body.medium.letterSpacing,
});
