import {tasksReducer, TasksType} from './tasks-reducer'
import {todolistsReducer, TodolistType} from './todolists-reducer'
import {combineReducers, legacy_createStore} from 'redux'
import {v1} from "uuid";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
// export const todolistId1 = v1()
// export const todolistId2 = v1()
// const init:Partial<{ tasks: Partial<TasksType>; todolists: Partial<TodolistType[]> }> = {
//     tasks: {
//         [todolistId1]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JS', isDone: false},
//             {id: v1(), title: 'React', isDone: false},
//             {id: v1(), title: 'Redux', isDone: true},
//             {id: v1(), title: 'TS', isDone: false},
//         ],
//         [todolistId2]: [
//             {id: v1(), title: 'milk', isDone: true},
//             {id: v1(), title: 'bread', isDone: false},
//             {id: v1(), title: 'butter', isDone: true},
//             {id: v1(), title: 'juice', isDone: true},
//             {id: v1(), title: 'ice cream', isDone: false},
//         ],
//     },
//     todolists: [
//         {id: todolistId1, title: 'What to learn', filter: 'all'},
//         {id: todolistId2, title: 'What to buy', filter: 'all'},
//     ]
// }
export const store = legacy_createStore(rootReducer)
// определить автоматически тип всего объекта состояния
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
