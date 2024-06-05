import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk, ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TasksActionType, tasksReducer} from './tasks-reducer';
import {TodolistsActionType, todolistsReducer} from './todolists-reducer';

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppActionsType
>

export type AppActionsType = TasksActionType | TodolistsActionType

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});


// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
