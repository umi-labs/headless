import type { Meta, StoryObj } from "@storybook/react";
import Hero1 from "../component";
import { TEST_DATA } from "../schema";

const meta = {
  title: "Heros/Hero One",
  component: Hero1,
  argTypes: {
    textAlignHoz: {
      options: ["left", "center", "right"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Hero1>;

export default meta;

type Story = StoryObj<typeof Hero1>;

export const Primary: Story = {
  args: {
    data: TEST_DATA,
  },
};

export const Secondary: Story = {
  args: {
    data: TEST_DATA,
    textAlignHoz: "left",
  },
};
