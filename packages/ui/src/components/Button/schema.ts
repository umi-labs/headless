import { z } from "zod";

export const ButtonSchema = z.object({
  label: z.string(),
  onClick: z.function(),
  variant: z
    .enum(["primary", "secondary", "tertiary"])
    .default("primary")
    .optional(),
});

export type ButtonType = z.infer<typeof ButtonSchema>;
