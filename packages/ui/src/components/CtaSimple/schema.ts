import { z } from "zod";

export const Schema = z.object({
  data: z.object({
    subtitle: z.string(),
    title: z.string(),
    content: z.string(),
    button: z.object({
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
    image: z.object({
      alt: z.string(),
      src: z.string(),
      width: z.number(),
      height: z.number(),
    }),
    bottomBuffer: z.boolean().default(true).optional(),
    topBuffer: z.boolean().default(true).optional(),
  }),
});

export type Type = z.infer<typeof Schema>;

export const TEST_DATA: Type["data"] = {
  topBuffer: true,
  bottomBuffer: true,
  subtitle: "EBOOK",
  title: "The Direct Booking Strategy for Hotels",
  content:
    "The step-by-step blueprint for increasing your direct bookings and reducing your OTA fees!",
  button: {
    title: "Download Now",
    link: "https://www.google.com",
    type: "secondary",
  },
  image: {
    src: "/assets/lead-magnet-lookup.png",
    alt: "The Direct Booking Strategy for Hotels ebook",
    width: 275,
    height: 340,
  },
};
