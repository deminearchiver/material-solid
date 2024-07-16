import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { THEME } from "~/theme";

export const scrollTransition = createVar();

export const appBarStyle = recipe({
  base: {
    position: "sticky",
    top: 0,
    left: 0,
    right: 0,
    height: 64,

    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",

    backgroundColor: `color-mix(in srgb, ${THEME.color.surface}, ${THEME.color.surfaceContainer} ${scrollTransition})`
  },
});

export const leadingStyle = style({
  width: 64,
  height: "100%",

  display: "flex",
  placeItems: "center",
  placeContent: "center",
});

export const headlineStyle = style({
  fontFamily: THEME.text.title.large.family,
  fontSize: THEME.text.title.large.size,
  fontWeight: THEME.text.title.large.weight,
  lineHeight: THEME.text.title.large.lineHeight,
  letterSpacing: THEME.text.title.large.letterSpacing,
  color: THEME.color.onSurface,
});
