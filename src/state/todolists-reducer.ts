import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolistsAPI";
import {Dispatch} from "redux";

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>

export type TodolistDomainType = TodolistType & {
    filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'

export type TodolistsActionType =
    | ReturnType<typeof changeTodolistTitleAC>
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistFilterAC>
    | RemoveTodolistActionType
    | SetTodolistActionType


export const initialTodolistsState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialTodolistsState, action: TodolistsActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLIST": {
            return action.payload.todolists.map(todo => ({...todo, filter: 'all'}))
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(todo => todo.id === action.payload.todolistId
                ? {
                    ...todo,
                    title: action.payload.title
                }
                : todo)
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistDomainType = {
                id: action.payload.todolistId,
                title: action.payload.title,
                order: 0,
                addedDate: '',
                filter: 'all'
            }
            return [newTodolist, ...state]
        }

        case "CHANGE-TODOLIST-FILTER": {
            return state.map(todo => todo.id === action.payload.todolistId ? {
                ...todo,
                filter: action.payload.filter
            } : todo)
        }

        case "DELETE-TODOLIST": {
            return state.filter(todo => todo.id !== action.payload.todolistId)
        }
        default:
            return state
    }

}


export const changeTodolistTitleAC = (title: string, todoId: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", payload: {todolistId: todoId, title}} as const
}

export const addTodolistAC = (title: string) => {
    return {type: "ADD-TODOLIST", payload: {title, todolistId: v1()}} as const
}

export const changeTodolistFilterAC = (filter: FilterType, todoId: string) => {
    return {type: "CHANGE-TODOLIST-FILTER", payload: {todolistId: todoId, filter}} as const
}

export const removeTodolistAC = (todoId: string) => {
    return {type: "DELETE-TODOLIST", payload: {todolistId: todoId}} as const
}

export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: "SET-TODOLIST", payload: {todolists}} as const
}

export const fetchTodolistsTC = () => {

    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

