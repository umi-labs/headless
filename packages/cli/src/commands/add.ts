import fs from "fs-extra";
import path from "path";
import ora from "ora";
import simpleGit from "simple-git";
import prompts from "prompts";
import { z } from "zod";
import { exec } from "child_process";
import util from "util";
import { Config, componentNameSchema } from "../utils/schema";
import { modifyAndCopyFile } from "../utils/file-management/modify-and-copy";
import { zodToTSInterface, zodToSanitySchema } from "../utils/zod-utils";

const { pathExists, remove, readdir, readJSON, ensureDir, outputFile } = fs;

const execPromise = util.promisify(exec);
const git = simpleGit();

export const add = async (componentName?: string) => {
  const spinner = ora();
  const componentsRepo = "https://github.com/umi-labs/umi"; // Replace with the actual repository URL
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

  const componentsDir = path.join(
    compDir,
    "packages",
    "ui",
    "src",
    "components"
  );
  const components = await readdir(componentsDir);

  if (components.length === 0) {
    spinner.fail("No components found in the cloned repository.");
    return;
  }

  // Prompt the user to select a component
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
  const componentConfig = await readJSON(
    path.join(componentDir, "config.json")
  );

  // If no component name was provided, prompt the user for one
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

  // Validate the component name
  try {
    componentNameSchema.parse(componentName);
  } catch (error) {
    spinner.fail((error as z.ZodError).errors[0].message);
    return;
  }

  spinner.succeed("Component name validated.");

  // Load the existing configuration
  const existingConfig: Config | {} = (await pathExists("umirc.json"))
    ? await readJSON("umirc.json")
    : {};

  // Ensure the aliases for components are set in the configuration
  if (!existingConfig.aliases || !existingConfig.aliases.components) {
    spinner.fail("Component alias not defined in configuration.");
    return;
  }

  // Define the destination directory for the new component
  const componentDestDir = path.join(
    process.cwd(),
    "_components",
    "shared",
    `${componentConfig.category}`
  );
  await ensureDir(componentDestDir);

  const selectedComponentFile = path.join(
    componentDir,
    `${selectedComponent}.tsx`
  );
  const destinationFilePath = path.join(
    componentDestDir,
    `${componentName}.tsx`
  );

  // Define replacements and deletions for the file modification
  const replacements = [
    {
      oldValue: 'import { cn } from "../../lib/utils";',
      newValue: 'import { cn } from "@/lib/utils";',
    },
  ];

  const deletions = [
    { deleteLineContaining: `displayName = "` },
    { deleteLineContaining: `console.log(` },
    { deleteLineContaining: "/* TO BE DELETED */" },
    { deleteLineContaining: "global.css" },
  ];

  // Modify and copy the component file
  await modifyAndCopyFile(
    selectedComponentFile,
    destinationFilePath,
    replacements,
    deletions
  );

  // Convert Zod schema to TypeScript interface and Sanity schema
  const schemaPath = path.join(componentDir, "schema.ts");
  const tsInterface = await zodToTSInterface(schemaPath);
  await outputFile(
    path.join(componentDestDir, `${componentName}.d.ts`),
    tsInterface
  );

  const sanitySchema = await zodToSanitySchema(
    schemaPath,
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

  // Compile TypeScript using ts-node
  try {
    spinner.start("Compiling TypeScript files with ts-node...");
    await execPromise(`npx ts-node ${destinationFilePath}`);
    spinner.succeed("TypeScript compilation completed.");
  } catch (error) {
    spinner.fail("TypeScript compilation failed.");
    console.error(error);
    return;
  }

  spinner.succeed(
    `Component "${componentName}" added and compiled successfully!`
  );
};
