import { listItemTheme } from "@material-solid/components/list/theme";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { THEME } from "~/theme";

export const panelStyle = recipe({
  base: {
    position: "fixed",
    top: 0,
    left: 0,
    minWidth: 280,
    width: "min(100vw - 64px, 560px)",
    maxWidth: "100%",
    maxHeight: "100%",


    outline: "none",
    border: "none",
    margin: 0,

    overflow: "auto",

    isolation: "isolate",

    backgroundColor: THEME.color.surfaceContainer,
    paddingBlock: 24,

    scale: 0.35,
    opacity: 0,
    // borderRadius: THEME.shape.medium,
    borderRadius: 56,
    transformOrigin: "top right",

    transitionProperty: "scale, border-radius, opacity",

    vars: {
      [listItemTheme.paddingInline]: "24px",
    },

    "::backdrop": {
      backgroundColor: THEME.color.scrim,
      transitionProperty: "opacity",
    },
  },
  variants: {
    mounted: {
      false: {
        display: "none",
      },
    },
    visible: {
      false: {
        "::backdrop": {
          opacity: 0,
        }
      },
      true: {
        scale: 1,
        opacity: 1,
        borderRadius: 28,

        "::backdrop": {
          opacity: 0.32,
        }
      },
    },
    entering: {
      true: {
        transitionDuration: "500ms, 500ms, 300ms",
        transitionTimingFunction: THEME.easing.emphasizedDecelerate,

        "::backdrop": {
          transitionDuration: "500ms",
          transitionTimingFunction: THEME.easing.emphasizedDecelerate,
        },
      },
    },
    exiting: {
      true: {
        scale: 0.35,
        transitionDuration: "300ms, 150ms",
        transitionDelay: "0ms, 150ms",
        transitionTimingFunction: THEME.easing.emphasizedAccelerate,

        "::backdrop": {
          transitionDuration: "300ms",
          transitionTimingFunction: THEME.easing.emphasizedAccelerate,
        },
      },
    },
  },
  defaultVariants: {
    visible: false,
  },
});

export const panelWrapperStyle = recipe({
  base: {
    width: "100%",
    height: "100%",

    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    gap: 16,

    transitionProperty: "translate, opacity"
  },
  variants: {
    visible: {
      false: {
        translate: "0 -80px",
        opacity: 0,
      },
      true: {
        translate: 0,
        opacity: 1,
      },
    },
    entering: {
      true: {
        transitionDuration: "500ms, 300ms",
        transitionDelay: "0ms, 100ms",
        transitionTimingFunction: THEME.easing.emphasizedDecelerate,
      },
    },
    exiting: {
      true: {
        transitionDuration: "300ms, 150ms",
        transitionDelay: "0ms",
        transitionTimingFunction: THEME.easing.emphasizedAccelerate,
      },
    },
  },
  defaultVariants: {
    visible: false,
  },
});

export const panelActionsStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  flexWrap: "wrap",
  gap: 8,
  paddingInline: 24,
});
