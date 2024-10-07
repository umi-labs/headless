import type { Meta, StoryObj } from "@storybook/react";
import Example from "./example";

const meta: Meta<typeof Example> = {
  title: "Input",
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Primary: Story = {
  args: {
    text: "Input",
    primary: true,
    disabled: false,
    size: "small",
    onClick: () => console.log("Input"),
  },
};
export const Secondary: Story = {
  args: {
    text: "Input",
    primary: false,
    disabled: false,
    size: "small",
    onClick: () => console.log("Input"),
  },
};
