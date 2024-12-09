import { z } from "zod";
import { ButtonSchema, IconSchema } from "../../lib/generic-schemas.ts";

export const Schema = z.object({
  data: z.object({
    separator: z.boolean().default(true).optional(),
    title: z.string(),
    content: z.string(),
    buttons: z.array(ButtonSchema).optional(),
    topBuffer: z.boolean().default(true).optional(),
    features: z.array(
      z.object({
        icon: IconSchema.optional(),
        title: z.string(),
        content: z.string().optional(),
        button: ButtonSchema.optional(),
      }),
    ),
  }),
});

export type Type = z.infer<typeof Schema>;

export const TEST_DATA: Type["data"] = {
  topBuffer: true,
  separator: true,
  title: "Content Section Headline Goes Here",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat, ipsum ac auctor ornare, nunc ligula scelerisque eros.",
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
  features: [
    {
      icon: {
        type: "eye",
        weight: "thin",
      },
      title: "Direct Booking Strategy",
      button: {
        title: "Find Out More",
        type: "link",
        link: "https://www.google.com",
      },
    },
    {
      icon: {
        type: "rocket",
        weight: "thin",
      },
      title: "Growth Driven Design",
      button: {
        title: "Find Out More",
        type: "link",
        link: "https://www.google.com",
      },
    },
  ],
};
