import {todolistsActions} from "features/TodolistsList/todolistsSlice";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskResponseType,} from "api/todolistsAPI";
import {AppThunk} from "app/store";
import {appActions, RequestStatusType} from "app/appSlice";
import {getTasksHandleServerAppError, handleServerAppError, handleServerNetworkError,} from "utils/error-utils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksType,
    reducers: {
        addTask(state, action: PayloadAction<{ task: TaskType }>) {
            const tasks = state[action.payload.task.todoListId]
            const newTask: DomainTaskType = {...action.payload.task, entityStatus: 'idle'}
            tasks.unshift(newTask)
        },
        removeTask(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((task) => task.id === action.payload.taskId);
            if (index !== -1) {
                tasks.splice(index, 1);
            }
        },
        updateTask(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((task) => task.id === action.payload.taskId);
            if (index !== -1) {
                tasks[index] = {...tasks[index], ...action.payload.model};
            }
        },
        setTasks(state, action: PayloadAction<{ tasks: TaskType[], todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks.map(task => ({...task, entityStatus: "idle"}))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistsActions.removeTodolist, (state, action) => {
                delete state[action.payload.todoId]
            })
            .addCase(todolistsActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsActions.setTodolists, (state, action) => {
                action.payload.todolists.forEach(todo => {
                    state[todo.id] = []
                })
            })
            .addCase(todolistsActions.clearTodolistsData, (state, action) => {
                const keys = Object.keys(state)
                if (keys.length !== 0) {
                    keys.forEach(k => {
                        delete state[k]
                    })
                }
            })
    },
})

export const getTasksTC =
    (todolistId: string): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(appActions.setAppStatus({status: "loading"}));
                const res = await todolistsAPI.getTasks(todolistId);
                if (res.data.error === null) {
                    dispatch(tasksActions.setTasks({tasks: res.data.items, todolistId: todolistId}));
                    dispatch(appActions.setAppStatus({status: "succeeded"}));
                } else {
                    getTasksHandleServerAppError(dispatch, res.data);
                }
            } catch (e) {
                if (e instanceof AxiosError) {
                    handleServerNetworkError(dispatch, e);
                } else {
                    handleServerNetworkError(dispatch, {message: "Unknown error occurred"});
                }
            }
        };
export const addTaskTC =
    (todolistId: string, title: string): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(appActions.setAppStatus({status: "loading"}));
                const res = await todolistsAPI.createTask(todolistId, title);
                if (res.data.resultCode === 0) {
                    dispatch(tasksActions.addTask({task: res.data.data.item}));
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
export const removeTaskTC =
    (todolistId: string, taskId: string): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(tasksActions.updateTask({taskId, todolistId, model: {entityStatus: "loading"}}));
                dispatch(appActions.setAppStatus({status: "loading"}));
                const res = await todolistsAPI.removeTask(todolistId, taskId);
                if (res.data.resultCode === 0) {
                    dispatch(tasksActions.removeTask({taskId, todolistId}));
                    dispatch(appActions.setAppStatus({status: "succeeded"}));
                } else {
                    handleServerAppError(dispatch, res.data);
                }
                dispatch(tasksActions.updateTask({taskId, model: {entityStatus: "idle"}, todolistId}));
            } catch (e) {
                if (e instanceof AxiosError) {
                    handleServerNetworkError(dispatch, e);
                } else {
                    handleServerNetworkError(dispatch, {message: "Unknown error occurred"});
                }
                dispatch(tasksActions.updateTask({taskId, model: {entityStatus: "failed"}, todolistId}));
            }
        };
export const updateTaskTC =
    (todolistId: string, taskId: string, domainModel: UpdateDomainTaskType): AppThunk =>
        async (dispatch, getState) => {
            try {
                dispatch(tasksActions.updateTask({taskId, model: {entityStatus: "loading"}, todolistId}));
                dispatch(appActions.setAppStatus({status: "loading"}));
                const state = getState();
                const task = state.tasksName[todolistId].find((t: any) => t.id === taskId); // TODO: fix any
                if (task) {
                    const apiModel: UpdateTaskResponseType = {
                        title: task.title,
                        description: task.description,
                        priority: task.priority,
                        startDate: task.startDate,
                        deadline: task.deadline,
                        status: task.status,
                        ...domainModel,
                    };
                    const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel);
                    if (res.data.resultCode === 0) {
                        dispatch(tasksActions.updateTask({taskId, model: apiModel, todolistId}));
                        dispatch(appActions.setAppStatus({status: "succeeded"}));
                    } else {
                        handleServerAppError(dispatch, res.data);
                    }
                }
                dispatch(tasksActions.updateTask({taskId, model: {entityStatus: "idle"}, todolistId}));
            } catch (e) {
                if (e instanceof AxiosError) {
                    handleServerNetworkError(dispatch, e);
                } else {
                    handleServerNetworkError(dispatch, {message: "Unknown error occurred"});
                }
                dispatch(tasksActions.updateTask({taskId, model: {entityStatus: "failed"}, todolistId}));
            }
        };


export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksName = slice.name

//types
export type DomainTaskType = TaskType & {
    entityStatus: RequestStatusType;
};
export type TasksType = {
    [key: string]: DomainTaskType[];
};

export type UpdateDomainTaskType = {
    title?: string;
    description?: string | null;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string | null;
    deadline?: string | null;
    entityStatus?: RequestStatusType;
};