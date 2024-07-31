import { defineConfig } from "astro/config";

import turboConsole from "unplugin-turbo-console/astro";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import { vanillaExtractPlugin as vanillaExtract } from "@vanilla-extract/vite-plugin";

export default defineConfig({
	site: "https://material-solid.pages.dev",
	integrations: [
    turboConsole({
      specifiedEditor: "code",
    }),
    mdx(),
    sitemap(),
    solid(),
  ],
  vite: {
    plugins: [
      vanillaExtract(),
    ],
    css: {
      transformer: "lightningcss",
    },
    build: {
      cssMinify: "lightningcss",
    },
  },
});
