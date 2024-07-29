import { defineConfig } from "tsup";

export default defineConfig(
  async initialOptions => ({
    ...initialOptions,
    entry: ["./src/index.ts"],
    clean: false,
    format: ["cjs", "esm"],
    dts: initialOptions.watch ? false : true,
    onSuccess: initialOptions.watch ? "tsc" : undefined,
  }),
);
