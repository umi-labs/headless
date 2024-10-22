import path from "path";

import { z } from "zod";
import toCamelCase from "./toCamelCase";

// Function to generate TypeScript interface from Zod schema
export const zodToTSInterface = (schemaPath: string): string => {
  const schema = require(schemaPath); // Import Zod schema dynamically
  const keys = Object.keys(schema.shape); // Get schema fields
  const tsInterface = keys
    .map((key) => {
      const fieldType = schema.shape[key]._def.typeName; // Get field type from Zod
      return `${key}: ${fieldType};`;
    })
    .join("\n");

  return `interface ${path.basename(schemaPath)}Schema {\n${tsInterface}\n}`;
};

// Utility function to map Zod types to Sanity schema types
export const zodToSanity = (zodSchema: z.ZodTypeAny, title: string) => {
  const fields: any[] = [];

  const name = toCamelCase(title);

  zodSchema._def.shape().forEach((field: any, fieldName: string) => {
    let fieldType: string;

    if (field instanceof z.ZodString) {
      fieldType = "string";
    } else if (field instanceof z.ZodNumber) {
      fieldType = "number";
    } else if (field instanceof z.ZodBoolean) {
      fieldType = "boolean";
    } else if (field instanceof z.ZodObject) {
      fieldType = "object";
      // recursively handle nested objects
    } else {
      throw new Error(`Unsupported Zod field type: ${field}`);
    }

    fields.push({
      name: fieldName,
      type: fieldType,
      title: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
    });
  });

  return {
    title,
    name: name,
    type: "document",
    fields,
  };
};
