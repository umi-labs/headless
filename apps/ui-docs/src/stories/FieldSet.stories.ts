import type { Meta, StoryObj } from '@storybook/react';
import { FieldSet } from '@umi-digital/ui';

const meta = {
    title: 'Forms/Fieldset',
    component: FieldSet,
    tags: ['autodocs'],
} satisfies Meta<typeof FieldSet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: ""
    },
};