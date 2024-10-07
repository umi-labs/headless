import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@umi-digital/ui';

const meta = {
    title: 'Forms/Form',
    component: Button,
    tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: "Button",
        variant: "primary",
        onClick: () => { }
    },
};