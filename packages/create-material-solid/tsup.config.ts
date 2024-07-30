import { defineConfig } from "@material-solid/config/tsup";

export default defineConfig(options => ({
  ...options,
  entry: ["src/cli.ts"],
  clean: false,
  format: "cjs",
  minify: true,
})).build();
