import { defineConfig, withWatch } from "@material-solid/config/tsup";

export default defineConfig(options => ({
  ...options,
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  platform: "node",
}))
  .mixin(withWatch())
  .build();

