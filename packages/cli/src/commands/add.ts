import fs from "fs-extra";
import path from "path";
import simpleGit from "simple-git";
import { z } from "zod";
import { componentNameSchema, Config } from "../utils/schema.js";
import { addImportBelowObjects } from "../utils/file-and-directory-management/addImportsBelowObjects.js";
import { cleanComponentName } from "../utils/nameCleaner.js";
import { intro, log, outro, select, tasks, text } from "@clack/prompts";
import { inverse } from "kleur/colors";
import { cleanUp } from "../utils/file-and-directory-management/cleanup";
import { checkMultiPackageStatus } from "../utils/package";
import { execa } from "execa";

// TODO: Add ability to pull additional import requirements from config file attached to component
// TODO: Needs to be upgraded to the clack prompt system

// Import fs-extra functions like this or dist will fail
const { readJSON, pathExists, ensureDir, outputFile, readFile } = fs;

// Initialise simple-git
const git = simpleGit();

// Function to add a component
export const add = async (options: { name: string }) => {
  intro(inverse(" adding a component "));

  const sanity = path.join(process.cwd(), "sanity", "schemas", "objects");

  // Clone the templates repository into a temporary directory
  const componentsRepo = "https://github.com/umi-labs/umi"; // Correct repo URL
  const compDir = path.join(process.cwd(), "temp-components");

  // Constants
  let componentsDir: string,
    components: string[],
    selectedComponent: string,
    selectedComponentDir: string,
    category: string,
    additionalPackages: string[],
    componentDir: string,
    config: Config;

  let componentName = cleanComponentName(options.name);

  // Clean up old temporary directory if exists
  await cleanUp(compDir);

  await tasks([
    {
      title: "Cloning components",
      task: async () => {
        // Clone the components repository
        log.info("Getting components...");
        await git.clone(componentsRepo, compDir);
        log.info(`${compDir}`);
        return "Components repository cloned.";
      },
    },
    {
      title: "Choose your component",
      task: async () => {
        // List available templates in the cloned directory
        componentsDir = path.join(compDir, "packages", "ui", "output");
        components = await fs.readdir(componentsDir);

        if (components.length === 0) {
          log.warn("No templates available in the cloned directory.");
          await cleanUp(compDir);
          process.exit(0);
        }

        // Prompt user to select a template
        // @ts-expect-error type error
        selectedComponent = await select({
          message: "Select a component to add:",
          options: components.map((component) => ({
            title: component,
            value: component,
          })),
        });

        return `Selected component: ${selectedComponent}`;
      },
    },
    {
      title: "Preparing component",
      task: async () => {
        // Path to the selected component directory
        selectedComponentDir = path.join(componentsDir, selectedComponent);

        // Read the config.json from the selected component directory
        const componentConfigPath = path.join(
          selectedComponentDir,
          "config.json",
        );

        if (!(await pathExists(componentConfigPath))) {
          log.warn(`No config.json found in ${selectedComponent}`);
        }

        const componentConfig = await readJSON(componentConfigPath);
        category = componentConfig.category || "blocks"; // Default to "blocks" if category is not defined
        additionalPackages = componentConfig.additionalPackages || [];

        return `Component category: ${category}`;
      },
    },
    {
      title: "Name your component",
      task: async () => {
        // If no component name is provided, prompt for one
        if (!componentName) {
          // Prompt for component name
          const response = await text({
            message: "What is the name of the component?",
            validate(value) {
              if (value.length < 0) return "Component name is required"; // Validation for empty input
            },
          });

          log.step("Validating component name...");

          // Check if the prompt response contains the expected componentName
          if (response) {
            componentName = cleanComponentName(response as string); // Make sure you access the correct key
          } else {
            log.warn("No component name provided.");
          }
        }

        // Validate the component name using Zod
        try {
          componentNameSchema.parse(componentName);
        } catch (error) {
          log.warn((error as z.ZodError).errors[0].message);
        }

        return "Component name validated.";
      },
    },
    {
      title: "Loading configuration",
      task: async () => {
        // Load existing configuration
        let existingConfig: Config | {} = {};
        const configPath = path.resolve(process.cwd(), "umirc.json");

        if (await pathExists(configPath)) {
          existingConfig = await readJSON(configPath);
        }

        // Validate config
        config = existingConfig as Config;

        // Check if aliases and components are defined
        if (!config.aliases || !config.aliases.components) {
          log.warn("Component alias not defined in configuration.");
        }

        return "Configuration loaded";
      },
    },
    {
      title: `Adding component: ${componentName}`,
      task: async () => {
        // Path to the new component directory based on config and category
        componentDir = path.join(
          process.cwd(),
          "app",
          `_${config.aliases.components}`,
          `shared`,
          `${category}`, // Use the category from the component's config.json
        );

        // Ensure the directory exists
        await ensureDir(componentDir);

        const componentSourceFilePath = path.join(
          selectedComponentDir,
          `${selectedComponent}.tsx`,
        );

        // Ensure the component file exists
        if (!(await pathExists(componentSourceFilePath))) {
          log.warn(`Component file "${selectedComponent}.tsx" not found.`);
        }

        // Destination file path (e.g., _components/shared/heros/Hero_1.tsx)
        const destinationFilePath = path.join(
          componentDir,
          `${componentName}.tsx`,
        );

        let fileContent = await readFile(componentSourceFilePath, "utf8");

        await outputFile(destinationFilePath, fileContent);

        return `Component "${componentName}" added successfully!`;
      },
    },
    {
      title: "Inserting Schema",
      task: async () => {
        const schemaSourceFilePath = path.join(
          selectedComponentDir,
          `schema.ts`,
        );

        const schemaDestinationFilePath = path.join(
          sanity,
          `${componentName}.js`,
        );

        let schemaFileContent = await readFile(schemaSourceFilePath, "utf8");

        // Ensure the component file exists
        if (!(await pathExists(schemaSourceFilePath))) {
          log.warn(`We cannot find the schema file for this component.`);
        }

        await outputFile(schemaDestinationFilePath, schemaFileContent);

        return `Component schema file  added successfully!`;
      },
    },
    {
      title: "Adding Imports into file system",
      task: async () => {
        await addImportBelowObjects({
          componentName: componentName!,
        });

        return "Imports added";
      },
    },
    {
      title: "Installing Additional Packages",
      task: async () => {
        let packagesToInstall =
          await checkMultiPackageStatus(additionalPackages);

        if (additionalPackages.length < 0) {
          log.info("No additional packages found.");
        } else if (packagesToInstall.length > 0) {
          log.info(`Installing ${packagesToInstall.join(", ")}...`);
          await execa("npm", ["install", ...packagesToInstall], {
            stdio: "inherit",
          });
          log.success(
            `${packagesToInstall.join(", ")} installed successfully.`,
          );
        } else {
          log.success(
            `${additionalPackages.join(", ")} are already installed.`,
          );
        }

        return "Package Installation Complete";
      },
    },
    {
      title: "Cleaning Up",
      task: async () => {
        await cleanUp(compDir);

        return "Clean Up Complete";
      },
    },
  ]);

  outro(inverse(" component ready to use "));
};
