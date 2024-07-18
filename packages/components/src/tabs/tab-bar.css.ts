import { THEME } from "@material-solid/vanilla-extract/contract";
import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { rippleTheme } from "../ripple/theme.css";

export const tabBarStyle = style({
  position: "relative",
  // display: "flex",
  // alignItems: "stretch",
  // justifyContent: "flex-start",

  display: "grid",
  // gridTemplateColumns: `repeat(${tabCount}, 1fr)`,
  gridAutoColumns: "1fr",
  gridAutoFlow: "column",
});

