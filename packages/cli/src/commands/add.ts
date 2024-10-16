import fs from "fs-extra";
import path from "path";
import ora from "ora";
import simpleGit from "simple-git";
import prompts from "prompts"; // Import prompts for user input
import { z } from "zod"; // Import Zod for validation
import { Config, componentNameSchema } from "../utils/schema"; // Adjust the import path as needed
import { modifyAndCopyFile } from "../utils/file-management/modify-and-copy";
import execa from "execa"; // Import execa for running commands

// Import fs-extra functions like this or dist will fail
const { readJSON, pathExists, ensureDir, readdir, outputFile, remove } = fs;

// Initialise simple-git
const git = simpleGit();

// Function to compile TypeScript files
const compileTypeScript = async (directory: string) => {
  const spinner = ora(`Compiling TypeScript files in ${directory}...`).start();
  try {
    await execa("tsc", {
      cwd: directory, // Set the working directory to where the TypeScript files are
      stdio: "inherit", // Use the same stdio as the current process
    });
    spinner.succeed("TypeScript compilation completed.");
  } catch (error) {
    spinner.fail("TypeScript compilation failed.");
    console.error(error);
  }
};

// Function to add a component
export const add = async (componentName?: string) => {
  const spinner = ora();
  const componentsRepo = "https://github.com/umi-labs/umi";
  const compDir = path.join(process.cwd(), "temp-components");

  // Check if temp-components directory exists and remove it if necessary
  if (await pathExists(compDir)) {
    spinner.start("Cleaning up old temp directory...");
    await remove(compDir); // Remove the directory
    spinner.succeed("Old temp directory removed.");
  }

  spinner.start("Getting components...");
  await git.clone(componentsRepo, compDir);
  spinner.succeed("Components found.");

  const componentsDir = path.join(
    compDir,
    "packages",
    "ui",
    "src",
    "components"
  );
  const components = await readdir(componentsDir);

  if (components.length === 0) {
    spinner.fail("No templates available in the cloned directory.");
    return;
  }

  const { selectedComponent } = await prompts({
    type: "select",
    name: "selectedComponent",
    message: "Select a component to add:",
    choices: components.map((component) => ({
      title: component,
      value: component,
    })),
  });

  const componentDir = path.join(componentsDir, selectedComponent);

  // Get config.json
  const componentConfig = await readJSON(
    path.join(componentDir, "config.json")
  );

  // Prompt for component name if not provided
  if (!componentName) {
    const response = await prompts({
      type: "text",
      name: "componentName",
      message: "What is the name of the component?",
      validate: (value) =>
        value.length > 0 ? true : "Component name is required",
    });

    componentName = response.componentName;
  }

  // Validate the component name using Zod
  try {
    componentNameSchema.parse(componentName);
  } catch (error) {
    spinner.fail((error as z.ZodError).errors[0].message);
    return;
  }

  spinner.succeed("Component name validated.");

  let existingConfig: Config | {} = {};
  const configPath = path.resolve(process.cwd(), "umirc.json");

  if (await pathExists(configPath)) {
    existingConfig = await readJSON(configPath);
  }

  const config = existingConfig as Config;

  if (!config.aliases || !config.aliases.components) {
    spinner.fail("Component alias not defined in configuration.");
    return;
  }

  const componentDestDir = path.join(
    process.cwd(),
    "_components",
    "shared",
    `${componentConfig.category}`
  );

  await ensureDir(componentDestDir);

  // Get the selected component's file content
  const selectedComponentFile = path.join(
    componentDir,
    `${selectedComponent}.tsx`
  );
  const destinationFilePath = path.join(
    componentDestDir,
    `${componentName}.tsx`
  );

  const replacements = [
    {
      oldValue: 'import { cn } from "../../lib/utils";',
      newValue: 'import { cn } from "@/lib/utils";',
    },
  ];

  const deletions = [
    { deleteLineContaining: `displayName = "` }, // Deletes any line containing `displayName = "`
    { deleteLineContaining: `console.log(` }, // Deletes any line containing `console.log(`
    { deleteLineContaining: "/* TO BE DELETED */" }, // Deletes any line containing `/* TO BE DELETED */`
    { deleteLineContaining: "global.css" }, // Deletes any line containing `global.css`
  ];

  // Perform replacements and deletions
  await modifyAndCopyFile(
    selectedComponentFile,
    destinationFilePath,
    replacements,
    deletions
  );

  // Compile TypeScript files in the cloned directory
  await compileTypeScript(componentDir);

  // Convert Zod schema to TypeScript interface and Sanity schema
  const tsInterface = await zodToTSInterface(
    path.join(componentDir, "schema.ts")
  );
  await outputFile(
    path.join(componentDestDir, `${componentName}.d.ts`),
    tsInterface
  );

  const sanitySchema = await zodToSanitySchema(
    path.join(componentDir, "schema.ts"),
    componentConfig.category
  );
  await outputFile(
    path.join(
      "sanity",
      "schemas",
      "objects",
      componentConfig.category,
      `${componentName}.js`
    ),
    sanitySchema
  );

  spinner.succeed(`Component "${componentName}" added successfully!`);
};
