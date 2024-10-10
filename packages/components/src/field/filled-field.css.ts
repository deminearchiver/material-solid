import { THEME } from "@material-solid/vanilla-extract/contract";
import type { ComplexStyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const backgroundStyle = recipe({
  base: {
    position: "absolute",
    inset: 0,

    borderRadius: "inherit",
    backgroundColor: THEME.color.surfaceContainerHighest,

    pointerEvents: "none",
  },
});
export const stateLayerStyle = recipe({
  base: {
    position: "absolute",
    inset: 0,

    borderRadius: "inherit",


    pointerEvents: "none",
  },
  variants: {

  },
});


const ACTIVE_INDICATOR_PSEUDO: ComplexStyleRule = {
  content: "",

  position: "absolute",
  inset: "auto 0 0 0",
  width: "100%",

  borderBottomWidth: 1,
  borderBottomStyle: "solid",

}

export const activeIndicatorStyle = recipe({
  base: {
    position: "absolute",
    inset: "auto 0 0 0",
    width: "100%",
    zIndex: 1,

    pointerEvents: "none",

    "::before": {
      ...ACTIVE_INDICATOR_PSEUDO,
      borderBottomColor: THEME.color.onSurfaceVariant,
    },
    "::after": {
      ...ACTIVE_INDICATOR_PSEUDO,
      opacity: 0,

      borderBottomColor: THEME.color.primary,
      borderBottomWidth: 3,

      transitionProperty: "opacity",
      transitionDuration: THEME.duration.short3,
      transitionTimingFunction: THEME.easing.emphasized,
    },


  },
  variants: {
    focused: {
      false: {},
      true: {
        "::after": {
          opacity: 1,
        }
      },
    }
  }
});
