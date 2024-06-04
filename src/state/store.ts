import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk, ThunkDispatch } from 'redux-thunk';

import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import {useDispatch} from "react-redux";

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export const useAppDispatch = useDispatch<AppDispatchType>
// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
