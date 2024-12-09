import { z } from "zod";
import { ButtonSchema, ImageSchema } from "../../lib/generic-schemas.ts";

export const Schema = z.object({
  data: z.object({
    subtitle: z.string(),
    title: z.string(),
    content: z.string(),
    button: ButtonSchema,
    image: ImageSchema,
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
