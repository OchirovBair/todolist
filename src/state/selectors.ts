import {AppRootStateType} from "./store";

const getStatusSelector = (state:AppRootStateType) => state.app.status
const getTasksSelector = (state:AppRootStateType) => state.tasks
const getTodolistsSelector = (state:AppRootStateType) => state.todolists
const getErrorSelector = (state:AppRootStateType) => state.app.error

export const selectors = {
    getStatusSelector,
    getTasksSelector,
    getTodolistsSelector,
    getErrorSelector
}