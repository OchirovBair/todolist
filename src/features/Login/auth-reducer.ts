import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType, setIsInitAC,} from '../../state/app-reducer'
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {authAPI} from "../../api/todolistsAPI";
import {AppThunk} from "../../state/store";
import {clearTodolistsDataAC} from "../../state/todolists-reducer";

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (
    state: InitialStateType = initialState,
    action: AuthActionsType
): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({ type: 'login/SET-IS-LOGGED-IN', value }) as const

// thunks
export const loginTC = (data: any):AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        }))
        .catch(error => {
            handleServerNetworkError(dispatch, error)
            dispatch(setAppStatusAC('failed'))
        })

}

export const meTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then((res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        }))
        .catch(error => {
            handleServerNetworkError(dispatch, error)
            dispatch(setAppStatusAC('failed'))
        })
        .finally(() => {
            dispatch(setIsInitAC(true))
        })
}

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then((res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(clearTodolistsDataAC())
            } else {
                handleServerAppError(dispatch, res.data)
            }
        }))
        .catch(error => {
            handleServerNetworkError(dispatch, error)
            dispatch(setAppStatusAC('failed'))
        })
}

// types
export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusActionType
    | SetAppErrorActionType