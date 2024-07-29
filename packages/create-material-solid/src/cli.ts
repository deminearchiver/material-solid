#!/usr/bin/env node

import { Command } from "commander";
import { checkbox, select } from "@inquirer/prompts";

const cli = new Command();

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

cli
  .action(
    async () => {
      await select<PackageManager>({
        message: "Select your package manager",
        default: "npm",
        choices: [
          { name: "npm", value: "yarn" },
          { name: "Yarn", value: "yarn" },
          { name: "pnpm", value: "pnpm" },
          { name: "Bun", value: "bun" },
        ]
      });
    }
  )
  .parseAsync()
  .catch(async reason => {
    console.log(reason);
    process.exit(1);
  });
