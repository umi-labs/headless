// External
import fs from "fs-extra";
import path from "path";
import { execa } from "execa";

// Internal
import { type Config, configSchema } from "../utils/schema";
import { UTILS } from "../utils/templates";
import { checkMultiPackageStatus } from "../utils/package";
import { cancel, group, intro, log, outro, tasks, text } from "@clack/prompts";
import chalk from "chalk";
import { inverse } from "kleur/colors";

const { readJSON, writeJSON, pathExists, writeFile, ensureDir } = fs;

const DEFAULT_CONFIG: Config = {
  name: "my-project",
  aliases: {
    components: "components",
    utils: "utils",
    hooks: "hooks",
    api: "api",
    ui: "ui",
  },
};

export async function init(options: {
  yes: boolean;
  name: string;
}): Promise<void> {
  intro(inverse(" initialising project "));

  // Paths
  const packageJsonPath = path.resolve(process.cwd(), "package.json");
  const umircJsonPath = path.resolve(process.cwd(), "umirc.json");
  const getCurrentDirectoryName = () => path.basename(process.cwd());

  // Constants
  let existingConfig: Config = DEFAULT_CONFIG;
  let response: Partial<Config["aliases"] & { name: string }>;
  let mergedConfig: Config;
  const highlight = (text: string) => chalk.cyan(text);

  await tasks([
    {
      title: "Reading package.json",
      task: async () => {
        try {
          const packageJson = await readJSON(packageJsonPath);
          DEFAULT_CONFIG.name = packageJson.name || DEFAULT_CONFIG.name;
        } catch (error) {
          log.warn("Could not read package.json. Using default values.");
        }
      },
    },
    {
      title: "Reading umirc.json",
      task: async () => {
        if (await pathExists(umircJsonPath)) {
          try {
            existingConfig = await readJSON(umircJsonPath);
            // Stop the spinner and log the existing configuration
            log.info(`Existing umirc.json found`);
          } catch (error) {
            log.warn(
              "Could not read umirc.json. Proceeding with default values.",
            );
          }
        }
      },
    },
    {
      title: "Configuration options",
      task: async () => {
        // Prompt user for input
        if (options.yes && !options.name) {
          response = {
            name: (existingConfig as Config).name || DEFAULT_CONFIG.name,
            components:
              (existingConfig as Config).aliases?.components ||
              DEFAULT_CONFIG.aliases.components,
            utils:
              (existingConfig as Config).aliases?.utils ||
              DEFAULT_CONFIG.aliases.utils,
            hooks:
              (existingConfig as Config).aliases?.hooks ||
              DEFAULT_CONFIG.aliases.hooks,
            api:
              (existingConfig as Config).aliases?.api ||
              DEFAULT_CONFIG.aliases.api,
            ui:
              (existingConfig as Config).aliases?.ui ||
              DEFAULT_CONFIG.aliases.ui,
          };
        } else if (options.name && options.yes) {
          response = {
            name: options.name,
            components:
              (existingConfig as Config).aliases?.components ||
              DEFAULT_CONFIG.aliases.components,
            utils:
              (existingConfig as Config).aliases?.utils ||
              DEFAULT_CONFIG.aliases.utils,
            hooks:
              (existingConfig as Config).aliases?.hooks ||
              DEFAULT_CONFIG.aliases.hooks,
            api:
              (existingConfig as Config).aliases?.api ||
              DEFAULT_CONFIG.aliases.api,
            ui:
              (existingConfig as Config).aliases?.ui ||
              DEFAULT_CONFIG.aliases.ui,
          };
        } else {
          response = await group(
            {
              name: async () =>
                await text({
                  message: `What is the name of your project? ${highlight("(Required)")}`,
                  initialValue:
                    existingConfig.name ||
                    getCurrentDirectoryName() ||
                    DEFAULT_CONFIG.name,
                }),
              components: () =>
                text({
                  message: `Configure the import alias for ${highlight("components")}:`,
                  initialValue:
                    existingConfig.aliases?.components ||
                    DEFAULT_CONFIG.aliases.components,
                }),
              utils: () =>
                text({
                  message: `Configure the import alias for ${highlight("utils")}:`,
                  initialValue:
                    existingConfig.aliases?.utils ||
                    DEFAULT_CONFIG.aliases.utils,
                }),
              hooks: () =>
                text({
                  message: `Configure the import alias for ${highlight("hooks")}:`,
                  initialValue:
                    existingConfig.aliases?.hooks ||
                    DEFAULT_CONFIG.aliases.hooks,
                }),
              api: () =>
                text({
                  message: `Configure the import alias for ${highlight("API")}:`,
                  initialValue:
                    existingConfig.aliases?.api || DEFAULT_CONFIG.aliases.api,
                }),
              ui: () =>
                text({
                  message: `Configure the import alias for ${highlight("UI")}:`,
                  initialValue:
                    existingConfig.aliases?.ui || DEFAULT_CONFIG.aliases.ui,
                }),
            },
            {
              onCancel: () => {
                cancel("Configuration cancelled.");
                process.exit(0);
              },
            },
          );
        }

        mergedConfig = {
          name: response.name || (existingConfig as Config).name || "",
          aliases: {
            components:
              response.components ||
              (existingConfig as Config).aliases?.components ||
              "",
            utils:
              response.utils || (existingConfig as Config).aliases?.utils || "",
            hooks:
              response.hooks || (existingConfig as Config).aliases?.hooks || "",
            api: response.api || (existingConfig as Config).aliases?.api || "",
            ui: response.ui || (existingConfig as Config).aliases?.ui || "",
          },
        };
      },
    },
    {
      title: "Validating and saving configuration",
      task: async () => {
        const validatedData = configSchema.parse(mergedConfig);
        log.success("Project initialised successfully.");

        // Write config to a file (e.g., .umirc.json) using fs-extra
        log.info("Saving configuration...");
        await writeJSON(umircJsonPath, validatedData, { spaces: 2 });
        log.success("Configuration saved to umirc.json");
      },
    },
    {
      title: "Creating utils directory",
      task: async () => {
        // Construct the utils directory path dynamically based on the alias value
        const utilsAlias = mergedConfig.aliases.utils;
        const utilsDir = path.join(process.cwd(), "app", `_${utilsAlias}`);
        await ensureDir(utilsDir);

        const utilsFilePath = path.join(utilsDir, "index.ts");
        await writeFile(utilsFilePath, UTILS);

        log.success(
          `Utils file created successfully at app/_${utilsAlias}/index.ts.`,
        );
      },
    },
    {
      title: "Installing dependencies",
      task: async () => {
        const packageRequirements = ["clsx", "tailwind-merge"];
        const packagesToInstall =
          await checkMultiPackageStatus(packageRequirements);

        if (packagesToInstall.length > 0) {
          log.info(`Installing ${packagesToInstall.join(", ")}...`);
          await execa("npm", ["install", ...packagesToInstall], {
            stdio: "inherit",
          });
          log.success(
            `${packagesToInstall.join(", ")} installed successfully.`,
          );
        } else {
          log.success(
            `${packageRequirements.join(", ")} are already installed.`,
          );
        }
      },
    },
  ]);

  outro("Project configured successfully.");
}
