import { z } from "zod";

export const Schema = z.object({
  data: z.object({
    separator: z.boolean().default(true).optional(),
    title: z.string(),
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
    topBuffer: z.boolean().default(true).optional(),
    features: z.array(
      z.object({
        icon: z
          .object({
            type: z.enum(["eye", "rocket"]),
            weight: z.enum([
              "thin",
              "light",
              "regular",
              "bold",
              "duotone",
              "fill",
            ]),
          })
          .optional(),
        title: z.string(),
        content: z.string().optional(),
        button: z
          .object({
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
          })
          .optional(),
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
        weight: "regular",
      },
      title: "Strategy Workshops",
      button: {
        title: "Find Out More",
        type: "link",
        link: "https://www.google.com",
      },
    },
    {
      icon: {
        type: "rocket",
        weight: "regular",
      },
      title: "User Research",
      button: {
        title: "Find Out More",
        type: "link",
        link: "https://www.google.com",
      },
    },
    {
      icon: {
        type: "eye",
        weight: "regular",
      },
      title: "Custom Design",
      button: {
        title: "Find Out More",
        type: "link",
        link: "https://www.google.com",
      },
    },
    {
      icon: {
        type: "rocket",
        weight: "regular",
      },
      title: "Bespoke Development",
      button: {
        title: "Find Out More",
        type: "link",
        link: "https://www.google.com",
      },
    },
    {
      icon: {
        type: "eye",
        weight: "regular",
      },
      title: "Digital Marketing",
      button: {
        title: "Find Out More",
        type: "link",
        link: "https://www.google.com",
      },
    },
  ],
};
