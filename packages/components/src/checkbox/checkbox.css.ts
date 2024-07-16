import { THEME } from "@material-solid/vanilla-extract/contract";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { rippleTheme } from "../ripple/theme.css";

export const checkboxStyle = recipe({
  base: {
    WebkitTapHighlightColor: "transparent",
    position: "relative",
    width: 18,
    height: 18,
    verticalAlign: "top",

    display: "inline-flex",
    borderRadius: 2,

    cursor: "pointer",
  },
  variants: {
    disabled: {
      true: {
        cursor: "default",
      },
    },
  },
});

export const splashStyle = recipe({
  base: {
    inset: "unset",
    width: 40,
    height: 40,
    borderRadius: 9999,
  },
  variants: {
    selected: {
      false: {
        vars: {
          [rippleTheme.hoverColor]: THEME.color.onSurface,
          [rippleTheme.pressedColor]: THEME.color.primary,
        },
      },
      true: {
        vars: {
          [rippleTheme.hoverColor]: THEME.color.primary,
          [rippleTheme.pressedColor]: THEME.color.onSurface,
        },
      },
    },
  },
});

export const inputStyle = style({
  position: "absolute",
  width: 48,
  height: 48,
  zIndex: 1,

  appearance: "none",
  opacity: 0,
  outline: "none",
  margin: 0,

  cursor: "inherit",
});

export const focusStyle = style({
  inset: "unset",
  width: 44,
  height: 44,
});

export const containerStyle = style({
  position: "relative",
  width: "100%",
  height: "100%",

  display: "flex",
  placeContent: "center",
  placeItems: "center",

  borderRadius: "inherit",
});


export const outlineStyle = recipe({
  base: {
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    borderWidth: 2,
    borderStyle: "solid",
    borderCollapse: THEME.color.onSurfaceVariant,

    "@media": {
      "(forced-colors: active)": {
        borderColor: "CanvasText",
      },
    },
  },
  variants: {
    selected: {
      false: {

      },
      true: {
        backgroundColor: THEME.color.primary,
      },
    },
    disabled: {
      true: {
        "@media": {
          "(forced-colors: active)": {
            borderColor: "GrayText",
            opacity: 1,
          },
        },
      },
    },
  },
});

export const zoomStyle = recipe({
  base: {
    transitionProperty: "scale, opacity",
  },
  variants: {
    selected: {
      false: {
        opacity: 0,
        scale: 0.6,

        transitionDuration: "150ms, 50ms",
        transitionTimingFunction: `${THEME.easing.emphasizedAccelerate}, linear`,
      },
      true: {
        opacity: 1,
        scale: 1,

        transitionDuration: "350ms, 50ms",
        transitionTimingFunction: `${THEME.easing.emphasizedDecelerate}, linear`,
      },
    }
  },
})

export const backgroundStyle = recipe({
  base: [
    zoomStyle.classNames.base,
    {
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    backgroundColor: THEME.color.primary,

    // Transitions


    "@media": {
      "(forced-colors: active)": {
        backgroundColor: "CanvasText",
      },
    },
    }
  ],
  variants: {
    selected: zoomStyle.classNames.variants.selected,
    disabled: {
      true: {
        "@media": {
          "(forced-colors: active)": {
            backgroundColor: "GrayText",
            opacity: 1,
          },
        },
      },
    },
  },
});



export const iconStyle = recipe({
  base: [
    zoomStyle.classNames.base,
    {
      position: "absolute",
      inset: 0,
      width: 18,
      height: 18,
    }
  ],
  variants: {
    selected: {
      false: [
        zoomStyle.classNames.variants.selected.false,
        {
          fill: THEME.color.onSurface,
        }
      ],
      true: [
        zoomStyle.classNames.variants.selected.true,
        {
          fill: THEME.color.onPrimary,
        }
      ],
    },
  },
});

export const markStyle = recipe({
  base: {
    "@media": {
      "(forced-colors: active)": {
        fill: "Canvas",
      },
    },
  },
  variants: {
    kind: {
      short: {
        width: 2,
        height: 2,
        transitionProperty: "transform, height",
      },
      long: {
        width: 10,
        height: 2,
        transitionProperty: "transform, width",
      },
    },
    selected: {
      false: {
        transitionDuration: "150ms",
        transitionTimingFunction: THEME.easing.emphasizedAccelerate,
      },
      true: {
        transform: "scaleY(-1) translate(7px, -14px) rotate(45deg)",

        transitionDuration: "350ms",
        transitionTimingFunction: THEME.easing.emphasizedDecelerate,
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        kind: "short",
        selected: true,
      },
      style: {
        height: Math.sqrt(32),
      },
    },
    {
      variants: {
        kind: "long",
        selected: true,
      },
      style: {
        width: Math.sqrt(128),
      },
    },
  ],
});
