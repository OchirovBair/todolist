import {tasksReducer} from './tasks-reducer'
import {todolistsReducer} from './todolists-reducer'
import {combineReducers, compose, legacy_createStore} from 'redux'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export type AppRootStateType = ReturnType<typeof rootReducer>
export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


// @ts-ignore
export const store = legacy_createStore(rootReducer, composeEnhancers())
// @ts-ignore
window.store = store
