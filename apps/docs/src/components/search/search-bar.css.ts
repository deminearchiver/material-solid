import { rippleTheme } from "@material-solid/components/ripple/theme";
import { style } from "@vanilla-extract/css";
import { THEME } from "~/theme";

export const containerStyle = style({
  position: "relative",

  minWidth: 280,
  height: 56,

  borderRadius: THEME.shape.full,

  backgroundColor: THEME.color.surfaceContainerHighest,
  color: THEME.color.onSurfaceVariant,

  display: "flex",
  alignItems: "center",
  gap: 16,
  paddingInline: 16,


  vars: {
    [rippleTheme.hoverColor]: THEME.color.onSurfaceVariant,
    [rippleTheme.pressedColor]: THEME.color.onSurfaceVariant,
  }
});

export const inputStyle = style({
  appearance: "none",
  backgroundColor: "transparent",
  border: "none",
  outline: "none",

  flexGrow: 1,
  height: "100%",

  ...THEME.text.body.large,
  color: THEME.color.onSurface,

  "::placeholder": {
    color: THEME.color.onSurfaceVariant,
  },
});

export const leadingIconStyle = style({
  color: THEME.color.onSurface,
});
export const trailingIconStyle = style({
  color: THEME.color.onSurfaceVariant,
});
