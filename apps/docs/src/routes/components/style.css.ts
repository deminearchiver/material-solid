import { globalStyle, style } from "@vanilla-extract/css";
import { THEME } from "~/theme";

globalStyle(
  "body",
  {
    backgroundColor: THEME.color.surfaceContainer,
  }
)

export const containerStyle = style({
  width: "100%",
  height: ["100vh", "100dvh"],
  display: "grid",
  gridTemplateRows: "24px auto 24px",
  gridTemplateColumns: "360px auto 24px",

  transition: "grid-template-columns, grid-template-rows",
  transitionDuration: "600ms",
  transitionTimingFunction: THEME.easing.emphasized,

  "@media": {
    "only screen and (max-width: 839px)": {
      gridTemplateRows: "0 auto 0",
      gridTemplateColumns: "0 auto 0",

    },
  }
});

export const drawerStyle = style({
  gridColumn: 1,
});

export const panelStyle = style({
  gridRow: 2,
  gridColumn: 2,
  overflowY: "auto",

  backgroundColor: THEME.color.surface,
  borderRadius: THEME.shape.extraLarge,
})
