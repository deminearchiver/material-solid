import { createTheme, createThemeContract, fallbackVar, style } from "@vanilla-extract/css";
import { rippleTheme } from "../ripple/theme.css";
import { THEME } from "@material-solid/vanilla-extract/contract";
import { recipe } from "@vanilla-extract/recipes";
import { iconButtonTheme } from "./theme.css";


export const iconButtonStyle = recipe({
  base: {
    userSelect: "none",
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
    // TODO: this code causes scroll overflows (fine probably, just add more customization options!!!)
    "::before": {
      content: "",
      position: "absolute",
      width: "max(48px, 100%)",
      height: "max(48px, 100%)",
    },
  },
  variants: {
    variant: {
      regular: {},
      filled: {},
      filledTonal: {},
      outlined: {},
    },
    selected: {
      false: {},
      true: {},
    },
  },
  defaultVariants: {
    variant: "regular",
  },
  compoundVariants: [
    {
      variants: {
        variant: "regular",
        selected: false,
      },
      style: {
        color: fallbackVar(iconButtonTheme.unselectedColor, THEME.color.onSurfaceVariant),
        vars: {
          [rippleTheme.hoverColor]: THEME.color.onSurfaceVariant,
          [rippleTheme.pressedColor]: THEME.color.onSurfaceVariant,
        },
      },
    },
    {
      variants: {
        variant: "regular",
        selected: true,
      },
      style: {
        color: fallbackVar(iconButtonTheme.selectedColor, THEME.color.primary),
        vars: {
          [rippleTheme.hoverColor]: THEME.color.primary,
          [rippleTheme.pressedColor]: THEME.color.primary,
        },
      },
    },
    {
      variants: {
        variant: "filled",
        selected: false,
      },
      style: {
        backgroundColor: THEME.color.surfaceContainerHighest,
        color: fallbackVar(iconButtonTheme.unselectedColor, THEME.color.primary),
        vars: {
          [rippleTheme.hoverColor]: THEME.color.primary,
          [rippleTheme.pressedColor]: THEME.color.primary,
        },
      },
    },
    {
      variants: {
        variant: "filled",
        selected: true,
      },
      style: {
        backgroundColor: THEME.color.primary,
        color: fallbackVar(iconButtonTheme.selectedColor, THEME.color.onPrimary),
        vars: {
          [rippleTheme.hoverColor]: THEME.color.onPrimary,
          [rippleTheme.pressedColor]: THEME.color.onPrimary,
        },
      },
    },
    {
      variants: {
        variant: "filledTonal",
        selected: false,
      },
      style: {
        backgroundColor: THEME.color.surfaceContainerHighest,
        color: fallbackVar(iconButtonTheme.unselectedColor, THEME.color.onSurfaceVariant),
        vars: {
          [rippleTheme.hoverColor]: THEME.color.onSurfaceVariant,
          [rippleTheme.pressedColor]: THEME.color.onSurfaceVariant,
        },
      },
    },
    {
      variants: {
        variant: "filledTonal",
        selected: true,
      },
      style: {
        backgroundColor: THEME.color.secondaryContainer,
        color: fallbackVar(iconButtonTheme.selectedColor, THEME.color.onSecondaryContainer),
        vars: {
          [rippleTheme.hoverColor]: THEME.color.onSecondaryContainer,
          [rippleTheme.pressedColor]: THEME.color.onSecondaryContainer,
        },
      },
    },
    {
      variants: {
        variant: "outlined",
        selected: false,
      },
      style: {
        backgroundColor: THEME.color.surface,
        color: fallbackVar(iconButtonTheme.unselectedColor, THEME.color.onSurfaceVariant),
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
    {
      variants: {
        variant: "outlined",
        selected: true,
      },
      style: {
        backgroundColor: THEME.color.inverseSurface,
        color: fallbackVar(iconButtonTheme.selectedColor, THEME.color.inverseOnSurface),
        vars: {
          [rippleTheme.hoverColor]: THEME.color.inverseOnSurface,
          [rippleTheme.pressedColor]: THEME.color.inverseOnSurface,
        },
      },
    },
  ],
});
