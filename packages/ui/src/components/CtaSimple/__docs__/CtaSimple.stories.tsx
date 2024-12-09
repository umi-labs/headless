import type { Meta, StoryObj } from "@storybook/react";
import CTASimple from "../component";
import { TEST_DATA } from "../schema";

const meta = {
  title: "blocks/CTASimple",
  component: CTASimple,
  argTypes: {},
} satisfies Meta<typeof CTASimple>;

export default meta;

type Story = StoryObj<typeof CTASimple>;

export const Primary: Story = {
  args: {
    data: TEST_DATA,
  },
};

export const NoBuffers: Story = {
  args: {
    data: { ...TEST_DATA, topBuffer: false, bottomBuffer: false },
  },
};
