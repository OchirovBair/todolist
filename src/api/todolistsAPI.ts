import axios, {AxiosResponse} from "axios";


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
type ResponseType<T={}> = {
    data: T
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}
type GetTasksResponseType = {
    error: string | null
    items: TaskType[]
    totalCount: number
}



const settings = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY
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
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
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