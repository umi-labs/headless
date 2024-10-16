import { z } from "zod";
import { zodToTs } from "zod-to-ts";
import path from "path";

// Helper interface for Sanity schema fields
interface SanityField {
  name: string;
  type: string;
}

/**
 * Converts a Zod schema to a TypeScript interface.
 * @param schemaFilePath - The file path to the Zod schema.
 * @returns A string containing the TypeScript interface.
 */
export const zodToTSInterface = async (
  schemaFilePath: string
): Promise<string> => {
  try {
    // Dynamically import the schema file
    const schemaModule = await import(path.resolve(schemaFilePath));

    if (!schemaModule || !schemaModule.schema) {
      throw new Error("No schema found in the specified file.");
    }

    const schema = schemaModule.schema as z.ZodSchema;

    // Use zod-to-ts to generate TypeScript interfaces
    const { node } = zodToTs(schema);

    return `// Generated TypeScript interface from Zod schema
      ${node};`;
  } catch (error) {
    console.error(
      "Error generating TypeScript interface from Zod schema:",
      error
    );
    throw error;
  }
};

/**
 * Converts a Zod schema to a Sanity schema using the `defineType` format.
 * @param schemaFilePath - The file path to the Zod schema.
 * @param category - The category name for the Sanity schema.
 * @returns A string containing the Sanity schema.
 */
export const zodToSanitySchema = async (
  schemaFilePath: string,
  category: string
): Promise<string> => {
  try {
    // Dynamically import the schema file
    const schemaModule = await import(path.resolve(schemaFilePath));

    if (!schemaModule || !schemaModule.schema) {
      throw new Error("No schema found in the specified file.");
    }

    const schema = schemaModule.schema as z.ZodSchema;

    // Generate Sanity schema fields from the Zod schema
    const sanityFields: string[] = generateSanityFieldsFromZodSchema(schema);

    // Construct Sanity schema with defineType
    const sanitySchema = `export const defineType({
  name: '${category}',
  type: 'object',
  fields: [
    ${sanityFields.join(",\n    ")}
  ]
});`;

    return `// Generated Sanity schema from Zod schema
import { defineType, defineField } from "sanity";

${sanitySchema}`;
  } catch (error) {
    console.error("Error generating Sanity schema from Zod schema:", error);
    throw error;
  }
};

// Helper function to map Zod schema to Sanity fields using defineField
const generateSanityFieldsFromZodSchema = (schema: z.ZodSchema): string[] => {
  const shape = schema._def.shape();
  return Object.keys(shape).map((key) => {
    const fieldType = shape[key]._def.typeName;

    let sanityType: string;
    switch (fieldType) {
      case "ZodString":
        sanityType = "string";
        break;
      case "ZodNumber":
        sanityType = "number";
        break;
      case "ZodBoolean":
        sanityType = "boolean";
        break;
      case "ZodDate":
        sanityType = "datetime";
        break;
      default:
        sanityType = "string"; // Fallback for unknown types
    }

    return `defineField({ name: '${key}', type: '${sanityType}' })`;
  });
};
