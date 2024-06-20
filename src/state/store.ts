import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk, ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TasksActionType, tasksReducer} from './tasks-reducer';
import {TodolistsActionType, todolistsReducer} from './todolists-reducer';
import {appReducer, AppReducerActionsType} from "./app-reducer";
import {AuthActionsType, authReducer} from "../features/Login/auth-reducer";

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppActionsType
>

export type AppActionsType = TasksActionType | TodolistsActionType | AppReducerActionsType | AuthActionsType

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
});


// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// @ts-ignore

window.store = store
