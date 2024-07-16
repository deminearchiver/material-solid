import { THEME } from "@material-solid/vanilla-extract/contract";
import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";


export const containerStyle = style({
  width: "100%",
  position: "relative",
  height: 44,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const inputStyle = recipe({
  base: {
    WebkitTapHighlightColor: "transparent",
    opacity: 0,
    appearance: "none",
    boxSizing: "border-box",

    position: "absolute",
    width: "100%",
    height: "100%",
    margin: 0,
    pointerEvents: "auto",
  },
  variants: {
    pressed: {
      false: {
        cursor: "grab",
      },
      true: {
        cursor: "grabbing",
      },
    },
  },
});
export const segmentFraction = createVar();
export const segmentStyle = style({
  userSelect: "none",
  pointerEvents: "none",

  position: "relative",

  minWidth: 0,
  flexGrow: segmentFraction,
  height: 16,

  // transition: "flex-grow 300ms ease-out",
});

export const segmentShapeStyle = recipe({
  base: {
    position: "absolute",
    overflow: "hidden",

    insetBlock: 0,
    borderRadius: THEME.shape.extraSmall,

    transition: `inset-inline 100ms ${THEME.easing.standard}`,
  },
  variants: {
    active: {
      false: {
        backgroundColor: THEME.color.secondaryContainer,
        "::before": {
          backgroundColor: THEME.color.primary,
        },
      },
      true: {
        backgroundColor: THEME.color.primary,
        "::before": {
          backgroundColor: THEME.color.secondaryContainer,
        },
      },
    },
    edge: {
      start: {
        insetInline: "0 6px",
        borderStartStartRadius: 8,
        borderEndStartRadius: 8,
      },
      end: {
        insetInline: "6px 0",
        borderStartEndRadius: 8,
        borderEndEndRadius: 8,
      },
    },
    pressed: {
      true: {},
    },
    stop: {
      true: {
        "::before": {
          content: "",
          position: "absolute",
          top: "50%",
          translate: "0 -50%",
          width: 4,
          height: 4,
          borderRadius: THEME.shape.full,
        },
      },
    },
  },
  defaultVariants: {
    pressed: false,
    active: false,
    stop: false,
  },
  compoundVariants: [
    {
      variants: {
        edge: "start",
        pressed: true,
      },
      style: {
        insetInlineEnd: 5,
      },
    },
    {
      variants: {
        edge: "end",
        pressed: true,
      },
      style: {
        insetInlineStart: 5,
      },
    },
    {
      variants: {
        edge: "start",
        stop: true,
      },
      style: {
        "::before": {
          insetInlineStart: 6, // TODO: 6dp seems to look nicer, but the official specification says 4dp
        },
      },
    },
    {
      variants: {
        edge: "end",
        stop: true,
      },
      style: {
        "::before": {
          insetInlineEnd: 6, // TODO: 6dp seems to look nicer, but the official specification says 4dp
        },
      },
    },
  ],
});

export const focusStyle = style({
  borderRadius: THEME.shape.extraSmall,
  insetInline: -5,
});

export const handleStyle = style({
  userSelect: "none",
  pointerEvents: "none",

  position: "relative",
  width: 4,
  height: 44,

  display: "flex",
  placeItems: "center",
  placeContent: "center",

  transitionProperty: "width, margin-inline",
  transitionDuration: "150ms",
  transitionTimingFunction: THEME.easing.standard,
});

export const handleIndicatorStyle = recipe({
  base: {
    zIndex: 2,
    position: "absolute",
    inset: 0,
    backgroundColor: THEME.color.primary,
    borderRadius: THEME.shape.full,

    transitionProperty: "inset-inline",
    transitionDuration: "150ms",
    transitionTimingFunction: THEME.easing.standard,
  },
  variants: {
    pressed: {
      true: {
        insetInline: 1,
      },
    },
  },
  defaultVariants: {
    pressed: false,
  }
});

export const labelStyle = recipe({
  base: {
    position: "absolute",
    left: "50%",
    translate: "-50%",

    bottom: "calc(100% + 4px)",

    display: "flex",
    placeItems: "center",
    placeContent: "center",

    transformOrigin: "top center",
    overflow: "hidden",
    paddingBlock: 12,
    paddingInline: 16,
    zIndex: 1,

    borderRadius: THEME.shape.full,
    backgroundColor: THEME.color.inverseSurface,

    transitionProperty: "scale, bottom",
    transitionDuration: "200ms",
  },
  variants: {
    visible: {
      false: {
        scale: 0,
        bottom: 0,

        transitionTimingFunction: THEME.easing.standardAccelerate,
      },
      true: {
        transitionTimingFunction: THEME.easing.standardDecelerate,
      }
    }
  },
  defaultVariants: {
    visible: false,
  },
});

export const labelTextStyle = recipe({
  base: {
    width: "max-content",
    fontFamily: THEME.text.label.medium.family,
    fontSize: THEME.text.label.medium.size,
    fontWeight: THEME.text.label.medium.weight,
    lineHeight: THEME.text.label.medium.lineHeight,
    letterSpacing: THEME.text.label.medium.letterSpacing,
    color: THEME.color.inverseOnSurface,

    transitionProperty: "translate",
    transitionDuration: "200ms",
  },
  variants: {
    visible: {
      false: {
        translate: "0 -100%",
        transitionTimingFunction: THEME.easing.standardAccelerate,
      },
      true: {
        transitionTimingFunction: THEME.easing.standardDecelerate,
      },
    }
  },
  defaultVariants: {
    visible: false,
  },
});



export const stopsStartInset = createVar();
export const stopsEndInset = createVar();

const stopsOffset = createVar();

export const stopsStyle = recipe({
  base: {
    userSelect: "none",
    pointerEvents: "none",

    position: "absolute",
    top: "50%",
    translate: "0 -50%",
    left: 0,
    right: 0,
    height: 4,
    zIndex: 1,

    clipPath: `inset(
      0
      ${fallbackVar(stopsEndInset, "0")}
      0
      ${fallbackVar(stopsStartInset, "0")}
    )`,
    // transitionProperty: "clip-path",
    // transitionDuration: "300ms",
    // transitionTimingFunction: "linear",
  },
  variants: {
    active: {
      false: {
        backgroundColor: THEME.color.primary,
      },
      true: {
        backgroundColor: THEME.color.secondaryContainer,
      },
    },
    pressed: {
      false: {
        vars: {
          [stopsOffset]: "8px",
        },
      },
      true: {
        vars: {
          [stopsOffset]: "7px",
        },
      },
    }
  },
  defaultVariants: {
    active: false,
    pressed: false,
  },
})
