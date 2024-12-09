import { z } from "zod";

export const Schema = z.object({
  data: z.object({
    separator: z.boolean().default(true).optional(),
    title: z.string(),
    description: z.string().optional(),
    content: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.object({
          src: z.string(),
          alt: z.string(),
          width: z.number(),
          height: z.number(),
        }),
      }),
    ),
  }),
});

export type Type = z.infer<typeof Schema>;

export const TEST_DATA: Type["data"] = {
  separator: true,
  title: "How it Works",
  description:
    "The Business Model Canvas (BMC) is a one page canvas made up with  9 building blocks that represent how a business or service works",
  content: [
    {
      title: "Customer Segments",
      description:
        "This building block refers to the different groups of customers that a hotel or hospitality business serves. By understanding the needs and preferences of different customer segments, a business can tailor their service offerings and marketing efforts to better meet their customers' needs.",
      image: {
        src: "/assets/hero-graphic.png",
        alt: "",
        width: 200,
        height: 200,
      },
    },
    {
      title: "Value Proposition",
      description:
        "This building block refers to the unique value that a hotel or hospitality business offers to its customers. By developing a compelling value proposition, a business can differentiate itself from competitors and better attract and retain customers.",
      image: {
        src: "/assets/hero-graphic.png",
        alt: "",
        width: 200,
        height: 200,
      },
    },
  ],
};
