import axios, {AxiosResponse} from "axios";

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T={}> = {
    data: T
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}

export type TaskType = {
    id: string
    title: string
    description: string | null,
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string | null,
    deadline: string | null,
    addedDate: string
}

type GetTasksType = {
    error: string | null
    items: TaskType[]
    totalCount: number
}



const settings = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '4e3dcdf8-b2b8-43c1-9eb7-bf5b3e04a15c'
    }
}

const instance = axios.create(settings)

export const todolistsAPI = {
    getTodolists () {
        return instance.get<TodolistType[]>(`/todo-lists`)
    },
    createTodolist(title: string){
        return instance.post<{}, AxiosResponse<ResponseType<{item: TodolistType}>>, {title:string}>(`/todo-lists`, {title})
    },
    deleteTodolist(todolistId:string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    changeTodolistTitle(todolistId:string, title: string) {
        return instance.put<{}, AxiosResponse<ResponseType<{item: TodolistType}>>, {title:string}>(`/todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string, title: string) {
        return instance.post<{}, AxiosResponse<ResponseType<{item: TaskType}>>, {title: string}>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId:string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    changeTaskTitle(todolistId:string, taskId: string, title: string) {
        return instance.put<{}, AxiosResponse<ResponseType<{item: TaskType}>>, {title: string}>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}