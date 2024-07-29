import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      "index": "./src/index.ts",
      "contract": "./src/contract/index.ts"
    },
    external: [/^\.\/[\w-_]+\.css$/],
    clean: true,
    dts: true,
    format: ["cjs", "esm"],
  },
  {
    entry: ["./src/**/*.css.ts"],
    clean: true,
    dts: true,
    format: ["cjs", "esm"],
  },
]);
