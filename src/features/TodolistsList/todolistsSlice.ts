import {todolistsAPI, TodolistType} from "api/todolistsAPI";
import {AppThunk} from "app/store";
import {appActions, RequestStatusType} from "app/appSlice";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {AxiosError} from "axios";
import {getTasksTC} from "features/TodolistsList/tasksSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomainType[],
    reducers: {
        addTodolist(state, action: PayloadAction<{ todolist: TodolistType }>) {
            const newTodolist: TodolistDomainType = {...action.payload.todolist, entityStatus: "idle", filter: "all",}
            state.unshift(newTodolist)
        },
        removeTodolist(state, action: PayloadAction<{ todoId: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todoId)
            if (index !== -1) {
                state.splice(index, 1)
            }
        },
        changeTodolistTitle(state, action: PayloadAction<{ title: string, todoId: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todoId)
            state[index].title = action.payload.title
        },
        changeTodolistFilter(state, action: PayloadAction<{ filter: FilterType, todoId: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todoId)
            state[index].filter = action.payload.filter
        },
        setTodolists(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            action.payload.todolists.forEach((tl) => {
                state.push({...tl, filter: "all", entityStatus: "idle"});
            });
        },
        setEntityTodolistStatus(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.entityStatus
        },
        clearTodolistsData(state, action) {
            state.splice(0)
        },
    }
})

export const getTodolistsTC = (): AppThunk => async (dispatch) => {
    try {
        const res = await todolistsAPI.getTodolists();
        dispatch(todolistsActions.setTodolists({todolists: res.data}));
        dispatch(appActions.setAppStatus({status: "succeeded"}));
        res.data.forEach((todo) => {
            dispatch(getTasksTC(todo.id));
        });
    } catch (e) {
        if (e instanceof AxiosError) {
            handleServerNetworkError(dispatch, e);
        } else {
            handleServerNetworkError(dispatch, {message: "Unknown error occurred"});
        }
    }
};
export const addTodolistTC =
    (title: string): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(appActions.setAppStatus({status: "loading"}));
                const res = await todolistsAPI.createTodolist(title);
                if (res.data.resultCode === 0) {
                    dispatch(todolistsActions.addTodolist({todolist: res.data.data.item}));
                    dispatch(appActions.setAppStatus({status: "succeeded"}));
                } else {
                    handleServerAppError(dispatch, res.data);
                }
            } catch (e) {
                if (e instanceof AxiosError) {
                    handleServerNetworkError(dispatch, e);
                } else {
                    handleServerNetworkError(dispatch, {message: "Unknown error occurred"});
                }
            }
        };
export const removeTodolistTC =
    (todolistId: string): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(todolistsActions.setEntityTodolistStatus({todolistId , entityStatus: "loading"}));
                dispatch(appActions.setAppStatus({status: "loading"}));
                const res = await todolistsAPI.removeTodolist(todolistId);
                if (res.data.resultCode === 0) {
                    dispatch(todolistsActions.removeTodolist({todoId: todolistId}));
                    dispatch(appActions.setAppStatus({status: "succeeded"}));
                } else {
                    handleServerAppError(dispatch, res.data);
                }
                dispatch(todolistsActions.setEntityTodolistStatus({todolistId , entityStatus: "idle"}));
            } catch (e) {
                if (e instanceof AxiosError) {
                    handleServerNetworkError(dispatch, e);
                } else {
                    handleServerNetworkError(dispatch, {message: "Unknown error occurred"});
                }
                dispatch(todolistsActions.setEntityTodolistStatus({todolistId , entityStatus: "failed"}));
            }
        };
export const changeTodolistTitleTC =
    (todolistId: string, title: string): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(todolistsActions.setEntityTodolistStatus({todolistId , entityStatus: "loading"}));
                dispatch(appActions.setAppStatus({status: "loading"}));
                const res = await todolistsAPI.changeTodolistTitle(todolistId, title);
                if (res.data.resultCode === 0) {
                    dispatch(todolistsActions.changeTodolistTitle({title, todoId: todolistId}));
                    dispatch(appActions.setAppStatus({status: "succeeded"}));
                    dispatch(todolistsActions.setEntityTodolistStatus({todolistId , entityStatus: "idle"}));
                } else {
                    handleServerAppError(dispatch, res.data);
                }
            } catch (e) {
                if (e instanceof AxiosError) {
                    handleServerNetworkError(dispatch, e);
                } else {
                    handleServerNetworkError(dispatch, {message: "Unknown error occurred"});
                }
                dispatch(todolistsActions.setEntityTodolistStatus({todolistId , entityStatus: "failed"}));
            }
        };

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsName = slice.name


//types
export type TodolistDomainType = TodolistType & {
    filter: FilterType;
    entityStatus: RequestStatusType;
};
export type FilterType = "all" | "active" | "completed";
