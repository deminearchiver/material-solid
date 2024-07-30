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
      additionalEntries: {
        "./ripple/theme": "ripple/theme.css",
        "./icon-button/theme": "icon-button/theme.css",
        "./list/theme": "list/theme.css",
      },
    })
  )
  .build();
