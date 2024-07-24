import { listItemTheme } from "@material-solid/components/list/theme";
import { createVar, style } from "@vanilla-extract/css";
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
        scale: 0.35,
        opacity: 0,
        borderRadius: 80,
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
        transitionDuration: "600ms, 600ms, 450ms",
        transitionTimingFunction: THEME.easing.emphasizedDecelerate,

        "::backdrop": {
          transitionDuration: "600ms",
          transitionTimingFunction: THEME.easing.emphasizedDecelerate,
        },
      },
    },
    exiting: {
      true: {
        scale: 0.35,
        transitionDuration: "300ms, 300ms, 150ms",
        transitionDelay: "0ms, 0ms, 150ms",
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

export const panelWrapperStyle = style({
  width: "100%",
  height: "100%",

  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
});

export const panelHeadlineStyle = style({
  paddingInline: 24,
  paddingBlockStart: 24,
  paddingBlockEnd: 16,

  textAlign: "center",
  ...THEME.text.headline.small,
  color: THEME.color.onSurface,
});


export const panelActionsStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  flexWrap: "wrap",
  gap: 8,
  padding: 24
});

export const settingsItemIndex = createVar();
export const settingsItemStyle = recipe({
  base: {
    transitionProperty: `translate, opacity`,

  },
  variants: {
    visible: {
      false: {
        opacity: 0,
        translate: "0 16px",
      },
      true: {
        opacity: 1,
        translate: 0,
      },
    },
    entering: {
      true: {
        transitionDuration: "600ms",
        transitionDelay: `calc(100ms * ${settingsItemIndex})`,
        transitionTimingFunction: THEME.easing.emphasizedDecelerate,
      },
    },
    exiting: {
      true: {
        translate: "0 -32px",

        transitionDuration: "300ms, 150ms",
        transitionDelay: "0ms, 50ms",
        transitionTimingFunction: THEME.easing.emphasizedAccelerate,
      },
    },
  },
  defaultVariants: {
    visible: false,
  },
});
