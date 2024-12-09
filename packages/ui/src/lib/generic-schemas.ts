import { z } from "zod";

export const ImageSchema = z.object({
  alt: z.string(),
  src: z.string(),
  width: z.number(),
  height: z.number(),
});

export const ButtonSchema = z.object({
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

export const IconSchema = z.object({
  type: z.enum(["eye", "rocket"]),
  weight: z.enum(["thin", "light", "regular", "bold", "duotone", "fill"]),
});
