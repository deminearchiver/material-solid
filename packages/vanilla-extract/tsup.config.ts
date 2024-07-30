import { defineConfig } from "@material-solid/config/tsup";

export default defineConfig(options => ({
  ...options,
  entry: [
    "src/**/*.ts",
    "1src/**/*.test.ts",
  ],
  format: ["esm", "cjs"],
  clean: false,
  splitting: false,
  bundle: false,
  treeshake: {
    preset: "safest",
  },
})).build();
