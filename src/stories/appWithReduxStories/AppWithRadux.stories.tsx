import type {Meta, StoryObj} from '@storybook/react';
import AppWithRedux from "../../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../../state/store";
import {ReduxStoreProviderDecorator} from "../ReduxStoreProviderDecorator";

const meta = {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator]
} satisfies Meta<typeof AppWithRedux>;

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {}
