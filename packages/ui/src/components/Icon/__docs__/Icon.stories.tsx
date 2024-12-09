import type { Meta, StoryObj } from "@storybook/react";
import Icon from "../component";

const meta = {
  title: "global/Icon",
  component: Icon,
  argTypes: {
    type: {
      options: [
        "eye",
        "rocket",
        "check",
        "check-circle",
        "instagram",
        "twitter",
        "caret-down",
        "caret-up",
        "caret-left",
        "caret-right",
      ],
      control: { type: "select" },
    },
    weight: {
      options: ["thin", "light", "regular", "bold", "duotone", "fill"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof Icon>;

export const Regular: Story = {
  args: {
    type: "check-circle",
    weight: "regular",
  },
};
export const Thin: Story = {
  args: {
    type: "check-circle",
    weight: "thin",
  },
};
export const Light: Story = {
  args: {
    type: "check-circle",
    weight: "light",
  },
};
export const Bold: Story = {
  args: {
    type: "check-circle",
    weight: "bold",
  },
};
export const Duotone: Story = {
  args: {
    type: "check-circle",
    weight: "duotone",
  },
};
export const Fill: Story = {
  args: {
    type: "check-circle",
    weight: "fill",
  },
};
