import { GetTasksResponseType, ResponseType } from "api/todolistsAPI";
import {AppDispatch} from "app/store";
import {appActions} from "app/appSlice";

export const handleServerAppError = <T>(dispatch: AppDispatch, data: ResponseType<T>) => {
  if (data.messages.length || data) {
    dispatch(appActions.setAppError({error: data.messages[0]}));
  } else {
    dispatch(appActions.setAppError({error: "Something went wrong"}));
  }
  dispatch(appActions.setAppStatus({status:"failed"}));
};

export const getTasksHandleServerAppError = (
  dispatch: AppDispatch,
  data: GetTasksResponseType,
) => {
  if (data.error !== null) {
    dispatch(appActions.setAppError({error: data.error}));
  }
  dispatch(appActions.setAppStatus({status:"failed"}));
};

export const handleServerNetworkError = (
  dispatch: AppDispatch,
  error: { message: string },
) => {
  dispatch(appActions.setAppError({error: error.message}));
  dispatch(appActions.setAppStatus({status:"failed"}));
};
