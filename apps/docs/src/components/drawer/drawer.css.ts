import { style } from "@vanilla-extract/css";
import { THEME } from "~/theme";

export const containerStyle = style({
  width: "100%",
  height: "100%",
  isolation: "isolate",

  display: "flex",
  flexDirection: "column",
  padding: 12,

  backgroundColor: THEME.color.surfaceContainer,
});
