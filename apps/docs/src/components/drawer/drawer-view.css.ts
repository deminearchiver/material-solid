import { recipe } from "@vanilla-extract/recipes";
import { THEME } from "~/theme";

export const dialogStyle = recipe({
  base: {
    position: "fixed",
    left: 0,
    margin: 0,
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",

    outline: "none",
    border: "none",
    backgroundColor: "transparent",

    transitionProperty: "width, translate",

    borderStartEndRadius: THEME.shape.extraLarge,
    borderEndEndRadius: THEME.shape.extraLarge,

    "::backdrop": {
      backgroundColor: THEME.color.scrim,
      opacity: 0,

      transitionProperty: "opacity",
    },
  },
  variants: {
    visible: {
      false: {
        width: 0,
        translate: -144,

        "::backdrop": {
          opacity: 0,
        },
      },
      true: {
        width: 360,
        translate: 0,

        "::backdrop": {
          opacity: 0.32,
        },
      },
    },
    state: {
      entering: {
        transitionDuration: "600ms",
        transitionTimingFunction: THEME.easing.emphasizedDecelerate,

        "::backdrop": {
          transitionDuration: "600ms",
          transitionTimingFunction: THEME.easing.emphasizedDecelerate,
        },
      },
      exiting: {
        transitionDuration: "250ms",
        transitionTimingFunction: THEME.easing.emphasizedAccelerate,

        "::backdrop": {
          transitionDuration: "250ms",
          transitionTimingFunction: THEME.easing.emphasizedAccelerate,
        },
      },
    }
  },
});
