import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk} from 'redux-thunk';
import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>;


// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
