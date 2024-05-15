import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {action} from '@storybook/addon-actions'
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBox from '@mui/icons-material/AddBox';
import {ChangeEvent, KeyboardEvent, useState} from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    addItem: {
      description: 'some description'
    }
  },
  args: { addItem: fn() },
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormStory: Story = {}

export const AddItemFormStory1 = () => <AddItemForm addItem={action('addItem')}/>

export const AddItemFormErrorStory: Story = {
  render: (args) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>("Title is required")

    const addItem = () => {
      if (title.trim() !== "") {
        args.addItem(title);
        setTitle("");
      } else {
        setError("Title is required");
      }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
        setError(null);
      }
      if (e.charCode === 13) {
        addItem();
      }
    }
    return <div>
      <TextField variant="outlined"
                 error={!!error}
                 value={title}
                 onChange={onChangeHandler}
                 onKeyPress={onKeyPressHandler}
                 label="Title"
                 helperText={error}
      />
      <IconButton color="primary" onClick={addItem}>
        <AddBox />
      </IconButton>
    </div>
  }
}