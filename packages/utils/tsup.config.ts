import { defineConfig, withPackageJson, withSolid } from "@material-solid/config/tsup";

export default defineConfig(options => ({
  ...options,
  entry: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.test.{ts,tsx}",
  ],
  clean: false,
  format: ["esm", "cjs"],
  splitting: false,
  bundle: false,
}))
  .mixin(withSolid())
  .mixin(
    withPackageJson({
      base: "src",
      glob: "*/index.ts",
    })
  )
  .build();
