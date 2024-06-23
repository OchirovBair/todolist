import {UnknownAction} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {tasksReducer} from "features/TodolistsList/tasksSlice";
import {todolistsReducer} from "features/TodolistsList/todolistsSlice";
import {appReducer} from "app/appSlice";
import {authReducer} from "features/Login/authSlice";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        tasksName: tasksReducer,
        todolistsName: todolistsReducer,
        appName: appReducer,
        authName: authReducer,
    }
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>;