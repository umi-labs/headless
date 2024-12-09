import { z } from "zod";
import { ButtonSchema, ImageSchema } from "../../lib/generic-schemas.ts";

export const Schema = z.object({
  data: z.object({
    separator: z.boolean().default(true).optional(),
    title: z.string(),
    subtitle: z.string(),
    content: z.string(),
    buttons: z.array(ButtonSchema).optional(),
    image: ImageSchema,
  }),
});

export type Type = z.infer<typeof Schema>;

export const TEST_DATA: Type["data"] = {
  separator: true,
  subtitle: "Hospitality Digital Agency",
  title: "Increase Your Direct Booking Potential",
  content:
    "Strategy, Design, Development & Marketing for the Hospitality Industry",
  buttons: [
    {
      title: "Get Started",
      link: "https://www.google.com",
      type: "default",
    },
    {
      title: "Learn More",
      link: "https://www.google.com",
      type: "outline",
    },
  ],
  image: {
    alt: "",
    src: "/assets/hero-graphic.png",
    width: 797,
    height: 618,
  },
};
