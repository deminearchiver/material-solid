import { defineConfig } from "@solidjs/start/config";
import { vanillaExtractPlugin as vanillaExtract } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  server: {
    preset: "vercel",
  },
  vite: {
    plugins: [
      vanillaExtract(),
    ],
    css: {
      transformer: "lightningcss",
    },
    build: {
      cssMinify: "lightningcss",
    }
  },
});
