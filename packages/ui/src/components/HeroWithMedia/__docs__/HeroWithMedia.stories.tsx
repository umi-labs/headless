import type { Meta, StoryObj } from "@storybook/react";
import HeroWithMedia from "../component";
import { TEST_DATA } from "../schema";

const meta = {
  title: "heros/HeroWithMedia",
  component: HeroWithMedia,
  argTypes: {},
} satisfies Meta<typeof HeroWithMedia>;

export default meta;

type Story = StoryObj<typeof HeroWithMedia>;

export const Primary: Story = {
  args: {
    data: TEST_DATA,
  },
};
