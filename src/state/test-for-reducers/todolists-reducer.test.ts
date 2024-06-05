import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from "../todolists-reducer";

let todolistId1:string
let todolistId2:string

let startState: TodolistDomainType[]

beforeEach(()=> {
    todolistId1 = v1()
    todolistId2 = v1()

     startState = [
         {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
         {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
     ]

})
test('todolist #1 should change title to "New title"', ()=> {
    const endState = todolistsReducer(startState, changeTodolistTitleAC('New title', todolistId1))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('New title')
})


test('start state should has one more todolist after action', ()=> {
    const endState = todolistsReducer(startState, addTodolistAC({id: v1(), title: 'New todolist', addedDate: '', order: 0}))

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
       const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))


    expect(endState.length).toBe(1)
    expect(startState.length).toBe(2)
    expect(endState[0].title).toBe(startState[1].title)
})

test('todolist should be set', ()=> {
    const endState = todolistsReducer([], setTodolistsAC(startState))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(startState[0].title)
})
