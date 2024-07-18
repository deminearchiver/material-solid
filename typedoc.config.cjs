// {
//   "$schema": "https://typedoc.org/schema.json",
//   "plugin": [
//     "typedoc-material-theme"
//   ],
//   "entryPoints": [
//     "packages/*/"
//   ],
//   "githubPages": false,
//   "packageOptions": {
//     "includeVersion": true
//   },
//   "entryPointStrategy": "packages",
//   "out": "./docs"
// }
/** @type {import("typedoc").TypeDocOptions} */
module.exports = {
  plugin: [
    "typedoc-material-theme",
    "typedoc-plugin-mdn-links",
    "typedoc-plugin-extras",
    // "@8hobbies/typedoc-plugin-404",
  ],

  hostedBaseUrl: "https://material-solid.pages.dev/api",
  // useHostedBaseUrlForAbsoluteLinks: true,

  entryPoints: ["packages/*"],
  entryPointStrategy: "packages",
  excludeNotDocumented: false,
  out: "./docs",
  githubPages: false,
  packageOptions: {
    includeVersion: false,
  },
  customCss: "./typedoc/custom.css",

  // typedoc-material-theme
  themeColor: "#2c4f7c",

  // typedoc-plugin-extras
  customTitle: "Material Solid API Documentation",
  footerLastModified: true,
};
