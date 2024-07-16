import { resolve } from "path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

import { vanillaExtractPlugin as vanillaExtract } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [
    vanillaExtract(),
    solid(),
  ],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
});
