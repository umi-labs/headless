import type { Meta, StoryObj } from "@storybook/react";
import CardGridSideTitle from "../component";
import { TEST_DATA } from "../schema";

const meta = {
  title: "blocks/CardGridSideTitle",
  component: CardGridSideTitle,
  argTypes: {},
} satisfies Meta<typeof CardGridSideTitle>;

export default meta;

type Story = StoryObj<typeof CardGridSideTitle>;

export const Primary: Story = {
  args: {
    data: TEST_DATA,
  },
};
