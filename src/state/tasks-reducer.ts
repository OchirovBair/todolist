import {
    AddTodolistActionType,
    ClearTodolistsDataActionType,
    RemoveTodolistActionType,
    SetTodolistActionType
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskResponseType} from "../api/todolistsAPI";
import {AppRootStateType, AppThunk} from "./store";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {getTasksHandleServerAppError, handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";

export type TasksActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | ClearTodolistsDataActionType

export type DomainTaskType = TaskType & {
    entityStatus: RequestStatusType
}
export type TasksType = {
    [key: string]: DomainTaskType[]
}

export type UpdateDomainTaskType = {
    title?: string
    description?: string | null,
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string | null,
    deadline?: string | null,
    entityStatus?: RequestStatusType
}

export const tasksReducer = (state: TasksType = {}, action: TasksActionType): TasksType => {
    switch (action.type) {
        case "SET-TASKS": {
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks.map(task => ({...task, entityStatus: 'idle'}))
            }
        }
        case "ADD-TASK":
            const newTask: DomainTaskType = {...action.payload.task, entityStatus: 'idle'}
            return {...state, [action.payload.task.todoListId]: [newTask, ...state[action.payload.task.todoListId]]}
        case "DELETE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(task => task.id === action.payload.taskId
                        ? {...task, ...action.payload.model}
                        : task)
            }
        }
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolist.id]: []}
        case "DELETE-TODOLIST":
            const newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        case "SET-TODOLIST": {
            const allTasks: TasksType = {}
            action.payload.todolists.forEach(todo => allTasks[todo.id] = [])
            return allTasks
        }
        case "CLEAR-TODOS-DATA":
            return {}
        default:
            return state
    }
}


export const addTaskAC = (task: TaskType) =>
    ({type: "ADD-TASK", payload: {task}} as const)
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: "DELETE-TASK", payload: {taskId, todolistId}} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskType, todolistId: string) =>
    ({type: "UPDATE-TASK", payload: {model, taskId, todolistId}} as const)
export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
    ({type: 'SET-TASKS', payload: {tasks, todolistId}} as const)


export const getTasksTC = (todolistId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistsAPI.getTasks(todolistId)
        if (res.data.error === null) {

            dispatch(setTasksAC(res.data.items, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            getTasksHandleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        if (e instanceof AxiosError) {
            handleServerNetworkError(dispatch, e);
        } else {
            handleServerNetworkError(dispatch, {message: 'Unknown error occurred'});
        }
    }


}
export const addTaskTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistsAPI.createTask(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        if (e instanceof AxiosError) {
            handleServerNetworkError(dispatch, e);
        } else {
            handleServerNetworkError(dispatch, {message: 'Unknown error occurred'});
        }
    }
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(updateTaskAC(taskId, {entityStatus: 'loading'}, todolistId))
        dispatch(setAppStatusAC('loading'))
        const res = await todolistsAPI.removeTask(todolistId, taskId)
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
        dispatch(updateTaskAC(taskId, {entityStatus: 'idle'}, todolistId))
    } catch (e) {
        if (e instanceof AxiosError) {
            handleServerNetworkError(dispatch, e);
        } else {
            handleServerNetworkError(dispatch, {message: 'Unknown error occurred'});
        }
        dispatch(updateTaskAC(taskId, {entityStatus: 'failed'}, todolistId))
    }

}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(updateTaskAC(taskId, {entityStatus: 'loading'}, todolistId))
            dispatch(setAppStatusAC('loading'))
            const tasks = getState().tasks
            const task = tasks[todolistId].find(t => t.id === taskId)
            if (task) {
                const apiModel: UpdateTaskResponseType = {
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline,
                    status: task.status,
                    ...domainModel
                }
                const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel)
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, apiModel, todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            }
            dispatch(updateTaskAC(taskId, {entityStatus: 'idle'}, todolistId))
        } catch (e) {
            if (e instanceof AxiosError) {
                handleServerNetworkError(dispatch, e);
            } else {
                handleServerNetworkError(dispatch, {message: 'Unknown error occurred'});
            }
            dispatch(updateTaskAC(taskId, {entityStatus: 'failed'}, todolistId))
        }
    }




