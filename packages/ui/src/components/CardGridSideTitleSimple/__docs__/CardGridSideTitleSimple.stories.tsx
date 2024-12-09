import type { Meta, StoryObj } from "@storybook/react";
import CardGridSideTitleSimple from "../component";
import { TEST_DATA } from "../schema";

const meta = {
  title: "blocks/CardGridSideTitleSimple",
  component: CardGridSideTitleSimple,
  argTypes: {},
} satisfies Meta<typeof CardGridSideTitleSimple>;

export default meta;

type Story = StoryObj<typeof CardGridSideTitleSimple>;

export const Primary: Story = {
  args: {
    data: TEST_DATA,
  },
};
