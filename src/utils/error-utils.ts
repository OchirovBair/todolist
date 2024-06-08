import {AppThunkDispatchType} from "../state/store";
import {GetTasksResponseType, ResponseType} from "../api/todolistsAPI";
import {setAppErrorAC, setAppStatusAC} from "../state/app-reducer";

export const handleServerAppError = <T>(dispatch: AppThunkDispatchType, data: ResponseType<T>) => {
    if (data.messages.length || data) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Something went wrong'))
    }
    dispatch(setAppStatusAC('failed'))

}

export const getTasksHandleServerAppError = (dispatch: AppThunkDispatchType, data: GetTasksResponseType) => {
    if (data.error !== null) {
        dispatch(setAppErrorAC(data.error))
    }
    dispatch(setAppStatusAC('failed'))

}

export const handleServerNetworkError = (dispatch: AppThunkDispatchType, error: any) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}