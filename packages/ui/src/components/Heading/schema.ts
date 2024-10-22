import React from "react";
import { z } from "zod";

export const Schema = z.object({
  children: z.string(),
  variant: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).default("h1"),
  classNames: z.string().optional(),
});

export type Type = z.infer<typeof Schema>;
