import { z } from "zod";

export const Schema = z.object({
  data: z.object({
    separator: z.boolean().optional().default(true),
    title: z.string(),
    blogs: z.array(
      z.object({
        tag: z.string(),
        title: z.string(),
        image: z.object({
          alt: z.string(),
          src: z.string(),
          width: z.number(),
          height: z.number(),
        }),
        date: z.string(),
        author: z
          .object({
            name: z.string(),
            link: z.string(),
          })
          .optional(),
        time: z
          .object({
            timeTaken: z.number().default(10).optional(),
            timeType: z.enum(["blog", "podcast"]).default("blog").optional(),
          })
          .optional(),
        button: z.object({
          href: z.string(),
          title: z.string(),
        }),
      }),
    ),
  }),
});

export type Type = z.infer<typeof Schema>;

export const TEST_DATA: Type["data"] = {
  separator: true,
  title: "Latest Insights",
  blogs: [
    {
      title:
        "Blog Post Title Goes Here Lorem Ipsum dolor sit amet, consectetur adipiscing ",

      tag: "blog",
      image: {
        src: "/assets/logo_GHG.png",
        alt: "GHG Logo",
        width: 340,
        height: 340,
      },
      date: "Jan 4 2022",
      author: {
        name: "John Smith",
        link: "https://www.linkedin.com/in/john-smith",
      },
      time: {
        timeTaken: 10,
        timeType: "blog",
      },
      button: {
        href: "#",
        title: "Read More",
      },
    },
    {
      title:
        "Podcast Title Goes Here Lorem Ipsum dolor sit amet, consectetur adipiscing ",
      tag: "podcast",
      image: {
        src: "/assets/logo_GHG.png",
        alt: "GHG Logo",
        width: 340,
        height: 340,
      },
      date: "Jan 4 2022",
      author: {
        name: "John Smith",
        link: "https://www.linkedin.com/in/john-smith",
      },
      time: {
        timeTaken: 10,
        timeType: "podcast",
      },
      button: {
        href: "#",
        title: "Read More",
      },
    },
  ],
};
