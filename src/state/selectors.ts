import {AppRootStateType} from "./store";

const getStatusSelector = (state:AppRootStateType) => state.app.status
const getTasksSelector = (state:AppRootStateType) => state.tasks
const getTodolistsSelector = (state:AppRootStateType) => state.todolists
const getErrorSelector = (state:AppRootStateType) => state.app.error
const getIsLoggedInSelector = (state:AppRootStateType) => state.auth.isLoggedIn
const getIsInitSelector = (state:AppRootStateType) => state.app.isInitialized

export const selectors = {
    getStatusSelector,
    getTasksSelector,
    getTodolistsSelector,
    getErrorSelector,
    getIsLoggedInSelector,
    getIsInitSelector
}