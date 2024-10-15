import fs from "fs-extra";

// Function to modify the import statement in a file
export const modifyAndCopyFile = async (
  sourceFilePath: string,
  destinationFilePath: string
): Promise<void> => {
  try {
    // Read the file content from the source
    let fileContent = await fs.readFile(sourceFilePath, "utf8");

    // Define the import statements to look for and replace
    const oldImport = `import { cn } from "../../lib/utils";`;
    const newImport = `import { cn } from "@/lib/utils";`;

    // Replace the old import with the new one if it exists
    if (fileContent.includes(oldImport)) {
      fileContent = fileContent.replace(oldImport, newImport);
    }

    // Write the modified content to the destination file
    await fs.outputFile(destinationFilePath, fileContent);
    console.log(`File modified and copied to: ${destinationFilePath}`);
  } catch (error: any) {
    console.error(`Error modifying and copying file: ${error.message}`);
  }
};
