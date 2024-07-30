import { keyframes } from "@vanilla-extract/css";
import { THEME } from "@material-solid/vanilla-extract/contract";
import { recipe } from "@vanilla-extract/recipes";

const DURATION_MS = 500;

const growAnimation = keyframes({
  from: {
    outlineWidth: 0,
  },
  to: {
    outlineWidth: 8,
  }
});
const shrinkAnimation = keyframes({
  from: {
    outlineWidth: 8,
  },
});

export const focusStyle = recipe({
  base: {
    position: "absolute",

    // display: "none",
    pointerEvents: "none",
    boxSizing: "border-box",
    borderRadius: "inherit",
    inset: -2,

    outlineStyle: "solid",
    outlineColor: THEME.color.secondary,

    zIndex: 1,

    "@media": {
      "(prefers-reduced-motion)": {
        animation: "none",
        transition: "none",
      }
    }
  },
  variants: {
    visible: {
      false: {
        outlineWidth: 0,

        // transitionProperty: "outline-width",
        // transitionDuration: THEME.duration.short1,
        // transitionTimingFunction: THEME.easing.standardAccelerate,
      },
      true: {
        display: "flex",
        outlineWidth: 3,

        animationName: `${growAnimation}, ${shrinkAnimation}`,
        animationDelay: `0s, ${DURATION_MS * 0.25}ms`,
        animationDuration: `${DURATION_MS * 0.25}ms, ${DURATION_MS * 0.75}ms`,
        animationTimingFunction: `${THEME.easing.standardDecelerate}, ${THEME.easing.standard}`,
      },
    },
  },
  defaultVariants: {
    visible: false,
  }
});
