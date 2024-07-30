import { defineConfig } from "@material-solid/config/tsup";

export default defineConfig(options => ({
    ...options,
    entry: ["src/index.ts"],
    clean: false,
    format: ["esm", "cjs"],
    platform: "node",
})).build();

