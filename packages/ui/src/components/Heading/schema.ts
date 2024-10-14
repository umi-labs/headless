import React from "react";
import { z } from "zod";

export const HeadingSchema = z.object({
  children: z.custom<React.ReactNode>().or(z.string()),
  variant: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).default("h1"),
  classNames: z.string().optional(),
});

export type HeadingType = z.infer<typeof HeadingSchema>;
