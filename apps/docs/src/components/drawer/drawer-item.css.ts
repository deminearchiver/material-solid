import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { THEME } from "~/theme";
import { rippleTheme } from "@material-solid/components/ripple/theme";
import { fontVariationSettings } from "@material-solid/utils/vanilla-extract";

export const containerStyle = recipe({
  base: {
    WebkitTapHighlightColor: "transparent",
    position: "relative",
    width: "100%",
    height: 56,
    // isolation: "isolate",

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingInline: 16,
    gap: 12,

    border: "none",
    outline: "none",
    background: "none",
    borderRadius: THEME.shape.full,

    transitionProperty: "color",
    transitionDuration: "600ms",
    transitionTimingFunction: THEME.easing.emphasized,

    // "::before": {
    //   content: "",
    //   position: "absolute",
    //   insetBlock: 0,
    //   zIndex: -1,

    //   backgroundColor: THEME.color.secondaryContainer,
    //   borderRadius: "inherit",

    //   transitionProperty: "inset-inline, opacity",
    // },
  },
  variants: {
    visible: {
      false: {
        cursor: "pointer",
        pointerEvents: "all",
        color: THEME.color.onSurfaceVariant,

        // "::before": {
        //   insetInline: "30%",
        //   opacity: 0,
        // },
        vars: {
          [rippleTheme.hoverColor]: THEME.color.onSurfaceVariant,
          [rippleTheme.pressedColor]: THEME.color.onSurfaceVariant,
        },
      },
      true: {
        cursor: "default",
        pointerEvents: "none",
        color: THEME.color.onSecondaryContainer,

        // "::before": {
        //   insetInline: 0,
        //   opacity: 1,
        // },
      },
    },
    // state: {
    //   entering: {
    //     "::before": {
    //       transitionDuration: "600ms",
    //       transitionTimingFunction: THEME.easing.emphasized,
    //     },
    //   },
    //   exiting: {
    //     "::before": {
    //       insetInline: 0,
    //       transitionDuration: "200ms",
    //       transitionTimingFunction: THEME.easing.standard,
    //     },
    //   },
    // },
  },
});

export const indicatorStyle = recipe({
  base: {
    position: "absolute",
    insetBlock: 0,
    zIndex: -1,

    backgroundColor: THEME.color.secondaryContainer,
    borderRadius: "inherit",

    transitionProperty: "inset-inline, opacity",
  },
  variants: {
    visible: {
      false: {
        insetInline: "30%",
        opacity: 0,
      },
      true: {
        insetInline: 0,
        opacity: 1,
      },
    },
    state: {
      entering: {
        transitionDuration: "600ms",
        transitionTimingFunction: THEME.easing.emphasized,
      },
      exiting: {
        insetInline: 0,
        transitionDuration: "200ms",
        transitionTimingFunction: THEME.easing.standard,
      },
    },
  },
});

export const iconStyle = recipe({
  base: {
    transitionProperty: "font-variation-settings",
  },
  variants: {
    selected: {
      false: {
        fontVariationSettings: fontVariationSettings({
          FILL: 0,
        }),
      },
      true: {
        fontVariationSettings: fontVariationSettings({
          FILL: 1,
        }),
      },
    },
    state: {
      entering: {
        transitionDuration: "600ms",
        transitionTimingFunction: THEME.easing.emphasized,
      },
      exiting: {
        transitionDuration: "200ms",
        transitionTimingFunction: THEME.easing.emphasized,
      },
    },
  }
});

export const labelStyle = style({
  textAlign: "start",
  flexGrow: 1,
  ...THEME.text.label.large,
});

export const headlineStyle = style({
  height: 56,
  display: "flex",
  alignItems: "center",
  paddingInline: 16,

  ...THEME.text.title.small,
  color: THEME.color.onSurfaceVariant,
});
