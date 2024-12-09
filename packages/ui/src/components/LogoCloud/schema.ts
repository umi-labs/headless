import { z } from "zod";
import { ImageSchema } from "../../lib/generic-schemas.ts";

export const Schema = z.object({
  data: z.object({
    separator: z.boolean().optional().default(true),
    title: z.string(),
    logos: z.array(
      z.object({
        logo: ImageSchema,
        name: z.string().optional(),
        link: z.string().optional(),
      }),
    ),
  }),
});

export type Type = z.infer<typeof Schema>;

export const TEST_DATA: Type["data"] = {
  separator: true,
  title: "Our Clients",
  logos: [
    {
      logo: {
        src: "/assets/logo_GHG.png",
        alt: "GHG Logo",
        width: 340,
        height: 340,
      },
      name: "GHG Logo",
      link: "https://goodhotelsguide.com",
    },
    {
      logo: {
        src: "/assets/logo_GHG.png",
        alt: "GHG Logo",
        width: 340,
        height: 340,
      },
      name: "GHG Logo",
      link: "https://goodhotelsguide.com",
    },
    {
      logo: {
        src: "/assets/logo_GHG.png",
        alt: "GHG Logo",
        width: 340,
        height: 340,
      },
      name: "GHG Logo",
      link: "https://goodhotelsguide.com",
    },
    {
      logo: {
        src: "/assets/logo_GHG.png",
        alt: "GHG Logo",
        width: 340,
        height: 340,
      },
      name: "GHG Logo",
      link: "https://goodhotelsguide.com",
    },
    {
      logo: {
        src: "/assets/logo_GHG.png",
        alt: "GHG Logo",
        width: 340,
        height: 340,
      },
      name: "GHG Logo",
      link: "https://goodhotelsguide.com",
    },
    {
      logo: {
        src: "/assets/logo_GHG.png",
        alt: "GHG Logo",
        width: 340,
        height: 340,
      },
      name: "GHG Logo",
      link: "https://goodhotelsguide.com",
    },
    {
      logo: {
        src: "/assets/logo_GHG.png",
        alt: "GHG Logo",
        width: 340,
        height: 340,
      },
      name: "GHG Logo",
      link: "https://goodhotelsguide.com",
    },
    {
      logo: {
        src: "/assets/logo_GHG.png",
        alt: "GHG Logo",
        width: 340,
        height: 340,
      },
      name: "GHG Logo",
      link: "https://goodhotelsguide.com",
    },
    {
      logo: {
        src: "/assets/logo_GHG.png",
        alt: "GHG Logo",
        width: 340,
        height: 340,
      },
      name: "GHG Logo",
      link: "https://goodhotelsguide.com",
    },
    {
      logo: {
        src: "/assets/logo_GHG.png",
        alt: "GHG Logo",
        width: 340,
        height: 340,
      },
      name: "GHG Logo",
      link: "https://goodhotelsguide.com",
    },
  ],
};
