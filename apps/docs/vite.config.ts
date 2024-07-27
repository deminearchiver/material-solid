import { defineConfig } from "vite";
import { resolve } from "path";

import solid from "vite-plugin-solid";
import { vanillaExtractPlugin as vanillaExtract } from "@vanilla-extract/vite-plugin";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import { remarkAlert } from "remark-github-blockquote-alert";
import remarkDirective from "remark-directive";

export default defineConfig({
  plugins: [
    mdx({
      jsxImportSource: "solid-jsx",
      remarkPlugins: [
        remarkGfm,
        remarkAlert,
        remarkDirective,
      ],
    }),
    vanillaExtract(),
    solid(),
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
