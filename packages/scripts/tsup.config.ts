import { defineConfig } from "tsup";

export default defineConfig({
  platform: "node",
  target: "esnext",
  entry: ["./src/index.ts"],
  clean: true,
  format: ["cjs", "esm"],
  dts: true,
  minify: "terser",
});
