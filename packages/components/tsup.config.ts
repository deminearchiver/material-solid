import { defineConfig, type Options } from "tsup";
import { solidPlugin } from "esbuild-plugin-solid";
import { fdir } from "fdir";
import { join } from "path";
import type { PackageJsonExports } from "pkg-types";
import { runCommand, writePackageJson } from "@material-solid/scripts";

const entryPointsCrawler = new fdir()
  .withRelativePaths()
  .withPathSeparator("/")
  .glob("*/index.ts")
  .crawl(join(__dirname, "src"));

const getEntryPoints = async () => {
  const SPLIT_REGEX = /\/+/;
  const EXTENSION_REGEX = /\..+$/;

  const paths = await entryPointsCrawler.withPromise();
  const entryPoints: Record<string, string> = {
    "./ripple/theme": "./dist/ripple/theme.css",
    "./icon-button/theme": "./dist/icon-button/theme.css",
    "./list/theme": "./dist/list/theme.css",
  };
  for(const path of paths) {
    const specifier = `./${path.split(SPLIT_REGEX)[0]}`;
    const base = `./dist/${path.replace(EXTENSION_REGEX, "")}`;

    entryPoints[specifier] = base;
  }
  return Object.keys(entryPoints)
    .sort((a, b) => a.localeCompare(b))
    .reduce<typeof entryPoints>(
      (sorted, key) => {
        sorted[key] = entryPoints[key];
        return sorted;
      },
      {}
    );
}

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
      esbuildPlugins: [
        // @ts-expect-error
        solidPlugin({ solid: { generate: "dom" } }),
      ],
      onSuccess: async () => {
        const entryPoints = await getEntryPoints();

        const exports: PackageJsonExports = {};
        for(const specifier in entryPoints) {
          const path = entryPoints[specifier];
          exports[specifier] = {
            import: `${path}.js`,
            require: `${path}.cjs`,
            types: `${path}.d.ts`,
          };
        }

        await writePackageJson({
          exports,
        });

        if(watching) return runCommand("tsc");
      },
    };
    return options;
  },
);
