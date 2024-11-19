import type { Meta, StoryObj } from "@storybook/react";
import SlidingContent from "../component";
import { TEST_DATA } from "../schema";

const meta = {
  title: "blocks/SlidingContent",
  component: SlidingContent,
  argTypes: {

  },
} satisfies Meta<typeof SlidingContent>;

export default meta;

type Story = StoryObj<typeof SlidingContent>;

export const Primary: Story = {
  args: {
    data: TEST_DATA,
  },
};

