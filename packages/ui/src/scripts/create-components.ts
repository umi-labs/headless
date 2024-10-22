import fs from "fs-extra";
import path from "path";
import { modifyAndCopyFile } from "./modifyAndCopy";
import {
  parseZodSchemaToInterface,
  parseZodSchemaToSanity,
} from "./schemaParser";

const {
  ensureDirSync,
  writeFileSync,
  writeJsonSync,
  readFileSync,
  readJsonSync,
} = fs;

const outputDir = path.resolve(__dirname, "../../output");
const componentsDir = path.resolve(__dirname, "../../src/components");

const components = fs
  .readdirSync(componentsDir)
  .filter((file) => fs.lstatSync(path.join(componentsDir, file)).isDirectory());

components.forEach(async (componentName) => {
  const sourceComponentFolder = path.join(componentsDir, componentName);
  const targetComponentFolder = path.join(outputDir, componentName);

  // Create the output directory for the component
  ensureDirSync(targetComponentFolder);

  // Paths to existing files in source directory
  const sourceComponentFilePath = path.join(
    sourceComponentFolder,
    `component.tsx`,
  );
  const sourceSchemaFilePath = path.join(sourceComponentFolder, "schema.ts");
  const sourceConfigFilePath = path.join(sourceComponentFolder, "config.json");

  // Modify and copy Component.tsx content if it exists
  if (fs.existsSync(sourceComponentFilePath)) {
    const destinationComponentFilePath = path.join(
      targetComponentFolder,
      `${componentName}.tsx`,
    );

    // Define replacements and deletions
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
      { deleteLineContaining: "./schema" },
      { deleteLineContaining: "global.css" },
      { deleteLineContaining: ".scss" },
      { deleteLineContaining: "./types" },
    ];

    // Modify and copy the file
    await modifyAndCopyFile(
      sourceComponentFilePath,
      destinationComponentFilePath,
      replacements,
      deletions,
    );

    // Check if the schema exists and process it
    if (fs.existsSync(sourceSchemaFilePath)) {
      const schemaContent = readFileSync(sourceSchemaFilePath, "utf-8");

      // Convert the Zod schema into TypeScript interface and Sanity schema
      const tsInterface = parseZodSchemaToInterface(
        schemaContent,
        componentName,
      );
      const sanitySchema = parseZodSchemaToSanity(schemaContent, componentName);

      // Insert TypeScript interface into component.tsx below the imports
      const componentFileContent = readFileSync(
        destinationComponentFilePath,
        "utf-8",
      );
      const modifiedComponentFileContent = componentFileContent.replace(
        /^(import .*;)/,
        `$1\n\n${tsInterface}`,
      );
      writeFileSync(destinationComponentFilePath, modifiedComponentFileContent);

      // Insert Sanity schema into schema.ts
      writeFileSync(
        path.join(targetComponentFolder, "schema.ts"),
        sanitySchema,
      );

      console.log(`Processed schema for ${componentName}`);
    } else {
      console.log(`No schema.ts file found for ${componentName}`);
    }

    console.log(
      `Modified and copied ${componentName}.tsx for ${componentName}`,
    );
  } else {
    console.log(`No component.tsx file found for ${componentName}`);
  }

  // Copy config.json content if it exists
  if (fs.existsSync(sourceConfigFilePath)) {
    const configContent = readJsonSync(sourceConfigFilePath); // Read the JSON file
    writeJsonSync(
      path.join(targetComponentFolder, "config.json"),
      configContent,
    ); // Write to new file
    console.log(`Copied config.json for ${componentName}`);
  } else {
    console.log(`No config.json file found for ${componentName}`);
  }

  console.log(`Created folder and copied files for ${componentName}`);
});
