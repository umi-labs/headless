import path from "path";

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
