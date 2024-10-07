import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@umi-digital/ui';

const meta = {
    title: 'Basics/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'tertiary'],
            control: { type: 'select' },
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        label: 'Button',
        onClick: () => { },
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        label: 'Button',
        onClick: () => { },
    },
};

export const Tertiary: Story = {
    args: {
        variant: 'tertiary',
        label: 'Button',
        onClick: () => { },
    },
};
