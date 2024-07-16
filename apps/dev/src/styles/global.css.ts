import { globalFontFace, globalStyle } from "@vanilla-extract/css";
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


// body {
//   font-family: Gordita, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
// }

// a {
//   margin-right: 1rem;
// }

// main {
//   text-align: center;
//   padding: 1em;
//   margin: 0 auto;
// }

// h1 {
//   color: #335d92;
//   text-transform: uppercase;
//   font-size: 4rem;
//   font-weight: 100;
//   line-height: 1.1;
//   margin: 4rem auto;
//   max-width: 14rem;
// }

// p {
//   max-width: 14rem;
//   margin: 2rem auto;
//   line-height: 1.35;
// }

// @media (min-width: 480px) {
//   h1 {
//     max-width: none;
//   }

//   p {
//     max-width: none;
//   }
// }
