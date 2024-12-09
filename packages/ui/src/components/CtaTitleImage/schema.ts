import { z } from "zod";

export const Schema = z.object({
  data: z.object({
    subtitle: z.string(),
    title: z.string(),
    content: z.string(),
    points: z
      .array(
        z.object({
          icon: z.object({
            type: z.enum(["eye", "rocket", "check", "check-circle"]),
            weight: z.enum([
              "thin",
              "light",
              "regular",
              "bold",
              "duotone",
              "fill",
            ]),
          }),
          content: z.string(),
        }),
      )
      .optional(),
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
  subtitle: "Contact",
  title: "Schedule a Call",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat, ipsum ac auctor ornare, nunc ligula scelerisque eros.",
  points: [
    {
      icon: {
        type: "eye",
        weight: "thin",
      },
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
    },
    {
      icon: {
        type: "eye",
        weight: "thin",
      },
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
    },
    {
      icon: {
        type: "eye",
        weight: "thin",
      },
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
    },
  ],
  buttons: [
    {
      title: "Book Meeting",
      type: "default",
    },
    {
      title: "Send Email",
      type: "outline",
    },
  ],
  image: {
    src: "/assets/hero-graphic.png",
    alt: "Lorem ipsum dolor",
    width: 849,
    height: 766,
  },
};
