// import { defineConfig } from "tsup";
// import * as preset from "tsup-preset-solid";
// import { vanillaExtractPlugin as vanillaExtract } from "@vanilla-extract/esbuild-plugin";

// import { readdir, readFile, access, constants as fsConstants } from "fs/promises";
// import { join, relative, resolve } from "path";



// export default defineConfig(
//   async config => {
//     const srcPath = resolve(__dirname, "src");
//     const dirs = await readdir(srcPath).catch(() => []);
//     const entries: preset.EntryOptions[] = (
//       await Promise.all(dirs
//         .map(dir => {
//           const indexPath = join(srcPath, dir, "index.ts");
//           return access(indexPath, fsConstants.R_OK)
//             .then<preset.EntryOptions>(
//               () => ({
//                 name: dir,
//                 entry: `./${relative(__dirname, indexPath)}`,
//               }),
//             )
//             .catch(() => undefined);
//         }),
//       )
//     ).filter(entry => !!entry);

//     const presetOptions: preset.PresetOptions = {
//       entries: [
//         ...entries,
//         {
//           name: "ripple/theme",
//           entry: "./src/ripple/theme.css.ts",
//         },
//         {
//           name: "icon-button/theme",
//           entry: "./src/icon-button/theme.css.ts",
//         },
//         {
//           name: "list/theme",
//           entry: "./src/list/theme.css.ts",
//         },
//       ],
//       cjs: true,
//       drop_console: true,
//       modify_esbuild_options: (options) => {
//         options.external ||= [];
//         return options;
//       },
//       esbuild_plugins: [],
//     };

//     const watching = !!config.watch;
//     const parsedData = preset.parsePresetOptions(presetOptions, watching);
//     if (!watching) {
//       const package_fields = preset.generatePackageExports(parsedData);
//       preset.writePackageJson(package_fields);
//     }
//     return preset.generateTsupOptions(parsedData);
//   }
// );
