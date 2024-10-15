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
  textAlignHoz: z
    .enum(["left", "center", "right"])
    .default("center")
    .optional(),
  textAlignVer: z
    .enum(["top", "center", "bottom"])
    .default("center")
    .optional(),
  variant: z
    .enum(["primary", "secondary", "tertiary"])
    .default("primary")
    .optional(),
});

export type Hero1Type = z.infer<typeof Hero1Schema>;

export const TEST_DATA: Hero1Type["data"] = {
  heading: "Medium length hero heading goes here",
  descritpion:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  tagline: "Tagline",
  image: {
    src: "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Random image",
    width: 1000,
    height: 500,
  },
};
