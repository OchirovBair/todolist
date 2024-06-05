import {todolistsAPI} from "../../api/todolistsAPI";
import {useEffect, useState} from "react";


const meta = {
    title: 'API/Todolists',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

export default meta;

export const GetTodolist = () => {
    const [state, setState] = useState<any>()
    useEffect(() => {
       todolistsAPI.getTodolists()
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

export const CreateTodolist = () => {
    const [state, setState] = useState<any>()
    useEffect(() => {
       todolistsAPI.createTodolist('new')
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

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>()
    const todolistId = '7ab13e6e-3254-41e8-a437-53d692829ef9'
    useEffect(() => {
       todolistsAPI.removeTodolist(todolistId)
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

export const ChangeTodolistTitle = () => {
    const [state, setState] = useState<any>()
    const todolistId = 'b7979b2b-487c-4e8e-820c-3483b566ff8a'
    useEffect(() => {
       todolistsAPI.changeTodolistTitle(todolistId, 'new Title')
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
