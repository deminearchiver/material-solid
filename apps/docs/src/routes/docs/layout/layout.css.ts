import { style } from "@vanilla-extract/css";
import { THEME } from "~/theme";

export const layoutStyle = style({
  height: ["100vh", "100dvh"],

  display: "grid",
  gridTemplateColumns: "360px 1fr",

  backgroundColor: THEME.color.surfaceContainer,
});

export const contentStyle = style({
  gridColumn: 2,

  marginBlock: 24,
  marginInlineEnd: 24,


  display: "flex",
  alignItems: "stretch",
  justifyContent: "stretch",
  gap: 24,
});

export const paneStyle = style({
  width: "100%",

  borderRadius: THEME.shape.extraLarge,
  backgroundColor: THEME.color.surface,
});

export const tableOfContentsStyle = style({
  width: 250,
  borderRadius: THEME.shape.extraLarge,
  backgroundColor: THEME.color.surface,
});
