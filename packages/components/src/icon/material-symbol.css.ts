import { createThemeContract, fallbackVar, fontFace } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

// @font-face {
//   font-family: "Material Symbols Rounded";
//   font-style: normal;
//   font-weight: 100 700;
//   font-display: block;
//   src: url("./material-symbols-rounded.woff2") format("woff2");
// }
// .material-symbols-rounded {
//   font-family: "Material Symbols Rounded";
//   font-weight: normal;
//   font-style: normal;
//   font-size: 24px;
//   line-height: 1;
//   letter-spacing: normal;
//   text-transform: none;
//   display: inline-block;
//   white-space: nowrap;
//   word-wrap: normal;
//   direction: ltr;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-rendering: optimizeLegibility;
//   font-feature-settings: "liga";
// }
/* material-symbols-rounded-latin-full-normal */
// @font-face {
//   font-family: 'Material Symbols Rounded Variable';
//   font-style: normal;
//   font-display: swap;
//   font-weight: 100 700;
//   src: url(./files/material-symbols-rounded-latin-full-normal.woff2) format('woff2-variations');
// }
// const materialSymbolsRounded = fontFace({
//   fontStyle: "normal",
//   fontDisplay: "swap",
//   fontWeight: "100 700",
//   src: `url("@fontsource-variable/material-symbols-rounded/files/material-symbols-rounded-latin-full-normal.woff2") format("woff2-variations")`
// });

const fontVariationSettings = (settings: Record<string, string | number>) => {
  return Object.entries(settings)
    .map(([axis, value]) => `"${axis}" ${value}`)
    .join(", ");
}

export const materialSymbolTheme = createThemeContract({
  size: "",
  fill: "",
  weight: "",
  opticalSize: "",
  grade: "",
});

export const materialSymbolStyle = recipe({
  base: {
    fontWeight: "normal",
    fontStyle: "normal",
    fontSize: fallbackVar(materialSymbolTheme.size, "24px"),
    lineHeight: 1,
    letterSpacing: "normal",
    textTransform: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
    wordWrap: "normal",
    direction: "ltr",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    textRendering: "optimizeLegibility",
    fontFeatureSettings: `"liga"`,

    fontVariationSettings: fontVariationSettings({
      FILL: fallbackVar(materialSymbolTheme.fill, "0"),
      wght: fallbackVar(materialSymbolTheme.weight, "400"),
      opsz: fallbackVar(materialSymbolTheme.opticalSize, "24"),
      GRAD: fallbackVar(materialSymbolTheme.grade, "0"),
    }),
  },
  variants: {
    variant: {
      rounded: {
        fontFamily: "Material Symbols Rounded Variable",
      },
      sharp: {
        fontFamily: "Material Symbols Sharp Variable",
      },
    },
  },
});
