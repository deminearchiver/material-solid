import type { ConfigMixin } from "./mixin"
import type { PackageJson, PackageJsonExports } from "pkg-types";
import { join } from "path";
import { join as posixJoin } from "path/posix";
import { readFile, writeFile } from "fs/promises";

type Specifier = `./${string}`;
type ConditionalImport = "import" | "require" | "types";

export type WithPackageJsonOptions = {
  cwd?: string;
  base: "" | (string & {});
  glob: string;
  additionalEntries?: Record<Specifier, string>;
  /**
   * Not implemented
   */
  output?: Partial<Record<ConditionalImport, string>>;
}

export const withPackageJson = async (
  options: WithPackageJsonOptions
): Promise<ConfigMixin<"package-json">> => {
  const { fdir } = await import("fdir");

  const cwd = options.cwd ?? process.cwd();
  const crawler = new fdir()
    .withPathSeparator("/")
    .withRelativePaths()
    .glob(options.glob)
    .crawl(join(cwd, options.base ?? ""));

  const SPLIT_REGEX = /\/+/;
  const EXTENSION_REGEX = /\..+$/;


  const getEntries = async () => {
    const paths = await crawler.withPromise();
    const entryPoints: Record<string, string> = options.additionalEntries ?? {};
    for(const path of paths) {
      const specifier = `./${path.split(SPLIT_REGEX)[0]}`;
      const base = path.replace(EXTENSION_REGEX, "");
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
      ) as Record<Specifier, string>;
  }

  return {
    name: "package-json",
    apply: async overrideOptions => {
      overrideOptions.onSuccess = async () => {
        const entries = await getEntries();
        const exports: PackageJsonExports = {};
        for(const specifier in entries) {
          const path = entries[specifier as Specifier];
          exports[specifier] = {
            import: `./dist/${path}.js`,
            require: `./dist/${path}.cjs`,
            types: `./${posixJoin(options.base, path)}.ts`,
          };
        }

        await writePackageJson({ exports });
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
