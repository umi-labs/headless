import type { Meta, StoryObj } from "@storybook/react";
import Hero1 from "../Hero_1";
import { TEST_DATA } from "./example";

const meta = {
  title: "Heros/Hero One",
  component: Hero1,
  argTypes: {},
} satisfies Meta<typeof Hero1>;

export default meta;

type Story = StoryObj<typeof Hero1>;

export const Primary: Story = {
  args: {
    data: TEST_DATA,
  },
};
