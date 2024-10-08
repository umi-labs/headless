import fs from "fs-extra";
import path from "path";
import ora from "ora";
import prompts from "prompts"; // Import prompts for user input
import { z } from "zod"; // Import Zod for validation
import { Config, componentNameSchema } from "../utils/schema"; // Adjust the import path as needed
import { componentTemplate } from "../utils/templates"; // Import the component template

// Import fs-extra functions like this or dist will fail
const { readJSON, pathExists, ensureDir, outputFile } = fs;

// Function to add a component
export const add = async (componentName?: string) => {
  const spinner = ora();

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

  const componentDir = path.join(
    process.cwd(),
    "app",
    `_${config.aliases.components}`,
    `${config.aliases.ui}`
  );

  spinner.start(`Adding component: ${componentName}...`);

  // Ensure the directory exists
  await ensureDir(componentDir);

  // Create the component file using the template
  const componentFilePath = path.join(componentDir, `${componentName}.tsx`);

  // Use the imported template to create the component content
  const componentContent = componentTemplate(componentName); // Ensure componentName is a string

  // Write the component file
  await outputFile(componentFilePath, componentContent);

  spinner.succeed(`Component "${componentName}" added successfully!`);
};
