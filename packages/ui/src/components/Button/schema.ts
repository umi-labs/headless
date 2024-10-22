import { z } from "zod";

export const Schema = z.object({
  label: z.string(),
  onClick: z.function(),
  variant: z
    .enum(["primary", "secondary", "tertiary"])
    .default("primary")
    .optional(),
});

export type Type = z.infer<typeof Schema>;
