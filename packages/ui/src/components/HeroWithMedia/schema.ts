import { z } from "zod";

export const Schema = z.object({
  data: z.object({
    separator: z.boolean().default(true).optional(),
    background: z.enum(["light", "dark"]).default("light").optional(),
    subtitle: z.string().optional(),
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
    mediaType: z.enum(["image", "video"]).default("image").optional(),
    image: z
      .object({
        alt: z.string(),
        src: z.string(),
        width: z.number(),
        height: z.number(),
      })
      .optional(),
    video: z
      .object({
        alt: z.string(),
        src: z.string(),
        width: z.number(),
        height: z.number(),
      })
      .optional(),
    bottomContent: z
      .object({
        title: z.string(),
        content: z.string(),
      })
      .optional(),
  }),
});

export type Type = z.infer<typeof Schema>;

export const TEST_DATA: Type["data"] = {
  separator: true,
  title: "Content Section Headline Goes Here",
  background: "dark",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat, ipsum ac auctor ornare, nunc ligula scelerisque eros.",
  buttons: [
    {
      title: "Get Started",
      link: "https://www.google.com",
      type: "secondary",
    },
    {
      title: "Learn More",
      link: "https://www.google.com",
      type: "outline",
    },
  ],
  mediaType: "image",
  image: {
    alt: "",
    src: "/assets/hero-graphic.png",
    width: 797,
    height: 618,
  },
  bottomContent: {
    title: "Overview",
    content:
      "Facilitated workshops offer numerous benefits to hotel and hospitality businesses, including the ability to gain valuable insights, refine strategies, and create more effective marketing campaigns and customer experiences. By investing in facilitated workshops, businesses can improve their competitiveness, better meet the needs of their customers, and achieve long-term success.",
  },
};
