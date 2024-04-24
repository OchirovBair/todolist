import {TasksType, TaskType} from "../App";
import {v1} from "uuid";

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        todolistId: string
        title: string
        taskId: string
    }
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        todolistId: string
        title: string
    }
}

export type DeleteTaskActionType = {
    type: 'DELETE-TASK'
    payload: {
        todolistId: string
        taskId: string
    }
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        todolistId: string
        taskId: string
        taskStatus: boolean
    }
}

export type ActionType = ChangeTaskTitleActionType | AddTaskActionType | DeleteTaskActionType | ChangeTaskStatusActionType

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
    }
}

export const changeTaskTitleAC = (todolistId:string, taskId: string, title: string):ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", payload: {title, todolistId, taskId}} as const
}

export const addTaskAC = (todolistId: string, title: string):AddTaskActionType => {
    return {type: "ADD-TASK", payload: {title, todolistId}} as const
}

export const deleteTaskAC = (todolistId: string, taskId: string):DeleteTaskActionType => {
    return {type: "DELETE-TASK", payload: {taskId, todolistId}} as const
}

export const changeTaskStatusAC = (todolistId:string, taskId:string, taskStatus: boolean):ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", payload: {taskStatus, taskId, todolistId}} as const
}