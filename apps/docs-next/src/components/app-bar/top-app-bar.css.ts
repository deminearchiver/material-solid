import { iconButtonTheme } from "@material-solid/components/icon-button/theme";
import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { THEME } from "~/theme";

export const dynamicContainerStyle = recipe({
  base: {
    position: "sticky",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,

    isolation: "isolate",
  },
  variants: {
    variant: {
      small: {
        height: 64,
      },
      medium: {
        height: 112,
      },
      large: {
        height: 152,
      },
    },
  },
  defaultVariants: {
    variant: "small",
  }
});

export const staticContainerStyle = recipe({
  base: {
    height: 64,

    display: "flex",
    alignItems: "center",
    gap: 8,
    paddingInline: 8,

    backgroundColor: `color-mix(in srgb, ${THEME.color.surface}, ${THEME.color.surfaceContainer} 0%)`
  },
});

export const leadingStyle = style({
  display: "contents",
  color: THEME.color.onSurface,
  vars: {
    [iconButtonTheme.unselectedColor]: THEME.color.onSurface,
  },
});

export const staticHeadlineStyle = recipe({
  base: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",

    ...THEME.text.title.large,
    color: THEME.color.onSurface,
  },
  variants: {
    centered: {
      false: {
        justifyContent: "flex-start",
      },
      true: {
        justifyContent: "center",
      },
    },
  },
  defaultVariants: {
    centered: false,
  },
});

export const actionsStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,

  vars: {
    [iconButtonTheme.unselectedColor]: THEME.color.onSurfaceVariant,
  },
});
