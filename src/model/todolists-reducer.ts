import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

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

export type ActionType = ChangeTodolistTitleActionType | AddTodolistActionType | ChangeTodolistFilterActionType | DeleteTodolistActionType
export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "CHANGE-TODOLIST-TITLE":
            return state.map(todo => todo.id === action.payload.todolistId ? {...todo, title:action.payload.title} : todo)
        case "ADD-TODOLIST":
            const newTodolist:TodolistType = {id: v1(), title: action.payload.title, filter: 'all'}
            return [newTodolist, ...state]
        case "CHANGE-TODOLIST-FILTER":
            return state.map(todo => todo.id === action.payload.todolistId ? {...todo, filter: action.payload.filter} : todo)
        case "DELETE-TODOLIST":
            return state.filter(todo => todo.id !== action.payload.todolistId)
    }
}

export const changeTodolistTitleAC = (todoId: string, title: string):ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", payload: {todolistId: todoId, title}} as const
}

export const addTodolistAC = (title: string):AddTodolistActionType => {
    return {type:"ADD-TODOLIST", payload: {title}} as const
}

export const changeTodolistFilterAC = (filter: FilterType, todoId: string):ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", payload: {todolistId: todoId, filter}} as const
}

export const deleteTodolistAC = (todoId:string):DeleteTodolistActionType => {
    return {type: "DELETE-TODOLIST", payload: {todolistId: todoId}} as const
}