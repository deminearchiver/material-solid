import { defineConfig } from "tsup";

export default defineConfig(
  async initialOptions => ({
    ...initialOptions,
    entry: ["src/**/*.ts"],
    clean: false,
    dts: initialOptions.watch ? false : true,
    onSuccess: "tsc",
    splitting: false,
    bundle: false,
    format: (initialOptions.watch ?? false) ? "esm" : ["cjs", "esm"],
    treeshake: {
      preset: "safest",
    },
  })
);
