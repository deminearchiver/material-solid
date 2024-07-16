import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { THEME } from "~/theme";

export const scrolledUnderPercentage = createVar();

export const appBarStyle = recipe({
  base: {
    position: "sticky",
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    zIndex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: `color-mix(in srgb, ${THEME.color.surface}, ${THEME.color.surfaceContainer} ${scrolledUnderPercentage})`,

  },
});

export const actionsStyle = style({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,

  paddingInlineEnd: 16,
});
