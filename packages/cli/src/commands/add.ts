import fs from "fs-extra";
import path from "path";
import ora from "ora";
import simpleGit from "simple-git";
import prompts from "prompts"; // Import prompts for user input
import { z } from "zod"; // Import Zod for validation
import { Config, componentNameSchema } from "../utils/schema"; // Adjust the import path as needed
import { modifyAndCopyFile } from "../utils/file-management/modify-and-copy";
// import { zodToTSInterface } from "../utils/zodToInterface";

// Import fs-extra functions like this or dist will fail
const { readJSON, pathExists, ensureDir, readdir, outputFile } = fs;

// Initialise simple-git
const git = simpleGit();

// Function to generate TypeScript interface from Zod schema (using dynamic import)
const zodToTSInterface = async (schemaPath: string): Promise<string> => {
  const schemaModule = await import(schemaPath); // Dynamically import Zod schema
  const schema = schemaModule.default; // Assuming default export
  const keys = Object.keys(schema.shape); // Get schema fields
  const tsInterface = keys
    .map((key) => {
      const fieldType = schema.shape[key]._def.typeName; // Get field type from Zod
      return `${key}: ${fieldType};`;
    })
    .join("\n");

  return `interface ${path.basename(schemaPath)}Schema {\n${tsInterface}\n}`;
};

// Convert Zod schema into Sanity schema (using dynamic import)
const zodToSanitySchema = async (
  schemaPath: string,
  category: string
): Promise<string> => {
  const schemaModule = await import(schemaPath); // Dynamically import Zod schema
  const schema = schemaModule.default; // Assuming default export
  const fields = Object.keys(schema.shape).map((key) => {
    return `{name: "${key}", type: "${schema.shape[key]._def.typeName}"}`;
  });
  return `export default {\n title: "${category} Schema",\n name: "${category}Schema",\n type: "object",\n fields: [${fields.join(
    ", "
  )}]\n}`;
};

// Function to add a component
export const add = async (componentName?: string) => {
  const spinner = ora();
  const componentsRepo = "https://github.com/umi-labs/umi";
  const compDir = path.join(process.cwd(), "temp-components");

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

  // Perform replacements and deletions
  await modifyAndCopyFile(
    selectedComponentFile,
    destinationFilePath,
    [
      {
        old: 'import { cn } from "../../lib/utils";',
        new: 'import { cn } from "@/lib/utils";',
      },
    ],
    ["someLineToDelete"] // Add any line you wish to delete
  );

  // Convert Zod schema to TypeScript interface
  const tsInterface = zodToTSInterface(path.join(componentDir, "schema.ts"));
  await outputFile(
    path.join(componentDestDir, `${componentName}.d.ts`),
    tsInterface
  );

  // Convert Zod schema to Sanity schema
  const sanitySchema = zodToSanitySchema(
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
