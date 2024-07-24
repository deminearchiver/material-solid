import { cpSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const baseUrl = dirname(fileURLToPath(import.meta.url));

const base = resolve(baseUrl, "..");

cpSync(
  resolve(base, "docs"),
  resolve(base, "apps/docs/dist/api-docs"),
  {
    recursive: true,
  }
);
