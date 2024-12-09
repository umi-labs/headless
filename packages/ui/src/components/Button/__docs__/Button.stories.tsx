import type { Meta, StoryObj } from "@storybook/react";
import Button from "../component";

const meta = {
  title: "global/Button",
  component: Button,
  argTypes: {
    variant: {
      options: [
        "default",
        "link",
        "outline",
        "destructive",
        "secondary",
        "ghost",
      ],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "default",
    children: "Click Me",
  },
};
