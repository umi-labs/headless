import type { Meta, StoryObj } from "@storybook/react";
import CTATitleImage from "../component";
import { TEST_DATA } from "../schema";

const meta = {
  title: "blocks/CTATitleImage",
  component: CTATitleImage,
  argTypes: {},
} satisfies Meta<typeof CTATitleImage>;

export default meta;

type Story = StoryObj<typeof CTATitleImage>;

export const Primary: Story = {
  args: {
    data: TEST_DATA,
  },
};
