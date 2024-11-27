import fs from "fs-extra";
import path from "path";
import { cleanComponentName } from "../nameCleaner";

const { readFile, writeFile } = fs;

const filePath = path.join(process.cwd(), "sanity", "schemas", "index.js");

export const addImportBelowObjects = async ({
  componentName,
}: {
  componentName: string; // Expecting a name to clean
}) => {
  try {
    // Clean the component name
    const cleanedName = cleanComponentName(componentName);

    // Create the new import statement
    const newImport = `import ${cleanedName} from '@/sanity/schemas/objects/${cleanedName}'`;

    // Read the file content
    const fileContent = await readFile(filePath, "utf-8");

    // Find the positions of the "// Objects" comments
    const firstObjectsCommentIndex = fileContent.indexOf("// Objects");
    const secondObjectsCommentIndex = fileContent.indexOf(
      "// Objects",
      firstObjectsCommentIndex + 1,
    );

    // If the first comment is found, insert the new import right below it
    if (firstObjectsCommentIndex !== -1) {
      const updatedContent =
        fileContent.slice(0, firstObjectsCommentIndex + "// Objects".length) +
        `\n${newImport}` +
        fileContent.slice(firstObjectsCommentIndex + "// Objects".length);

      // Now, insert the cleaned component name into the schema array below the second "// Objects"
      if (secondObjectsCommentIndex !== -1) {
        const schemaArrayIndex = updatedContent.indexOf(
          "export const schema = [",
        );
        const schemaEndIndex =
          updatedContent.indexOf(`/n]`, schemaArrayIndex) + 1;

        // Insert the cleaned component name right before the closing bracket
        const updatedSchemaContent =
          updatedContent.slice(0, schemaEndIndex - 1) +
          `\n  ${cleanedName},` +
          updatedContent.slice(schemaEndIndex - 1);

        // Write the updated content back to the file
        await writeFile(filePath, updatedSchemaContent);
      } else {
        console.error('Could not find the second "// Objects" comment.');
      }
    } else {
      console.error('Could not find the first "// Objects" comment.');
    }
  } catch (err) {
    console.error("Error adding the import:", err);
  }
};
