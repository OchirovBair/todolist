import {v1} from "uuid";
import {TasksType, TodolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
let todolistId1:string
let todolistId2:string

let startState: TodolistType[]

beforeEach(()=> {
    todolistId1 = v1()
    todolistId2 = v1()

     startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

})
test('todolist #1 should change title to "New title"', ()=> {
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId1, 'New title'))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('New title')
})


test('start state should has one more todolist after action', ()=> {
    const endState = todolistsReducer(startState, addTodolistAC('New todolist'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New todolist')
})


test('filter value of todolist #1 should change from "all" to "active"', ()=> {
    const endState = todolistsReducer(startState, changeTodolistFilterAC('active' ,todolistId1))

    expect(endState.length).toBe(2)
    expect(startState[0].filter).toBe('all')
    expect(endState[0].filter).toBe('active')
})

test('todolist with id=todolistId1 should be delete', ()=> {
    const startTasks: TasksType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: true},
            {id: v1(), title: 'TS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'bread', isDone: false},
            {id: v1(), title: 'butter', isDone: true},
            {id: v1(), title: 'juice', isDone: true},
            {id: v1(), title: 'ice cream', isDone: false},
        ],
    }

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))


    expect(endState.length).toBe(1)
    expect(startState.length).toBe(2)
    expect(endState[0].title).toBe(startState[1].title)
})
