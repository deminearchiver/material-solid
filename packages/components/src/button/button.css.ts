import { recipe } from "@vanilla-extract/recipes";
import { THEME } from "@material-solid/vanilla-extract/contract";
import { rippleTheme } from "../ripple/theme.css";
import { style } from "@vanilla-extract/css";

export const buttonStyle = recipe({
  base: {
    position: "relative",
    minWidth: "max-content",
    height: 40,
    borderRadius: THEME.shape.full,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingInlineEnd: 24,

    appearance: "none",
    background: "none",
    border: "none",
    outline: "none",

    textDecoration: "none",
    userSelect: "none",
    cursor: "pointer",

    fontFamily: THEME.text.label.large.family,
    fontSize: THEME.text.label.large.size,
    fontWeight: THEME.text.label.large.weight,
    lineHeight: THEME.text.label.large.lineHeight,
    letterSpacing: THEME.text.label.large.letterSpacing,
  },
  variants: {
    withIcon: {
      false: {
        paddingInlineStart: 24,
      },
      true: {
        paddingInlineStart: 16,
      }
    },
    variant: {
      elevated: {
        backgroundColor: THEME.color.surfaceContainerLow,
        color: THEME.color.primary,
        vars: {
          [rippleTheme.hoverColor]: THEME.color.primary,
          [rippleTheme.pressedColor]: THEME.color.primary,
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
      filledTonal: {
        backgroundColor: THEME.color.secondaryContainer,
        color: THEME.color.onSecondaryContainer,
        vars: {
          [rippleTheme.hoverColor]: THEME.color.onSecondaryContainer,
          [rippleTheme.pressedColor]: THEME.color.onSecondaryContainer,
        },
      },
      outlined: {
        color: THEME.color.primary,
        // border: `1px solid ${THEME.color.outline}`,
        vars: {
          [rippleTheme.hoverColor]: THEME.color.primary,
          [rippleTheme.pressedColor]: THEME.color.primary,
        },
      },
      text: {
        color: THEME.color.primary,
        vars: {
          [rippleTheme.hoverColor]: THEME.color.primary,
          [rippleTheme.pressedColor]: THEME.color.primary,
        },
      },
    },
    disabled: {
      true: {
        backgroundColor: `color-mix(in srgb, ${THEME.color.onSurface} 12%, transparent)`,
        color: `color-mix(in srgb, ${THEME.color.onSurface} 38%, transparent)`,
        pointerEvents: "none",
      },
    },
  },
  defaultVariants: {
    withIcon: false,
    disabled: false,
  },
  compoundVariants: [
    {
      variants: {
        variant: "outlined",
        disabled: true,
      },
      style: {
        backgroundColor: "transparent",
      },
    },
    {
      variants: {
        variant: "text",
        disabled: true,
      },
      style: {
        backgroundColor: "transparent",
      },
    },
  ]
});

export const buttonOutlineStyle = recipe({
  base: {
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
  },
  variants: {
    variant: {
      elevated: {},
      filled: {},
      filledTonal: {},
      outlined: {
        border: `1px solid ${THEME.color.outline}`,
        selectors: {
          [`${buttonStyle.classNames.base}:focus-visible > &`]: {
            borderColor: THEME.color.primary,
          },
        },
      },
      text: {},
    },
    disabled: {
      true: {
        borderColor: `color-mix(in srgb, ${THEME.color.onSurface} 12%, transparent)`,
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export const buttonIconStyle = style({
  fontSize: 18,
});
