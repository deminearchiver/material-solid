import { rippleTheme } from "@material-solid/components/ripple/theme";
import { fontVariationSettings } from "@material-solid/utils/vanilla-extract";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { THEME } from "~/theme";

export const toggleStyle = recipe({
  base: {
    position: "relative",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingInline: 16,
    paddingBlock: 8,

    backgroundColor: "transparent",
    outline: "none",
    border: "none",
    borderRadius: THEME.shape.full,

    ...THEME.text.body.large,

    fontVariationSettings: fontVariationSettings({ GRAD: 0 }),

    transitionProperty: "font-variation-settings",
    transitionDuration: "300ms",
    transitionTimingFunction: THEME.easing.standard,
  },
  variants: {
    selected: {
      false: {
        color: THEME.color.onSurfaceVariant,
        vars: {
          [rippleTheme.hoverColor]: THEME.color.onSurfaceVariant,
          [rippleTheme.pressedColor]: THEME.color.onSurfaceVariant,
        },
      },
      true: {
        fontVariationSettings: fontVariationSettings({ GRAD: 150 }),
        color: THEME.color.primary,
        vars: {
          [rippleTheme.hoverColor]: THEME.color.primary,
          [rippleTheme.pressedColor]: THEME.color.primary,
        },
      },
    },
  },
});
