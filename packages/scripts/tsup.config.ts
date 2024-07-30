import { defineConfig, type Options } from "tsup";

export default defineConfig(
  async initialOptions => {
    const watching = initialOptions.watch ?? false;
    const options: Options = {
      ...initialOptions,
      entry: ["./src/**/*.{ts,tsx}"],
      platform: "browser",
      target: "esnext",
      clean: false,
      format: ["esm", "cjs"],
      splitting: false,
      bundle: false,
      dts: watching ? false : true,
      treeshake: {
        preset: "safest",
      },
    };
    return options;
  },
);
