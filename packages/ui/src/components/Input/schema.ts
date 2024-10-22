import { z } from "zod";

export const Schema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string().optional(),
  type: z.enum(["text", "number", "email"]).default("text").optional(),
  onChange: z.function().optional(),
  classNames: z.string().optional(),
  register: z.function(),
});

export type Type = z.infer<typeof Schema>;
