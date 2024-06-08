import {todolistsAPI, TodolistType} from "../api/todolistsAPI";
import {AppThunk} from "./store";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>

export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}
export type FilterType = 'all' | 'active' | 'completed'

export type TodolistsActionType =
    | ReturnType<typeof changeTodolistTitleAC>
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistFilterAC>
    | RemoveTodolistActionType
    | SetTodolistActionType
    | ReturnType<typeof setEntityTodolistStatusAC>


export const initialTodolistsState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialTodolistsState, action: TodolistsActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-ENTITY-TODOLIST-STATUS":
            return state.map(todo => todo.id === action.payload.todolistId ? {
                ...todo,
                entityStatus: action.payload.entityStatus
            } : todo)
        case "SET-TODOLIST": {
            return action.payload.todolists.map(todo => ({...todo, filter: 'all', entityStatus: "idle"}))
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
                entityStatus: "idle",
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
export const setEntityTodolistStatusAC = (todolistId: string, entityStatus: RequestStatusType) => ({
    type: 'SET-ENTITY-TODOLIST-STATUS',
    payload: {
        todolistId,
        entityStatus
    }
} as const)


export const getTodolistsTC = (): AppThunk => async (dispatch) => {
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}
export const addTodolistTC = (title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }

    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }

}
export const removeTodolistTC = (todolistId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setEntityTodolistStatusAC(todolistId, 'loading'))
        dispatch(setAppStatusAC('loading'))
        const res = await todolistsAPI.removeTodolist(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setEntityTodolistStatusAC(todolistId, 'loading'))
        dispatch(setAppStatusAC('loading'))
        const res = await todolistsAPI.changeTodolistTitle(todolistId, title)
        if (res.data.resultCode === 0) {

            dispatch(changeTodolistTitleAC(title, todolistId))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setEntityTodolistStatusAC(todolistId, 'idle'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}

