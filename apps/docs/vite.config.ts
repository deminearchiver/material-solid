import { defineConfig } from "vite";

import solid from "vite-plugin-solid";
import { vanillaExtractPlugin as vanillaExtract } from "@vanilla-extract/vite-plugin";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    solid(),
    vanillaExtract(),
  ],
  css: {
    transformer: "lightningcss",
  },
  build: {
    cssMinify: "lightningcss"
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
})
