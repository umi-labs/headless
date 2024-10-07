import type { Meta, StoryObj } from "@storybook/react";
import Example from "./example";

const meta: Meta<typeof Example> = {
  title: "FIELDSET",
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Primary: Story = {
  args: {
    text: "FIELDSET",
    primary: true,
    disabled: false,
    size: "small",
    onClick: () => console.log("FIELDSET"),
  },
};
export const Secondary: Story = {
  args: {
    text: "FIELDSET",
    primary: false,
    disabled: false,
    size: "small",
    onClick: () => console.log("FIELDSET"),
  },
};
