import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { THEME } from "~/theme";

export const heroStyle = style({
  maxWidth: 880,
  minHeight: 460,
  height: ["70vh", "70dvh"],
  maxHeight: 960,

  marginBlock: 0,
  marginInline: "auto",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",

  paddingInline: 24,
  paddingBlock: 32,

  "@media": {
    "only screen and (min-width: 840px)": {
      flexDirection: "row",
      alignItems: "flex-start",
    },
  }
});

export const heroContentStyle = style({
  maxWidth: 520,
  height: "100%",
  display: "flex",
  alignItems: "center",
  marginBlockEnd: 80,
  textAlign: "center",

  "@media": {
    "only screen and (min-width: 840px)": {
      textAlign: "inherit",
    },
  },
});

export const heroHeadlineStyle = style({
  ...THEME.text.display.medium,
  color: THEME.color.onSurface,
});

export const heroSubtitleStyle = style({
  marginBlockStart: 4,
  marginBlockEnd: "1em",

  ...THEME.text.body.large,
  color: THEME.color.onSurfaceVariant,
});

export const heroActionsStyle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: 8,
});
