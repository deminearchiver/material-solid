import { fallbackVar, style } from "@vanilla-extract/css";
import { rippleTheme } from "../ripple/theme.css";
import { THEME } from "@material-solid/vanilla-extract/contract";
import { recipe } from "@vanilla-extract/recipes";

export const iconButtonStyle = recipe({
  base: {
    WebkitTapHighlightColor: "transparent",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    border: "none",
    width: 40,
    height: 40,
    borderRadius: THEME.shape.full,
    padding: 8,
    outline: "none",
    backgroundColor: "transparent",
    color: "transparent",
    cursor: "pointer",

    fontSize: 24,

    ":disabled": {
      cursor: "none",
      pointerEvents: "none",
    },
    // TODO: this code causes scroll overflows
    "::before": {
      content: "",
      position: "absolute",
      width: "max(48px, 100%)",
      height: "max(48px, 100%)",
    },
  },
  variants: {
    variant: {
      regular: {
        color: THEME.color.onSurfaceVariant,
        vars: {
          [rippleTheme.hoverColor]: THEME.color.onSurfaceVariant,
          [rippleTheme.pressedColor]: THEME.color.onSurfaceVariant,
        },
      },
      filled: {
        backgroundColor: THEME.color.primary,
        color: THEME.color.onPrimary,
        vars: {
          [rippleTheme.hoverColor]: THEME.color.onPrimary,
          [rippleTheme.pressedColor]: THEME.color.onPrimary,
        },
      },
      tonal: {
        backgroundColor: THEME.color.secondaryContainer,
        color: THEME.color.onSecondaryContainer,
        vars: {
          [rippleTheme.hoverColor]: THEME.color.onSecondaryContainer,
          [rippleTheme.pressedColor]: THEME.color.onSecondaryContainer,
        },
      },
      outlined: {
        backgroundColor: THEME.color.surface,
        color: THEME.color.onSurfaceVariant,
        "::after": {
          content: "",
          position: "absolute",
          inset: 0,
          border: `1px solid ${THEME.color.outline}`,
          borderRadius: "inherit",
        },
        vars: {
          [rippleTheme.hoverColor]: THEME.color.onSurfaceVariant,
          [rippleTheme.pressedColor]: THEME.color.onSurfaceVariant,
        },
      },
    },
  },
  defaultVariants: {
    variant: "regular",
  },
});

