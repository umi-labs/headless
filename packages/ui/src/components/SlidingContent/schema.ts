import { z } from "zod";

export const Schema = z.object({
  data: z.object({
    sectionTitle: z.string(),
    sectionCaption: z.string(),
    cards: z.array(
      z.object({
        cardTitle: z.string(),
        cardContent: z.array(
          z.object({
            _type: z.string(),
            children: z.array(
              z.object({
                _type: z.string(),
                text: z.string(),
                marks: z.array(z.string()).optional(),
              })
            ),
            style: z.string().optional(),
          })
        ).min(4),
      })
    ),
  }),
});


export type Type = z.infer<typeof Schema>;

export const TEST_DATA: Type["data"] = {
  sectionTitle: "Application process",
  sectionCaption:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat, ipsum ac auctor ornare, nunc ligula scelerisque eros.",
  cards: [
    {
      cardTitle: "Register",
      cardContent: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Sign up on our platform to get started.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      cardTitle: "Apply",
      cardContent: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Complete the application form with the required details.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      cardTitle: "Review",
      cardContent: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Our team will review your application and get back to you.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      cardTitle: "Final Review",
      cardContent: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Our team will review your application and get back to you.",
              marks: [],
            },
          ],
        },
      ],
    },
  ],
};

