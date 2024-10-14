import { z } from "zod";

export const Hero1Schema = z.object({
  data: z.object({
    tagline: z.string(),
    heading: z.string(),
    descritpion: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
      width: z.number(),
      height: z.number(),
    }),
  }),
  variant: z
    .enum(["primary", "secondary", "tertiary"])
    .default("primary")
    .optional(),
});

export type Hero1Type = z.infer<typeof Hero1Schema>;
