import type { ConfigMixin } from "./mixin"
import type { PackageJson, PackageJsonExports } from "pkg-types";
import { join } from "path";
import { join as posixJoin } from "path/posix";
import { readFile, writeFile } from "fs/promises";

type Specifier = "." | `./${string}`;
type ConditionalImport = "import" | "require" | "types";

type ImportsMap = Record<Specifier, string>;


export type WithPackageJsonOptions =
  & {
    cwd?: string;
    base: "" | (string & {});
  }
  & (
    | {
      crawl: false;
      additionalEntries: Partial<ImportsMap>;
    }
    | {
      crawl?: undefined;
      glob: string;
      additionalEntries?: Partial<ImportsMap>;
    }
  );

export const withPackageJson = async (
  options: WithPackageJsonOptions
): Promise<ConfigMixin<"package-json">> => {
  const { fdir } = await import("fdir");

  const crawl = options.crawl ?? true;

  const cwd = options.cwd ?? process.cwd();
  const SPLIT_REGEX = /\/+/;
  const EXTENSION_REGEX = /\..+$/;

  const sort = <T extends string, U>(entries: Partial<Record<T, U>>) =>
    Object.keys(entries)
      .sort((a, b) => a.localeCompare(b))
      .reduce<typeof entries>(
        (sorted, key) => {
          sorted[key as T] = entries[key as T];
          return sorted;
        },
        {}
      ) as Record<T, U>;

  const getEntries = async (): Promise<ImportsMap> => {
    const entryPoints: Partial<ImportsMap> = options.additionalEntries ?? {};

    if(crawl) {
      const crawler = new fdir()
        .withPathSeparator("/")
        .withRelativePaths()
        // @ts-expect-error
        .glob(options.glob)
        .crawl(join(cwd, options.base ?? ""));

      const paths = await crawler.withPromise();
      for(const path of paths) {
        const specifier: Specifier = `./${path.split(SPLIT_REGEX)[0]}`;
        const base = path.replace(EXTENSION_REGEX, "");
        entryPoints[specifier] = base;
      }
    }
    return sort(entryPoints);
  }

  return {
    name: "package-json",
    apply: async overrideOptions => {
      const dev = overrideOptions.watch ?? false;

      overrideOptions.dts = true;

      const previous = typeof overrideOptions.onSuccess === "function" ? overrideOptions.onSuccess : undefined;
      overrideOptions.onSuccess = async () => {
        const result = await previous?.();

        console.log("[@package-json] Writing package.json");

        const entries = await getEntries();
        const exports: PackageJsonExports = {};
        for(const specifier in entries) {
          const path = entries[specifier as Specifier];

          const ts = `./${posixJoin(options.base, path)}.ts`;
          const js = `./dist/${path}.js`;
          const cjs = `./dist/${path}.cjs`;
          const mjs = `./dist/${path}.mjs`;
          const dts = `./dist/${path}.d.ts`;

          const formats = (overrideOptions.format ?? "cjs");
          const resolvedFormats = Array.isArray(formats) ? formats : [formats];

          const first = resolvedFormats.at(0) ?? "cjs";

          exports[specifier] = {
            import: first === "esm" ? js : mjs,
            require: first === "cjs" ? js : cjs,
            types: dts,
          };
        }

        await writePackageJson({ exports });

        console.log("[@package-json] Writting package.json!");

        return result;
      }
      return overrideOptions;
    },
  };
}




const CWD = process.cwd();
const DEFAULT_PKG_PATH = join(CWD, "package.json");

export const writePackageJson = async (
  fields: PackageJson | ((packageJson: PackageJson) => PackageJson),
  filename: string = DEFAULT_PKG_PATH,
  space?: string | number,
) => {

  const buffer = await readFile(filename, "utf-8")
  const pkg: PackageJson = JSON.parse(buffer)
  if(typeof fields === "function") {
    fields = fields(pkg);
  }
  for(const key in fields) {
    pkg[key] = fields[key];
  }

  if (space === undefined) {
    const firstIndent = buffer.indexOf("\n") + 1;
    for (let i = firstIndent; i < buffer.length; i++) {
      if (buffer[i] !== " " && buffer[i] !== "\t") {
        space = buffer.slice(firstIndent, i);
        break;
      }
    }
  }

  await writeFile(
    filename,
    `${JSON.stringify(pkg, null, space)}\n`,
    "utf-8"
  );
}
