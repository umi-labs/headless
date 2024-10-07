import type { Meta, StoryObj } from '@storybook/react';
import { Input } from "@umi-digital/ui"

const meta = {
    title: 'Forms/Input',
    component: Input,
    tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        id: 'input',
        name: 'input',
        type: 'text',
        value: '',
        onChange: () => { },
        classNames: '',
        register: (_id: string) => ({}),
    },
};