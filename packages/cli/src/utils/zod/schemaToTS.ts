import fs from "fs-extra";
import { z } from "zod";
import path from "path";
// import { tsImport } from "tsx/esm/api";

const { readFile, writeFile } = fs;

// Function to read the schema file and process it
export async function processSchemaAndInsert(
  componentDir: string,
  newComponentFile: string
) {
  try {
    // 1. Read the `schema.ts` file from the component's directory
    const schemaFilePath = path.join(componentDir, "schema.ts");

    // 2. Dynamically import the schema to get the Zod schema
    const schemaModule = await import(schemaFilePath);
    // const schemaModule = await tsImport(schemaFilePath, import.meta.url);

    const schema = schemaModule.schema as z.ZodObject<any>;

    // 3. Infer the TypeScript type from the Zod schema
    const inferredType = z.infer<typeof schema>;

    // 4. Convert the inferred type to a TypeScript interface string
    const interfaceString = generateTypeScriptInterface(
      "ComponentProps",
      inferredType
    );

    // 5. Read the new component file where this will be inserted
    const newComponentContent = await readFile(newComponentFile, "utf-8");

    // 6. Insert the generated TypeScript interface at the top of the new component file
    const modifiedComponentContent = `${interfaceString}\n\n${newComponentContent}`;

    // 7. Write the modified content back to the new component file
    await writeFile(newComponentFile, modifiedComponentContent, "utf-8");

    console.log("Successfully added interface to the new component file");
  } catch (error) {
    console.error(
      "Error processing schema and inserting into component file:",
      error
    );
  }
}

// Helper function to generate TypeScript interface string from the inferred type
function generateTypeScriptInterface(
  interfaceName: string,
  inferredType: any
): string {
  // Here you would serialize the inferred type into a TypeScript interface.
  // A simple mock-up to give you an idea:
  return `interface ${interfaceName} {
    // Define the fields from the Zod schema here
  }`;
}
