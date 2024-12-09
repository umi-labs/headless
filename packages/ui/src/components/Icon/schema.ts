import { z } from "zod";

export const Schema = z.object({
  type: z.enum([
    "eye",
    "rocket",
    "check",
    "check-circle",
    "instagram",
    "twitter",
    "caret-down",
    "caret-up",
    "caret-left",
    "caret-right",
    "headphones",
    "clock",
  ]),
  weight: z
    .enum(["thin", "light", "regular", "bold", "duotone", "fill"])
    .default("regular")
    .optional(),
});

export type Type = z.infer<typeof Schema>;

export const TEST_DATA: Type = {
  type: "eye",
  weight: "regular",
};
