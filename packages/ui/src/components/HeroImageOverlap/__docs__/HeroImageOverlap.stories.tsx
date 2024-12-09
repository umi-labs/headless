import type { Meta, StoryObj } from "@storybook/react";
import HeroImageOverlap from "../component";
import { TEST_DATA } from "../schema";

const meta = {
  title: "heros/HeroImageOverlap",
  component: HeroImageOverlap,
  argTypes: {},
} satisfies Meta<typeof HeroImageOverlap>;

export default meta;

type Story = StoryObj<typeof HeroImageOverlap>;

export const Primary: Story = {
  args: {
    data: TEST_DATA,
  },
};
