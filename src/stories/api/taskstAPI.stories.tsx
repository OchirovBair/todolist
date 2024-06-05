import {TaskPriorities, TaskStatuses, todolistsAPI, UpdateTaskResponseType} from "../../api/todolistsAPI";
import {useEffect, useState} from "react";


const meta = {
    title: 'API/Tasks',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

export default meta;

export const GetTasks = () => {
    const [state, setState] = useState<any>()
    const todolistId = 'e325fc8d-4761-45ee-96c3-548578b0e892'

    useEffect(() => {
       todolistsAPI.getTasks(todolistId)
            .then(res => {
                setState((res.data))
        })
            .catch((err)=> {
                setState(err)
            })
    }, []);

    return (
        <div>{JSON.stringify(state)}</div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>()
    const todolistId = 'fa41ee56-4716-488d-ad9b-0f27923734bc'

    useEffect(() => {
       todolistsAPI.createTask(todolistId,'New TaskUseStateOrReducer')
            .then(res => {
                setState((res.data.data.item))
        })
            .catch((err)=> {
                setState(err)
            })
    }, []);

    return (
        <div>{JSON.stringify(state)}</div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>()
    const todolistId = 'fa41ee56-4716-488d-ad9b-0f27923734bc'
    const taskId = '09d83649-e83a-4a95-ab5e-bba7571395e4'
    useEffect(() => {
       todolistsAPI.removeTask(todolistId, taskId)
            .then(res => {
                console.log(res.data)
                setState((res.data))
        })
            .catch((err)=> {
                setState(err)
            })
    }, []);

    return (
        <div>{JSON.stringify(state)}</div>
    )
}

export const ChangeTaskTitle = () => {
    const [state, setState] = useState<any>()
    const todolistId = 'fa41ee56-4716-488d-ad9b-0f27923734bc'
    const taskId = '4016340a-ee84-4be8-b792-82945ac3979d'

    useEffect(() => {
        const model: UpdateTaskResponseType = {
            title: 'new Title 2',
            deadline: '',
            description: '',
            priority: TaskPriorities.Low,
            status: TaskStatuses.New,
            startDate: ''
        }
       todolistsAPI.updateTask(todolistId, taskId, model)
            .then(res => {
                console.log(res.data)
                setState((res.data.data.item))
        })
            .catch((err)=> {
                setState(err)
            })
    }, []);

    return (
        <div>{JSON.stringify(state)}</div>
    )
}
