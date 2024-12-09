import type { Meta, StoryObj } from "@storybook/react";
import BlogGrid from "../component";
import { TEST_DATA } from "../schema";

const meta = {
  title: "blocks/BlogGrid",
  component: BlogGrid,
  argTypes: {},
} satisfies Meta<typeof BlogGrid>;

export default meta;

type Story = StoryObj<typeof BlogGrid>;

export const Primary: Story = {
  args: {
    data: TEST_DATA,
  },
};
