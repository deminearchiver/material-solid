import { THEME } from "@material-solid/vanilla-extract/contract";
import { rippleTheme } from "../ripple/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const tabStyle = recipe({
  base: {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",

    position: "relative",
    height: 48,
    // flexGrow: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    cursor: "pointer",

    ...THEME.text.title.medium,
  },
  variants: {
    active: {
      false: {
        color: THEME.color.onSurfaceVariant,

        vars: {
          [rippleTheme.hoverColor]: THEME.color.onSurfaceVariant,
          [rippleTheme.pressedColor]: THEME.color.onSurfaceVariant,
        },
      },
      true: {
        color: THEME.color.primary,
        vars: {
          [rippleTheme.hoverColor]: THEME.color.primary,
          [rippleTheme.pressedColor]: THEME.color.primary,
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const tabContentStyle = recipe({
  base: {
    position: "relative",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    variant: {
      primary: {
        flexDirection: "column",
      },
      secondary: {
        width: "100%",
        flexDirection: "row",
        gap: 8,
      },
    },
  },
});
