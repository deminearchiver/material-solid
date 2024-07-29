import { defineConfig } from "tsup";

export default defineConfig(
  initialOptions => ({
    ...initialOptions,

    entry: [
      "src/index.tsx",
      "src/**/*.css"
    ],
    format: "cjs",
    noExternal: [
      "@material/material-color-utilities"
    ],
    clean: true,
    dts: true,
    minify: true,
    treeshake: {
      preset: "safest",
    },
  }),
);
