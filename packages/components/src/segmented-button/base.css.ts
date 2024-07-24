import { createVar, keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { rippleTheme } from "../ripple/theme.css";
import { THEME } from "@material-solid/vanilla-extract/contract";

export const segmentedButtonStyle = style({
  width: "100%",
  height: 40,

  display: "grid",
  gridAutoColumns: "1fr",
  gridAutoFlow: "column",
  gridAutoRows: "auto",
});

export const buttonSegmentStyle = recipe({
  base: {
    WebkitTapHighlightColor: "transparent",
    position: "relative",

    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "middle",
    paddingInline: 12,

    border: "none",
    borderRadius: "inherit",
    outline: "none",
    textTransform: "inherit",
    backgroundColor: "transparent",

    ...THEME.text.label.large,

    cursor: "pointer",
    transitionProperty: "background-color, color",

    ":first-child": {
      borderStartStartRadius: THEME.shape.full,
      borderEndStartRadius: THEME.shape.full,
    },
    ":last-child": {
      borderEndEndRadius: THEME.shape.full,
      borderStartEndRadius: THEME.shape.full,
    },
  },
  variants: {
    selected: {
      false: {
        color: THEME.color.onSurface,
        vars: {
          [rippleTheme.hoverColor]: THEME.color.onSurface,
          [rippleTheme.pressedColor]: THEME.color.onSurface,
        },
      },
      true: {
        backgroundColor: THEME.color.secondaryContainer,
        color: THEME.color.onSecondaryContainer,
        vars: {
          [rippleTheme.hoverColor]: THEME.color.onSecondaryContainer,
          [rippleTheme.pressedColor]: THEME.color.onSecondaryContainer,
        },
      },
    },
    state: {
      selecting: {
        transitionDuration: "100ms",
        transitionDelay: "100ms",
        transitionTimingFunction: THEME.easing.standard,
      },
      deselecting: {
        transitionDuration: "100ms",
        transitionTimingFunction: "linear",
      },
    },
    disabled: {
      true: {
        cursor: "default",
        backgroundColor: "transparent",
        color: `color-mix(in srgb, ${THEME.color.onSurface} 38%, transparent)`,
      },
    },
  },
  defaultVariants: {
    selected: false,
    disabled: false,
  }
});

export const buttonSegmentOutlineStyle = recipe({
  base: {
    position: "absolute",
    borderRadius: "inherit",
    borderStyle: "solid",
    borderWidth: 1,
    inset: "0px -0.5px",
    pointerEvents: "none",
  },
  variants: {
    disabled: {
      false: {
        borderColor: THEME.color.outline,
      },
      true: {
        borderColor: `color-mix(in srgb, ${THEME.color.onSurface} 12%, transparent)`,
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
});


// const checkmarkPathLength = createVar();

const CHECKMARK_PATH_LENGTH = 29.7833385;
// const CHECKMARK_PATH_LENGTH = 19.129426956176758; // Material Symbol 24opsz
// const CHECKMARK_PATH_LENGTH = 16.536; // Material Symbol 20opsz

const checkmarkDrawIn = keyframes({
  from: {
    strokeDashoffset: CHECKMARK_PATH_LENGTH,
  },
  to: {
    strokeDashoffset: 0,
  },
});
const checkmarkFadeOut = keyframes({
  from: {
    strokeWidth: 2,
  },
  to: {
    strokeWidth: 0,
  },
});
const fontVariationSettings = (settings: Record<string, string | number>) => {
  return Object.entries(settings)
    .map(([axis, value]) => `"${axis}" ${value}`)
    .join(", ");
}

const visibleVariations = fontVariationSettings({
  wght: 400,
  opsz: 20,
});
const invisibleVariations = fontVariationSettings({
  wght: 100,
  opsz: 20,
});


const iconScaleDown = keyframes({
  from: {
    fontVariationSettings: visibleVariations,
  },
  to: {
    fontVariationSettings: invisibleVariations,
  },
});
const iconScaleUp = keyframes({
  from: {
    fontVariationSettings: invisibleVariations,
  },
  to: {
    fontVariationSettings: visibleVariations,
  },
});

const iconFadeOut = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
});
const iconFadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});


export const buttonSegmentLeadingStyle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "flex-start",
});

export const buttonSegmentGraphicStyle = recipe({
  base: {
    // width: 18,
    position: "relative",
    overflow: "hidden",
    height: 18,
    fontSize: 18,

    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-start",

    transition: `width 150ms ${THEME.easing.standard}`,
  },
  variants: {
    withLabel: {
      false: {
        width: 18,
      },
      true: {
        width: 18 + 8,
      },
    },
    selected: {
      false: {
        // width: 0,
      },
    },
  },
  defaultVariants: {
    withLabel: false,
    selected: false,
  },
});

export const buttonSegmentCheckmarkStyle = recipe({
  base: {
    position: "absolute",
    width: 18,
    height: 18,
    display: "inline-flex",
  },
  variants: {
    selected: {
      false: {
        // opacity: 0,
      },
      true: {

      }
    },
  },
});
export const buttonSegmentCheckmarkPathStyle = recipe({
  base: {
    strokeWidth: 2,
    strokeDasharray: CHECKMARK_PATH_LENGTH,
  },
  variants: {
    state: {
      selecting: {
        strokeDashoffset: CHECKMARK_PATH_LENGTH,
        animationName: checkmarkDrawIn,
        animationDuration: "400ms",
        animationDelay: "100ms",
        animationFillMode: "forwards",
        animationTimingFunction: THEME.easing.emphasizedDecelerate,
      },
      deselecting: {
        animationName: checkmarkFadeOut,
        animationDuration: "100ms",
        animationFillMode: "forwards",
        animationTimingFunction: "linear",
      },
    },
    disabled: {
      false: {
        stroke: THEME.color.onSecondaryContainer,
      },
      true: {
        stroke: `color-mix(in srgb, ${THEME.color.onSurface} 38%, transparent)`,
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
  compoundVariants: [
    {
      variants: {
        state: undefined,
      },
      style: {
        opacity: 0,
      }
    }
  ]
});
export const buttonSegmentIconStyle = recipe({
  base: {
    width: 18,
    height: 18,
    fontSize: 18,
    fontVariationSettings: visibleVariations,
  },
  variants: {
    state: {
      selecting: {
        animationName: `${iconFadeOut}, ${iconScaleDown}`,
        animationDuration: "100ms",
        animationFillMode: "forwards",
        animationTimingFunction: `linear, ${THEME.easing.emphasizedAccelerate}`,
      },
      deselecting: {
        fontVariationSettings: invisibleVariations,
        opacity: 0,
        animationName: `${iconFadeIn}, ${iconScaleUp}`,
        animationDuration: "50ms, 400ms",
        animationDelay: "100ms",
        animationFillMode: "forwards",
        animationTimingFunction: `linear, ${THEME.easing.emphasizedDecelerate}`,
      },
    },
  },
});

export const buttonSegmentMaterialSymbolStyle = style({
  fontSize: "inherit",
  fontVariationSettings: "inherit",
})

export const buttonSegmentLabelStyle = recipe({

});





export const buttonSegmentTouchStyle = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "100%",
  height: 48,
  transform: "translate(-50%, -50%)",
});
