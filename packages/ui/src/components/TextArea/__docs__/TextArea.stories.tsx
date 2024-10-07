import type { Meta, StoryObj } from "@storybook/react";
import Example from "./example";

const meta: Meta<typeof Example> = {
  title: "TextArea",
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Primary: Story = {
  args: {
    text: "TextArea",
    primary: true,
    disabled: false,
    size: "small",
    onClick: () => console.log("TextArea"),
  },
};
export const Secondary: Story = {
  args: {
    text: "TextArea",
    primary: false,
    disabled: false,
    size: "small",
    onClick: () => console.log("TextArea"),
  },
};
