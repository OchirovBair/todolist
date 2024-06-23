import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {authAPI} from "api/todolistsAPI";
import {AppThunk} from "app/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "app/appSlice";
import {todolistsActions} from "features/TodolistsList/todolistsSlice";

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

// thunks
export const loginTC =
    (data: any): AppThunk =>
        (dispatch) => {
            dispatch(appActions.setAppStatus({status: "loading"}));
            authAPI
                .login(data)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(authActions.setIsLoggedIn({value: true}));
                        dispatch(appActions.setAppStatus({status: "succeeded"}));
                    } else {
                        handleServerAppError(dispatch, res.data);
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(dispatch, error);
                    dispatch(appActions.setAppStatus({status: "failed"}));
                });
        };

export const meTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: "loading"}));
    authAPI
        .me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({value: true}));
                dispatch(appActions.setAppStatus({status: "succeeded"}));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error);
            dispatch(appActions.setAppStatus({status: "failed"}));
        })
        .finally(() => {
            dispatch(appActions.setIsInitialized({isInitialized: true}));
        });
};

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: "loading"}));
    authAPI
        .logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({value: false}));
                dispatch(appActions.setAppStatus({status: "succeeded"}));
                dispatch(todolistsActions.clearTodolistsData);
            } else {
                handleServerAppError(dispatch, res.data);
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error);
            dispatch(appActions.setAppStatus({status: "failed"}));
        });
};

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authName = slice.name


