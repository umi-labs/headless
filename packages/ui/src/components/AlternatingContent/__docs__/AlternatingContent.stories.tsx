import type { Meta, StoryObj } from "@storybook/react";
import AlternatingContent from "../component";
import { TEST_DATA } from "../schema";

const meta = {
  title: "blocks/AlternatingContent",
  component: AlternatingContent,
  argTypes: {},
} satisfies Meta<typeof AlternatingContent>;

export default meta;

type Story = StoryObj<typeof AlternatingContent>;

export const Primary: Story = {
  args: {
    data: TEST_DATA,
  },
};
