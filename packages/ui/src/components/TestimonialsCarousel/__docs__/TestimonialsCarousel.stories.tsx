import type { Meta, StoryObj } from "@storybook/react";
import TestimonialsCarousel from "../component";
import { TEST_DATA } from "../schema";

const meta = {
  title: "blocks/TestimonialsCarousel",
  component: TestimonialsCarousel,
  argTypes: {},
} satisfies Meta<typeof TestimonialsCarousel>;

export default meta;

type Story = StoryObj<typeof TestimonialsCarousel>;

export const Primary: Story = {
  args: {
    data: TEST_DATA,
  },
};
