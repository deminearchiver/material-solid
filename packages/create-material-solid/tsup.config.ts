import { defineConfig } from "@material-solid/config/tsup";

export default defineConfig(options => ({
  ...options,
  entry: ["src/cli.ts"],
  clean: true,
  format: "cjs",
  minify: true,
})).build();
