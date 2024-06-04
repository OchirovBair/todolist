import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../api/todolistsAPI";
import {Dispatch} from "redux";

export type TasksActionType =
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType

export type TasksType = {
    [key: string]: TaskType[]
}
export const todolistId1 = v1()
export const todolistId2 = v1()
export const initialTasksState: TasksType = {
    [todolistId1]: [
        {id: v1(), title: 'HTML&CSS', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
            todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
        {id: v1(), title: 'JS', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
            todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
    ],
    [todolistId2]: [
        {id: v1(), title: 'butter', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
            todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
        {id: v1(), title: 'juice', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
            todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
    ],
}

export const tasksReducer = (state: TasksType = {}, action: TasksActionType): TasksType => {
    switch (action.type) {
        case "SET-TASKS":{
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
        }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(task => task.id === action.payload.taskId
                        ? {...task, title: action.payload.title}
                        : task)
            }
        case "ADD-TASK":
            const newTask: TaskType = {id: v1(), title: action.payload.title, status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case "DELETE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    status: action.payload.taskStatus
                } : task)
            }
        case "ADD-TODOLIST":
            return {[action.payload.todolistId]: [], ...state}
        case "DELETE-TODOLIST":
            const newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        case "SET-TODOLIST":{
            const allTasks:TasksType = {}
            action.payload.todolists.forEach(todo => allTasks[todo.id] = [])
            return allTasks
        }
        default:
            return state
    }
}

export const changeTaskTitleAC = (title: string, taskId: string, todolistId: string) => {
    return {type: "CHANGE-TASK-TITLE", payload: {title, todolistId, taskId}} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASK", payload: {title, todolistId}} as const
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "DELETE-TASK", payload: {taskId, todolistId}} as const
}

export const changeTaskStatusAC = (taskId: string, taskStatus: TaskStatuses, todolistId: string) => {
    return {type: "CHANGE-TASK-STATUS", payload: {taskStatus, taskId, todolistId}} as const
}

export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {type: 'SET-TASKS', payload: {tasks, todolistId} } as const
}

export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}



