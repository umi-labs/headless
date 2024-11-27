import { PromptObject } from "prompts";
import { Config } from "./schema";
import chalk from "chalk";
import path from "path";
// Highlight function for prompts
const highlight = (text: string) => chalk.cyan(text);

const getCurrentDirectoryName = () => path.basename(process.cwd());

// Define the prompts
export const configPrompts = (
  existingConfig: Config,
  DEFAULT_CONFIG: Config,
): PromptObject<string>[] => [
  {
    type: "text",
    name: "name",
    message: `What is the name of your project? ${highlight("(Required)")}`,
    initial:
      existingConfig.name || getCurrentDirectoryName() || DEFAULT_CONFIG.name,
  },
  {
    type: "text",
    name: "components",
    message: `Configure the import alias for ${highlight("components")}:`,
    initial:
      existingConfig.aliases?.components || DEFAULT_CONFIG.aliases.components,
  },
  {
    type: "text",
    name: "utils",
    message: `Configure the import alias for ${highlight("utils")}:`,
    initial: existingConfig.aliases?.utils || DEFAULT_CONFIG.aliases.utils,
  },
  {
    type: "text",
    name: "hooks",
    message: `Configure the import alias for ${highlight("hooks")}:`,
    initial: existingConfig.aliases?.hooks || DEFAULT_CONFIG.aliases.hooks,
  },
  {
    type: "text",
    name: "api",
    message: `Configure the import alias for ${highlight("API")}:`,
    initial: existingConfig.aliases?.api || DEFAULT_CONFIG.aliases.api,
  },
  {
    type: "text",
    name: "ui",
    message: `Configure the import alias for ${highlight("UI")}:`,
    initial: existingConfig.aliases?.ui || DEFAULT_CONFIG.aliases.ui,
  },
];
