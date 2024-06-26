import {Provider} from "react-redux";
import {AppRootStateType} from "../state/store";
import {v1} from "uuid";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolistsAPI";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState:AppRootStateType = {
    auth: {
        isLoggedIn: false
    },
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"},
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
                todoListId: 'todolistId1', startDate: '', description: '', priority: TaskPriorities.Low, entityStatus: 'idle'},
            {id: v1(), title: "JS", status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
                todoListId: 'todolistId1', startDate: '', description: '', priority: TaskPriorities.Low, entityStatus: 'idle'}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
                todoListId: 'todolistId2', startDate: '', description: '', priority: TaskPriorities.Low, entityStatus: 'idle'},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
                todoListId: 'todolistId2', startDate: '', description: '', priority: TaskPriorities.Low, entityStatus: 'idle'}
        ]
    },
    app: {
        status: "idle",
        error: null,
        isInitialized: false
    }
};

// @ts-ignore
export const storyBookStore = legacy_createStore
(rootReducer, initialGlobalState as ReturnType<typeof rootReducer>);

export const ReduxStoreProviderDecorator = (storyFn: ()=>React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}