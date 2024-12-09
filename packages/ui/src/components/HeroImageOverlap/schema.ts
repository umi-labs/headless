import { z } from "zod";

export const Schema = z.object({
  data: z.object({
    separator: z.boolean().default(true).optional(),
    title: z.string(),
    subtitle: z.string(),
    content: z.string(),
    buttons: z
      .array(
        z.object({
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
        }),
      )
      .optional(),
    image: z.object({
      alt: z.string(),
      src: z.string(),
      width: z.number(),
      height: z.number(),
    }),
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
