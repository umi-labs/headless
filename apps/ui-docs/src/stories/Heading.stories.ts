import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from "@umi-digital/ui"

const meta = {
    title: 'Basics/Heading',
    component: Heading,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            control: { type: 'select' },
        },
        children: {
            control: { type: 'text' },
        },
        classNames: {
            control: { type: 'text' },
        },
    },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
    name: 'H1',
    args: {
        variant: 'h1',
        children: 'Heading',
        classNames: '',
    },
};

export const H2: Story = {
    name: 'H2',
    args: {
        variant: 'h2',
        children: 'Heading',
        classNames: '',
    },
};

export const H3: Story = {
    name: 'H3',
    args: {
        variant: 'h3',
        children: 'Heading',
        classNames: '',
    },
};

export const H4: Story = {
    name: 'H4',
    args: {
        variant: 'h4',
        children: 'Heading',
        classNames: '',
    },
};

export const H5: Story = {
    name: 'H5',
    args: {
        variant: 'h5',
        children: 'Heading',
        classNames: '',
    },
};

export const H6: Story = {
    name: 'H6',
    args: {
        variant: 'h6',
        children: 'Heading',
        classNames: '',
    },
};