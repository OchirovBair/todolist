import axios, {AxiosResponse} from "axios";
import {LoginType} from "../features/Login/Login";


export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}


export type TaskType = {
    id: string
    title: string
    description: string | null,
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null,
    deadline: string | null,
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type ResponseType<T={}> = {
    data: T
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}
export type GetTasksResponseType = {
    error: string | null
    items: TaskType[]
    totalCount: number
}

export type UpdateTaskResponseType = {
    title: string
    description: string | null,
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null,
    deadline: string | null,
}
export type  UserType = {
    id: number
    email: string
    login: string
}


const settings = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY
    }
}


const axiosInstance = axios.create(settings)

export const todolistsAPI = {
    getTodolists () {
        return axiosInstance.get<TodolistType[]>(`/todo-lists`)
    },
    createTodolist(title: string){
        return axiosInstance.post<{}, AxiosResponse<ResponseType<{item: TodolistType}>>, {title:string}>(`/todo-lists`, {title})
    },
    removeTodolist(todolistId:string) {
        return axiosInstance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    changeTodolistTitle(todolistId:string, title: string) {
        return axiosInstance.put<{}, AxiosResponse<ResponseType<{item: TodolistType}>>, {title:string}>(`/todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return axiosInstance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string, title: string) {
        return axiosInstance.post<{}, AxiosResponse<ResponseType<{item: TaskType}>>, {title: string}>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    removeTask(todolistId:string, taskId: string) {
        return axiosInstance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId:string, taskId: string, model: UpdateTaskResponseType) {
        return axiosInstance.put<{}, AxiosResponse<ResponseType<{item: TaskType}>>, UpdateTaskResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export const authAPI = {
    login(data: LoginType) {
        return axiosInstance.post<null, AxiosResponse<ResponseType<{ userId: number }>>, LoginType>('/auth/login', data)
    },
    me() {
        return axiosInstance.get<ResponseType<UserType>>('/auth/me')
    },
    logout() {
        return axiosInstance.delete<ResponseType>('/auth/login')
    }
}