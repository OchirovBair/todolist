import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";

const meta = {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: 'Some title',
    changeTitleHandler: fn()
  },
} satisfies Meta<typeof EditableSpan>;

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {}
