/*
Portions of this file are based on normalize.css:

normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

import { globalStyle } from "@vanilla-extract/css";

globalStyle(
  ":root",
  {
    WebkitTextSizeAdjust: "100%",
  },
);

// Render the `main` element consistently in IE.
globalStyle(
  "main",
  {
    display: "block",
  },
);

// 1. Correct the inheritance and scaling of font size in all browsers.
// 2. Correct the odd `em` font sizing in all browsers.
globalStyle(
  "pre, code, kbd, samp",
  {
    fontFamily: "monospace, monospace",
    fontSize: "1em",
  },
);

globalStyle(
  "hr",
  {
    boxSizing: "content-box",
    height: 0,
    overflow: "visible",
  },
);

// Remove the gray background on active links in IE 10.
globalStyle(
  "a",
  {
    backgroundColor: "transparent",
  },
);


/**
 * Prevent `sub` and `sup` elements from affecting the line height in
 * all browsers.
 */

globalStyle(
  "sub, sup",
  {
    fontSize: "75%",
    lineHeight: 0,
    position: "relative",
    verticalAlign: "baseline",
  },
);

globalStyle("sub", {
  bottom: "-0.25em",
});
globalStyle("sup", {
  top: "-0.5em",
});


globalStyle("img", {
  borderStyle: "none",
});
