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
                id: action.payload.todolist.id,
                title: action.payload.todolist.title,
                order: action.payload.todolist.order,
                addedDate: action.payload.todolist.addedDate,
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


export const changeTodolistTitleAC = (title: string, todoId: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", payload: {todolistId: todoId, title}} as const)

export const addTodolistAC = (todolist: TodolistType) =>
    ({type: "ADD-TODOLIST", payload: {todolist}} as const)

export const changeTodolistFilterAC = (filter: FilterType, todoId: string) =>
    ({type: "CHANGE-TODOLIST-FILTER", payload: {todolistId: todoId, filter}} as const)

export const removeTodolistAC = (todoId: string) =>
    ({type: "DELETE-TODOLIST", payload: {todolistId: todoId}} as const)


export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: "SET-TODOLIST", payload: {todolists}} as const)

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.removeTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.changeTodolistTitle(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(title, todolistId))
        })
}

