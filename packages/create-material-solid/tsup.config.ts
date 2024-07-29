import { defineConfig } from "tsup";

export default defineConfig(
  initialOptions => ({
    ...initialOptions,
    entry: ["src/cli.ts"],
    format: "cjs",
    clean: true,
    minify: true,
  })
);
