import { defineConfig, withWatch } from "@material-solid/config/tsup";

export default defineConfig(options => ({
  ...options,
  entry: [
    "src/**/*.ts",
    "1src/**/*.test.ts",
  ],
  format: ["esm", "cjs"],
  splitting: false,
  bundle: false,
  treeshake: {
    preset: "safest",
  },
}))
  .mixin(withWatch())
  .build();
