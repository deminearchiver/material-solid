import { globalStyle } from "@vanilla-extract/css";
import { THEME } from "~/theme";

globalStyle(
  "*, *::before, *::after",
  {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
  },
);

globalStyle(
  "body",
  {
    colorScheme: "light dark",
    minHeight: ["100vh", "100dvh"],

    backgroundColor: THEME.color.surface,

    fontFamily: THEME.text.body.large.family,
    fontSize: THEME.text.body.large.size,
    fontWeight: THEME.text.body.large.weight,
    lineHeight: THEME.text.body.large.lineHeight,
    letterSpacing: THEME.text.body.large.letterSpacing,
    color: THEME.color.onSurface,
  },
);

globalStyle(
  "h1, h2, h3, h4, h5, h6",
  {
    textWrap: "balance",
  },
);
