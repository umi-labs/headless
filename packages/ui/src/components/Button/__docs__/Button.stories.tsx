import type { Meta, StoryObj } from "@storybook/react";
import Button from "../component";

const meta = {
  title: "Basics/Button",
  component: Button,
  argTypes: {
    variant: {
      options: ["primary", "secondary", "tertiary"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Click Me",
    variant: "primary",
    onClick: () => console.log("Button Clicked"),
  },
};
