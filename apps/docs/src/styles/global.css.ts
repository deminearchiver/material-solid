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
  "html",
  {
    WebkitTextSizeAdjust: "none",
    MozTextSizeAdjust: "none",
    textSizeAdjust: "none",
  },
);


globalStyle(
  "body",
  {
    colorScheme: "light dark",
    minHeight: ["100vh", "100dvh"],

    backgroundColor: THEME.color.surface,

    WebkitFontSmoothing: "antialised",
    ...THEME.text.body.large,
    color: THEME.color.onSurface,
  },
);

globalStyle(
  "h1, h2, h3, h4", // TODO: decide whether to include h5 and h6. ref: https://piccalil.li/blog/a-more-modern-css-reset/
  {
    textWrap: "balance",
  },
);

globalStyle(
  `ul[role="list"], ol[role="list"]`,
  {
    listStyle: "none",
  },
);

globalStyle(
  "img, picture, video, canvas, svg",
  {
    maxWidth: "100%",
    display: "block",
  },
);

// https://www.joshwcomeau.com/css/custom-css-reset/
globalStyle(
  "#root", // TODO: add something like #__next
  {
    isolation: "isolate",
  },
);
