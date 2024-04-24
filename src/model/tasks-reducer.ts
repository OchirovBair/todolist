import {TasksType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, DeleteTodolistActionType} from "./todolists-reducer";

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export type ActionType = ChangeTaskTitleActionType | AddTaskActionType | DeleteTaskActionType | ChangeTaskStatusActionType | DeleteTodolistActionType | AddTodolistActionType

export const tasksReducer = (state: TasksType, action: ActionType):TasksType => {
    switch (action.type) {
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.payload.todolistId]:state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)}
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
    }
}

export const changeTaskTitleAC = (todolistId:string, taskId: string, title: string) => {
    return {type: "CHANGE-TASK-TITLE", payload: {title, todolistId, taskId}} as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {type: "ADD-TASK", payload: {title, todolistId}} as const
}

export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {type: "DELETE-TASK", payload: {taskId, todolistId}} as const
}

export const changeTaskStatusAC = (todolistId:string, taskId:string, taskStatus: boolean) => {
    return {type: "CHANGE-TASK-STATUS", payload: {taskStatus, taskId, todolistId}} as const
}