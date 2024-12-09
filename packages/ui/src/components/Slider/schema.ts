import { z } from "zod";

export const Schema = z.object({
  data: z.object({
    slides: z.array(
      z.object({
        title: z.string(),
      }),
    ),
  }),
});

export type Type = z.infer<typeof Schema>;

export const TEST_DATA: Type["data"] = {
  slides: [{ title: "Test 1" }, { title: "Test 2" }, { title: "Test 3" }],
};
