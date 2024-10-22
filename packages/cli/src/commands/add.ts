import fs from "fs-extra";
import path from "path";
import ora from "ora";
import simpleGit from "simple-git";
import prompts from "prompts";
import { z } from "zod";
import { Config, componentNameSchema } from "../utils/schema.js";
import { modifyAndCopyFile } from "../utils/file-management/modify-and-copy";

// Import fs-extra functions like this or dist will fail
const { readJSON, pathExists, ensureDir, remove, outputFile, readFile } = fs;

// Initialise simple-git
const git = simpleGit();

// Function to add a component
export const add = async (componentName?: string) => {
  const spinner = ora();

  const sanity = path.join(process.cwd(), "sanity", "schemas", "objects");

  // Clone the templates repository into a temporary directory
  const componentsRepo = "https://github.com/umi-labs/umi"; // Correct repo URL
  const compDir = path.join(process.cwd(), "temp-components");

  // Clean up old temporary directory if exists
  if (await pathExists(compDir)) {
    spinner.start("Cleaning up old temp directory...");
    await remove(compDir);
    spinner.succeed("Old temp directory removed.");
  }

  // Clone the components repository
  spinner.start("Getting components...");
  await git.clone(componentsRepo, compDir);
  spinner.succeed("Components repository cloned.");

  // List available templates in the cloned directory
  const componentsDir = path.join(compDir, "packages", "ui", "output");
  const components = await fs.readdir(componentsDir);

  if (components.length === 0) {
    spinner.fail("No templates available in the cloned directory.");
    return;
  }

  // Prompt user to select a template
  const { selectedComponent } = await prompts({
    type: "select",
    name: "selectedComponent",
    message: "Select a component to add:",
    choices: components.map((component) => ({
      title: component,
      value: component,
    })),
  });

  console.log(`Selected component: ${selectedComponent}`);

  // Path to the selected component directory
  const selectedComponentDir = path.join(componentsDir, selectedComponent);

  // Read the config.json from the selected component directory
  const componentConfigPath = path.join(selectedComponentDir, "config.json");

  if (!(await pathExists(componentConfigPath))) {
    spinner.fail(`No config.json found in ${selectedComponent}`);
    return;
  }

  const componentConfig = await readJSON(componentConfigPath);
  const category = componentConfig.category || "blocks"; // Default to "blocks" if category is not defined

  console.log(`Component category: ${category}`);

  // If no component name is provided, prompt for one
  if (!componentName) {
    // Prompt for component name
    const response = await prompts({
      type: "text",
      name: "componentName", // This key corresponds to the value you'll access
      message: "What is the name of the component?",
      validate: (value) =>
        value.length > 0 ? true : "Component name is required", // Validation for empty input
    });

    spinner.start("Validating component name...");

    // Check if the prompt response contains the expected componentName
    if (response.componentName) {
      componentName = response.componentName as string; // Make sure you access the correct key
    } else {
      spinner.fail("No component name provided.");
      return;
    }
  }

  // Validate the component name using Zod
  try {
    componentNameSchema.parse(componentName);
  } catch (error) {
    spinner.fail((error as z.ZodError).errors[0].message);
    return;
  }

  spinner.succeed("Component name validated.");

  // Load existing configuration
  let existingConfig: Config | {} = {};
  const configPath = path.resolve(process.cwd(), "umirc.json");

  if (await pathExists(configPath)) {
    existingConfig = await readJSON(configPath);
  }

  // Validate config
  const config = existingConfig as Config;

  // Check if aliases and components are defined
  if (!config.aliases || !config.aliases.components) {
    spinner.fail("Component alias not defined in configuration.");
    return;
  }

  // Path to the new component directory based on config and category
  const componentDir = path.join(
    process.cwd(),
    "app",
    `_${config.aliases.components}`,
    `shared`,
    `${category}`, // Use the category from the component's config.json
  );

  spinner.start(`Adding component: ${componentName}...`);

  // Ensure the directory exists
  await ensureDir(componentDir);

  const componentSourceFilePath = path.join(
    selectedComponentDir,
    `${selectedComponent}.tsx`,
  );

  // Ensure the component file exists
  if (!(await pathExists(componentSourceFilePath))) {
    spinner.fail(`Component file "${selectedComponent}.tsx" not found.`);
    return;
  }

  // Destination file path (e.g., _components/shared/heros/Hero_1.tsx)
  const destinationFilePath = path.join(componentDir, `${componentName}.tsx`);

  let fileContent = await readFile(componentSourceFilePath, "utf8");

  await outputFile(destinationFilePath, fileContent);

  spinner.succeed(`Component "${componentName}" added successfully!`);

  spinner.start("Inserting schema...");

  const schemaSourceFilePath = path.join(selectedComponentDir, `schema.ts`);

  const schemaDestinationFilePath = path.join(sanity, `${componentName}.js`);

  let schemaFileContent = await readFile(schemaSourceFilePath, "utf8");

  // Ensure the component file exists
  if (!(await pathExists(schemaSourceFilePath))) {
    spinner.fail(`We cannot find the schema file for this component.`);
    return;
  }

  await outputFile(schemaDestinationFilePath, schemaFileContent);

  spinner.succeed(`Component schema file  added successfully!`);

  // Clean up by removing the temporary directory
  await remove(compDir);
};
