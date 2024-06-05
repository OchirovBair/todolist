import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskResponseType} from "../api/todolistsAPI";
import {AppRootStateType, AppThunk} from "./store";

export type TasksActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType

export type TasksType = {
    [key: string]: TaskType[]
}

export type UpdateDomainTaskType = {
    title?: string
    description?: string | null,
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string | null,
    deadline?: string | null,
}

export const tasksReducer = (state: TasksType = {}, action: TasksActionType): TasksType => {
    switch (action.type) {
        case "SET-TASKS": {
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
        }
        case "ADD-TASK":
            const newTask: TaskType = action.payload.task
            return {...state, [action.payload.task.todoListId]: [newTask, ...state[action.payload.task.todoListId]]}
        case "DELETE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    ...action.payload.model
                } : task)
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



export const getTasksTC = (todolistId: string):AppThunk => async (dispatch) => {
    const res = await todolistsAPI.getTasks(todolistId)
    dispatch(setTasksAC(res.data.items, todolistId))
}
export const addTaskTC = (todolistId: string, title: string):AppThunk => async (dispatch) => {
    const res = await todolistsAPI.createTask(todolistId, title)
    dispatch(addTaskAC(res.data.data.item))
}
export const removeTaskTC = (todolistId: string, taskId: string):AppThunk => async (dispatch) => {
    const res = await todolistsAPI.removeTask(todolistId, taskId)
    dispatch(removeTaskAC(taskId, todolistId))
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskType):AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
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
            dispatch(updateTaskAC(taskId, apiModel, todolistId))
        }
    }




