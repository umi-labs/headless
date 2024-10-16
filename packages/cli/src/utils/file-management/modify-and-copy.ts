import fs from "fs-extra";

const { readFile, outputFile } = fs;

// Define types for replacements and deletions
interface Replacement {
  oldValue: string;
  newValue: string;
}

interface Deletion {
  deleteLineContaining: string;
}

// Function to modify the file with multiple replacements and line deletions
export const modifyAndCopyFile = async (
  sourceFilePath: string,
  destinationFilePath: string,
  replacements: Replacement[], // Array of replacement pairs
  deletions: Deletion[] // Array of deletions
): Promise<void> => {
  try {
    // Read the file content from the source
    let fileContent = await readFile(sourceFilePath, "utf8");

    // Apply replacements
    replacements.forEach(({ oldValue, newValue }) => {
      if (fileContent.includes(oldValue)) {
        fileContent = fileContent.replace(new RegExp(oldValue, "g"), newValue);
      }
    });

    // Apply deletions
    deletions.forEach(({ deleteLineContaining }) => {
      const lines = fileContent.split("\n");
      fileContent = lines
        .filter((line) => !line.includes(deleteLineContaining))
        .join("\n");
    });

    // Write the modified content to the destination file
    await outputFile(destinationFilePath, fileContent);
    console.log(`File modified and copied to: ${destinationFilePath}`);
  } catch (error: any) {
    console.error(`Error modifying and copying file: ${error.message}`);
  }
};
