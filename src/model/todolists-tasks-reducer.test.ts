import {v1} from "uuid";
import {TasksType, TodolistType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {addTodolistAC, deleteTodolistAC, todolistsReducer} from "./todolists-reducer";

test('after adding new todolist should added empty array of tasks', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolistId);
    expect(idFromTodolists).toBe(action.payload.todolistId);
});

test('after deleting todolist with id=todolistId1, array of tasks with key=todolistId1 should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startTodolists: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

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


    const endTasksState = tasksReducer(startTasks, deleteTodolistAC(todolistId1))
    const endTodolistsState = todolistsReducer(startTodolists, deleteTodolistAC(todolistId1))

    expect(endTasksState[todolistId1]).toBeUndefined()
    expect(endTodolistsState[0].id).toBe(todolistId2)
})