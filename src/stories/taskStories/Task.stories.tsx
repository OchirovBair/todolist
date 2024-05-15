import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "../../task/Task";
import {TaskType} from "../../state/tasks-reducer";
import {fn} from "@storybook/test";
import {useState} from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'TODOLIST/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        task: {id: 'ada', isDone: false, title: 'JS'},
        removeTask: fn(),
        changeTaskStatus: fn(),
        changeTaskTitle: fn(),
        todoId: 'aaa'
    }
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskIsNotDoneStory: Story = {}

export const TaskIsDoneStory: Story = {
    args: {
        task: {id: 'adaad', isDone: true, title: 'CSS'},
    }
}

export const TaskToggleStory: Story = {
    render: (args) => {
        const [task, setTask] = useState( {id: 'ada', isDone: false, title: 'JS'})

        const changeTaskStatus = () => {
            setTask({...task, isDone: !task.isDone})
        }

        const changeTaskTitle = (title: string) => {
            setTask({...task, title: title})
        }

        return <Task
            task={task}
            removeTask={args.removeTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            todoId={'aaa'}/>
    }
}
