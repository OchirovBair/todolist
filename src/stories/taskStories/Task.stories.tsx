import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "../../task/Task";
import {fn} from "@storybook/test";
import {useState} from "react";
import {TaskPriorities, TaskStatuses} from "../../api/todolistsAPI";

const meta = {
    title: 'TODOLIST/Task',
    component: Task,
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
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof Task>;

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

        return <Task
            task={task}
            removeTask={args.removeTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            todoId={'aaa'}/>
    }
}
