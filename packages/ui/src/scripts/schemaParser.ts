import { z } from "zod";
import { printNode, zodToTs } from "zod-to-ts"; // Parse Zod schema to TypeScript interface

// Parse Zod schema to TypeScript interface
export const parseZodSchemaToInterface = (
  schemaContent: string,
  componentName: string,
): any => {
  // Return type should be string
  const schema = extractZodSchema(schemaContent);

  if (!schema) {
    throw new Error("Failed to extract Zod schema.");
  }

  // Use zodToTs and get the code as a string
  const { node } = zodToTs(schema, componentName);
  const nodeString = printNode(node);
  return `interface ${componentName}Props ${nodeString}`; // Return the generated TypeScript interface code
};

// Parse Zod schema to Sanity schema
export const parseZodSchemaToSanity = (
  schemaContent: string,
  componentName: string,
): string => {
  const schema = extractZodSchema(schemaContent);
  const sanityFields = schema
    ? Object.keys(schema.shape).map((key) => {
        return `defineField({
          name: '${key}',
          title: '${key.charAt(0).toUpperCase() + key.slice(1)}',
          type: '${getSanityTypeFromZodType(schema.shape[key])}'
        })`;
      })
    : [];

  return `import { defineType, defineField } from 'sanity'

export default defineType({
  name: '${componentName.toLowerCase()}',
  title: '${componentName}',
  type: 'object',
  fields: [
    ${sanityFields.join(",\n    ")}
  ],
  preview: {
    prepare() {
      return {
        title: '${componentName}',
      }
    },
  },
})
`;
};

// Extract Zod schema object from the schema content string
const extractZodSchema = (schemaContent: string): z.ZodObject<any> | null => {
  try {
    // Improved regex to match the entire Zod object declaration
    const zodObjectRegex = /const (Schema|.*) = z\.object\(([\s\S]*?)\);/; // Matches `const Schema = z.object({...});`
    const match = schemaContent.match(zodObjectRegex);

    if (match && match[2]) {
      const schemaDefinition = match[2].trim(); // Capture the definition inside z.object
      // Create a new function to evaluate the schema in the right scope
      const schemaFunction = new Function(
        "z",
        `return z.object(${schemaDefinition});`,
      );

      // Call the function to create the Zod object
      const schemaObject = schemaFunction(z); // Pass z to the function
      return schemaObject; // Return the ZodObject
    }

    console.warn("No Zod schema found in the provided content.");
    return null;
  } catch (error) {
    console.error("Failed to extract Zod schema:", error);
    return null;
  }
};

// Map Zod types to Sanity types
const getSanityTypeFromZodType = (zodType: z.ZodTypeAny): string => {
  if (zodType instanceof z.ZodString) return "string";
  if (zodType instanceof z.ZodNumber) return "number";
  if (zodType instanceof z.ZodBoolean) return "boolean";
  if (zodType instanceof z.ZodArray) return "array";
  return "object";
};
