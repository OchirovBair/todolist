import {v1} from "uuid";
import {TasksType, TodolistType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from "./tasks-reducer";

test('task title #1 should be change', ()=> {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const taskId= v1()

    const startTasks: TasksType = {
        [todolistId1]: [
            {id: taskId, title: 'HTML&CSS', isDone: true},
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

    const endState = tasksReducer(startTasks, changeTaskTitleAC(todolistId1, taskId, 'NodeJS'))

    expect(endState[todolistId1][0].title).toBe('NodeJS')
    expect(endState[todolistId1].length).toBe(startTasks[todolistId1].length)
})


test('array of tasks of todolist with ID=todolistId1 should be increased +1 and new task should has title - "Express"', ()=> {
    const todolistId1 = v1()
    const todolistId2 = v1()

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

    const endState = tasksReducer(startTasks, addTaskAC(todolistId1, 'Express'))

    expect(endState[todolistId1][0].title).toBe('Express')
    expect(endState[todolistId1].length).toBe(startTasks[todolistId1].length + 1)
})


test('task #1 in obj with ID=todolistId1 should be deleted', ()=> {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const taskId= v1()

    const startTasks: TasksType = {
        [todolistId1]: [
            {id: taskId, title: 'HTML&CSS', isDone: true},
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

    const endState = tasksReducer(startTasks, deleteTaskAC(todolistId1, taskId))

    expect(endState[todolistId1][0].title).toBe('JS')
    expect(endState[todolistId1].length).toBe(startTasks[todolistId1].length - 1)
})

test('status of task #1 in obj with ID=todolistId1 should be changed', ()=> {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const taskId= v1()

    const startTasks: TasksType = {
        [todolistId1]: [
            {id: taskId, title: 'HTML&CSS', isDone: true},
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
    const taskStatus = !startTasks[todolistId1][0].isDone


    const endState = tasksReducer(startTasks, changeTaskStatusAC(todolistId1, taskId, taskStatus))

    expect(endState[todolistId1][0].isDone).toBe(taskStatus)
    expect(endState[todolistId1].length).toBe(startTasks[todolistId1].length)
})