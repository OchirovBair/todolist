import {v1} from "uuid";
import {AddTodolistActionType, DeleteTodolistActionType} from "./todolists-reducer";

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type DeleteTaskActionType = ReturnType<typeof removeTaskAC>

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export type TasksActionType = ChangeTaskTitleActionType | AddTaskActionType | DeleteTaskActionType | ChangeTaskStatusActionType | DeleteTodolistActionType | AddTodolistActionType

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}
export const todolistId1 = v1()
export const todolistId2 = v1()
export const initialTasksState: TasksType = {
    [todolistId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: true},
        {id: v1(), title: 'TS', isDone: false},
    ],
        [todolistId2]: [
        {id: v1(), title: 'milk', isDone: true},
        {id: v1(), title: 'bread', isDone: false},
        {id: v1(), title: 'butter', isDone: true},
        {id: v1(), title: 'juice', isDone: true},
        {id: v1(), title: 'ice cream', isDone: false},
    ],
}

export const tasksReducer = (state:TasksType = {}, action: TasksActionType):TasksType => {
    switch (action.type) {
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]:state[action.payload.todolistId]
                    .map(task => task.id === action.payload.taskId
                        ? {...task, title: action.payload.title}
                        : task)
            }
        case "ADD-TASK":
            const newTask:TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]:[newTask, ...state[action.payload.todolistId]]}
        case "DELETE-TASK":
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.payload.todolistId]:state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, isDone:action.payload.taskStatus} : task)}
        case "ADD-TODOLIST":
            return {[action.payload.todolistId]:[] ,...state}
        case "DELETE-TODOLIST":
            const newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        default:
            return state
    }
}

export const changeTaskTitleAC = (title: string,  taskId: string, todolistId:string) => {
    return {type: "CHANGE-TASK-TITLE", payload: {title, todolistId, taskId}} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASK", payload: {title, todolistId}} as const
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "DELETE-TASK", payload: {taskId, todolistId}} as const
}

export const changeTaskStatusAC = (taskId:string,taskStatus: boolean, todolistId:string) => {
    return {type: "CHANGE-TASK-STATUS", payload: {taskStatus, taskId, todolistId}} as const
}







