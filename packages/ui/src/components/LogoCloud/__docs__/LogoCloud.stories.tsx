import type { Meta, StoryObj } from "@storybook/react";
import LogoCloud from "../component";
import { TEST_DATA } from "../schema";

const meta = {
  title: "blocks/LogoCloud",
  component: LogoCloud,
  argTypes: {},
} satisfies Meta<typeof LogoCloud>;

export default meta;

type Story = StoryObj<typeof LogoCloud>;

export const Primary: Story = {
  args: {
    data: TEST_DATA,
  },
};
