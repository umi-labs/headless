import type { Meta, StoryObj } from "@storybook/react";
import Heading from "../Heading";

const meta = {
  title: "Basics/Heading",
  component: Heading,
  argTypes: {
    variant: {
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof Heading>;

export const H1: Story = {
  args: {
    variant: "h1",
  },
};
