import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "tsup/index": "tsup/index.ts"
  },
  clean: false,
  platform: "node",
  target: "esnext",
  format: ["esm", "cjs"],
});
