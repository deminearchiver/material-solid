import { defineConfig } from "tsup";

export default defineConfig(
  initialOptions => ({
    ...initialOptions,
    entry: [
      "src/index.tsx",
      "src/**/*.css"
    ],
    clean: true,
    format: "cjs",
    noExternal: [
      "@material/material-color-utilities"
    ],
    dts: true,
    minify: true,
    treeshake: {
      preset: "safest",
    },
  }),
);
