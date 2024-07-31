import { THEME } from "@material-solid/vanilla-extract/contract";
import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const switchStyle = recipe({
  base: {
    WebkitTapHighlightColor: "transparent",

    position: "relative",
    flexShrink: 0,
    width: 52,
    height: 32,

    display: "inline-flex",
    alignItems: "center",

    borderRadius: THEME.shape.full,
  },
});

export const inputStyle = style({
  appearance: "none",
  outline: "none",

  position: "absolute",
  width: "100%",
  height: 48,
  margin: 0,
  zIndex: 1,
  cursor: "inherit",
});

export const trackStyle = recipe({
  base: {
    position: "absolute",
    inset: 0,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: "inherit",


    "::before": {
      content: "",
      position: "absolute",
      inset: 0,

      borderWidth: 2,
      borderStyle: "solid",
      borderRadius: "inherit",

      transitionProperty: "background-color, border-color, opacity",
      transitionDuration: "67ms",
      transitionTimingFunction: "linear",
    },
  },
  variants: {
    selected: {
      false: {
        "::before": {
          backgroundColor: THEME.color.surfaceContainerHighest,
          borderColor: THEME.color.outline,
        },
      },
      true: {
        "::before": {
          backgroundColor: THEME.color.primary,
          borderColor: THEME.color.primary,
        }

      },
    },
    disabled: {
      true: {
        "::before": {

        },
      },
    },
  },
  defaultVariants: {
    selected: false,
  },
});

const a1 = keyframes({
  "0%": {
    marginInlineEnd: 20,
  },
  "100%": {
    marginInlineStart: 20,
  },
});
const a2 = keyframes({
  "0%": {
    width: 28,
    height: 28,
  },
  "50%": {
    width: 32,
    height: 20,
  },
  "100%": {
    width: 24,
    height: 24,
  },
});

export const handleContainerStyle = recipe({
  base: {
    position: "relative",

    display: "flex",
    placeItems: "center",
    placeContent: "center",

    transition: "margin-inline 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    // animation: `${a1} 1000ms linear both alternate infinite`
  },
  variants: {
    selected: {
      false: {
        marginInlineEnd: 20,
      },
      true: {
        marginInlineStart: 20,
      },
    },
  }
});

export const handleStyle = recipe({
  base: {
    zIndex: 0,

    display: "flex",
    placeItems: "center",
    placeContent: "center",

    borderRadius: THEME.shape.full,

    transitionProperty: "width, height",
    transitionDuration: "250ms",
    transitionTimingFunction: THEME.easing.standard,

    "::before": {
      content: "",
      position: "absolute",
      inset: 0,

      borderRadius: "inherit",
      transition: "background-color 67ms linear",
    },

    selectors: {
      [`${switchStyle.classNames.base}:active &`]: {
        width: 28,
        height: 28,
        transitionDuration: "100ms",
        transitionTimingFunction: "linear",
      },
    }
  },
  variants: {
    selected: {
      false: {
        width: 16,
        height: 16,

        "::before": {
          backgroundColor: THEME.color.outline,
        },
        selectors: {
          [`${switchStyle.classNames.base}:active &::before`]: {
            backgroundColor: THEME.color.onSurfaceVariant,
          },
        },
      },
      true: {
        width: 24,
        height: 24,

        "::before": {
          backgroundColor: THEME.color.onPrimary,
        },

        selectors: {
          [`${switchStyle.classNames.base}:active &::before`]: {
            backgroundColor: THEME.color.primaryContainer,
          },
        },
      },
    },
  },
});

const animation = keyframes({
  "0%": {
    left: 0,
  },
  "50%": { // 6 with padding, 8 without
    left: 6,
    right: 6
  },
  "100%": {
    right: 0,
  },
})

// Animation:

// Hover: 28px
// Unselected: 16px
// Selected: 24px

// Stretch: height 20px padding 8px
