import { z } from 'zod';

// Define the config schema
export const configSchema = z.object({
    name: z.string().min(1, 'Project name is required'),
    aliases: z.object({
        components: z.string(),
        utils: z.string(),
        hooks: z.string(),
        api: z.string(),
        ui: z.string(),
    })
}).strict();

// Define the TypeScript type based on the schema
export type Config = z.infer<typeof configSchema>;

// Define a schema for validating component names
export const componentNameSchema = z.string().min(1, 'Component name is required');
