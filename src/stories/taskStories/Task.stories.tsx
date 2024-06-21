import type {Meta, StoryObj} from '@storybook/react';
import {TaskUseStateOrReducer} from "../../trash/TaskUseStateOrReducer";
import {fn} from "@storybook/test";
import {useState} from "react";
import {TaskPriorities, TaskStatuses} from "../../api/todolistsAPI";

const meta = {
    title: 'TODOLIST/TaskUseStateOrReducer',
    component: TaskUseStateOrReducer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        task: {id: 'ada', title: 'JS', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
            todoListId: 'todolistId2', startDate: '', description: '', priority: TaskPriorities.Low},
        removeTask: fn(),
        changeTaskStatus: fn(),
        changeTaskTitle: fn(),
        todoId: 'aaa'
    }
} satisfies Meta<typeof TaskUseStateOrReducer>;

export default meta;
type Story = StoryObj<typeof TaskUseStateOrReducer>;

export const TaskIsNotDoneStory: Story = {}

export const TaskIsDoneStory: Story = {
    args: {
        task: {id: 'adaad', title: 'CSS', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
            todoListId: 'todolistId2', startDate: '', description: '', priority: TaskPriorities.Low},
    }
}

export const TaskToggleStory: Story = {
    render: (args) => {
        const [task, setTask] = useState( {id: 'ada', title: 'JS', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
            todoListId: 'todolistId2', startDate: '', description: '', priority: TaskPriorities.Low})

        const changeTaskStatus = () => {
            setTask({...task, status: task.status === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New})
        }

        const changeTaskTitle = (title: string) => {
            setTask({...task, title: title})
        }

        return <TaskUseStateOrReducer
            task={task}
            removeTask={args.removeTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            todoId={'aaa'}/>
    }
}
