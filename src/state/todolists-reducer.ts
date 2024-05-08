import {v1} from "uuid";
import {todolistId1, todolistId2} from "./tasks-reducer";

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        todolistId: string
        title: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        todolistId: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        todolistId: string
        filter: FilterType
    }
}

export type DeleteTodolistActionType = {
    type: 'DELETE-TODOLIST'
    payload: {
        todolistId: string
    }
}

export type TodolistsActionType =
    ChangeTodolistTitleActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | DeleteTodolistActionType

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed'

export const initialTodolistsState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state:TodolistType[] = [] , action: TodolistsActionType): TodolistType[] => {
    switch (action.type) {
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(todo => todo.id === action.payload.todolistId ? {
                ...todo,
                title: action.payload.title
            } : todo)
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistType = {
                id: action.payload.todolistId,
                title: action.payload.title,
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
        default: return state
    }

}

export const changeTodolistTitleAC = (title: string, todoId: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", payload: {todolistId: todoId, title}} as const
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", payload: {title, todolistId: v1()}} as const
}

export const changeTodolistFilterAC = (filter: FilterType, todoId: string): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", payload: {todolistId: todoId, filter}} as const
}

export const removeTodolistAC = (todoId: string): DeleteTodolistActionType => {
    return {type: "DELETE-TODOLIST", payload: {todolistId: todoId}} as const
}