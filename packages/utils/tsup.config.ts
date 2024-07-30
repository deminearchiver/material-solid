import { defineConfig, withPackageJson, withSolid, withWatch } from "@material-solid/config/tsup";

export default defineConfig(options => ({
  ...options,
  entry: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.test.{ts,tsx}",
  ],
  format: ["esm", "cjs"],
  splitting: false,
  bundle: false,
}))
  .mixin(withWatch())
  .mixin(withSolid())
  .mixin(
    withPackageJson({
      base: "src",
      glob: "*/index.ts",
    })
  )
  .build();
