// import { defineConfig } from "tsup";
// import * as preset from "tsup-preset-solid";
// import { vanillaExtractPlugin as vanillaExtract } from "@vanilla-extract/esbuild-plugin";

// const presetOptions: preset.PresetOptions = {
//   entries: [
//     {
//       name: "theme",
//       entry: "./theme/index.ts",
//     },
//     {
//       name: "contract",
//       entry: "./contract/contract.css.ts",
//     },
//   ],
//   cjs: true,
//   drop_console: true,
//   esbuild_plugins: [
//     vanillaExtract({
//       identifiers: "short",
//     })
//   ],
// };

// export default defineConfig(
//   config => {
//     const watching = !!config.watch;
//     const parsedData = preset.parsePresetOptions(presetOptions, watching);
//     if (!watching) {
//       const package_fields = preset.generatePackageExports(parsedData);
//       preset.writePackageJson(package_fields);
//     }
//     return preset.generateTsupOptions(parsedData);
//   }
// );
