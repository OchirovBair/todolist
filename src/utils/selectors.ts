import { AppRootStateType } from "app/store";

const getStatus = (state: AppRootStateType) => state.appName.status;
const getTasks = (state: AppRootStateType) => state.tasksName;
const getTodolists = (state: AppRootStateType) => state.todolistsName;
const getError = (state: AppRootStateType) => state.appName.error;
const getIsLoggedIn = (state: AppRootStateType) => state.authName.isLoggedIn;
const getIsInit = (state: AppRootStateType) => state.appName.isInitialized;

export const selectors = {
  getStatus,
  getTasks,
  getTodolists,
  getError,
  getIsLoggedIn,
  getIsInit,
};
