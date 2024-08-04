import { defineConfig } from "tsup";

export default defineConfig(options => ({
  entry: {
    "tsup/index": "tsup/index.ts"
  },
  clean: !options.watch,
  platform: "node",
  target: "esnext",
  format: ["esm", "cjs"],
  dts: true,
}));
