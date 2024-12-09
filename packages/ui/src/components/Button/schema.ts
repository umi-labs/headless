import { z } from "zod";

export const Schema = z.object({
  title: z.string(),
  link: z.string().optional(),
  type: z.enum([
    "link",
    "outline",
    "default",
    "destructive",
    "secondary",
    "ghost",
  ]),
});

export type Type = z.infer<typeof Schema>;
