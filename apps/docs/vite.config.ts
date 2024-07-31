import { defineConfig } from "vite";
import { resolve } from "path";
import solid from "vite-plugin-solid";
import { vanillaExtractPlugin as vanillaExtract } from "@vanilla-extract/vite-plugin";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import { remarkAlert } from "remark-github-blockquote-alert";
import remarkDirective from "remark-directive";
import type { UserConfig as VitestUserConfig } from "vitest";
import devtools from "solid-devtools/vite";

declare module "vite" {
  export interface UserConfig extends VitestUserConfig {}
}

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
        // devtools({
    //   autoname: true,
    //   locator: {
    //     targetIDE: "vscode",
    //     componentLocation: true,
    //     jsxLocation: true,
    //   },
    // }),
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
