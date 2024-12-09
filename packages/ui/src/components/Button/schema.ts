import { z } from "zod";
import { ButtonSchema } from "../../lib/generic-schemas.ts";

export const Schema = ButtonSchema;

export type Type = z.infer<typeof Schema>;
