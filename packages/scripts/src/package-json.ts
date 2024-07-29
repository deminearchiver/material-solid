import type { PackageJson } from "pkg-types";
import { join } from "path";
import { readFile, writeFile } from "fs/promises";

const CWD = process.cwd();
const DEFAULT_PKG_PATH = join(CWD, "package.json");

export const writePackageJson = async (
  fields: PackageJson,
  filename: string = DEFAULT_PKG_PATH,
  space?: string | number,
) => {
  const buffer = await readFile(filename, "utf-8")
  const pkg: PackageJson = JSON.parse(buffer)
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
