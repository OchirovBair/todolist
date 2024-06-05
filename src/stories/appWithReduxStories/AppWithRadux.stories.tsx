import type {Meta, StoryObj} from '@storybook/react';
import App from "../../app/App";
import {ReduxStoreProviderDecorator} from "../ReduxStoreProviderDecorator";

const meta = {
  title: 'TODOLIST/App',
  component: App,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator]
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof App>;

export const AppWithReduxStory: Story = {}
