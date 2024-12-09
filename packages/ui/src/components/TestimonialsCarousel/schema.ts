import { z } from "zod";

export const Schema = z.object({
  data: z.object({
    separator: z.boolean().default(true).optional(),
    title: z.string(),
    testimonials: z.array(
      z.object({
        name: z.string(),
        position: z.string(),
        company: z.string(),
        image: z.object({
          alt: z.string(),
          src: z.string(),
          width: z.number(),
          height: z.number(),
        }),
        testimonial: z.string(),
      }),
    ),
  }),
});

export type Type = z.infer<typeof Schema>;

export const TEST_DATA: Type["data"] = {
  separator: true,
  title: "Client Testimonials",
  testimonials: [
    {
      name: "Name Here",
      position: "Position",
      company: "Company Name",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu tincidunt libero. Vivamus odio est, malesuada eu sapien id, scelerisque vehicula lacus. Pellentesque pretium viverra lorem, sed iaculis ex feugiat non.",
      image: {
        alt: "Image of Image",
        src: "/assets/logo_GHG.png",
        width: 170,
        height: 170,
      },
    },
    {
      name: "Name Here",
      position: "Position",
      company: "Company Name",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu tincidunt libero. Vivamus odio est, malesuada eu sapien id, scelerisque vehicula lacus. Pellentesque pretium viverra lorem, sed iaculis ex feugiat non.",
      image: {
        alt: "Image of Image",
        src: "/assets/logo_GHG.png",
        width: 170,
        height: 170,
      },
    },
    {
      name: "Name Here",
      position: "Position",
      company: "Company Name",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu tincidunt libero. Vivamus odio est, malesuada eu sapien id, scelerisque vehicula lacus. Pellentesque pretium viverra lorem, sed iaculis ex feugiat non.",
      image: {
        alt: "Image of Image",
        src: "/assets/logo_GHG.png",
        width: 170,
        height: 170,
      },
    },
    {
      name: "Name Here",
      position: "Position",
      company: "Company Name",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu tincidunt libero. Vivamus odio est, malesuada eu sapien id, scelerisque vehicula lacus. Pellentesque pretium viverra lorem, sed iaculis ex feugiat non.",
      image: {
        alt: "Image of Image",
        src: "/assets/logo_GHG.png",
        width: 170,
        height: 170,
      },
    },
  ],
};
