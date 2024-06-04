import {v1} from "uuid";
import {TasksType} from "../../App";
import {tasksReducer, todolistId1, todolistId2} from "../tasks-reducer";
import {
    addTodolistAC,
    removeTodolistAC,
    setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from "../todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolistsAPI";

test('after adding new todolist should added empty array of tasks', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

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

    const startTodolists: TodolistDomainType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ]

    const startTasks: TasksType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
        ],
        [todolistId2]: [
            {id: v1(), title: 'butter', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
            {id: v1(), title: 'juice', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
        ],
    }


    const endTasksState = tasksReducer(startTasks, removeTodolistAC(todolistId1))
    const endTodolistsState = todolistsReducer(startTodolists, removeTodolistAC(todolistId1))

    expect(endTasksState[todolistId1]).toBeUndefined()
    expect(endTodolistsState[0].id).toBe(todolistId2)
})

test('if todolist were sat, then task should be set too', () => {
    const todolists =[
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ]
    const action = setTodolistsAC(todolists);

    const endState = tasksReducer({}, action)

    expect(Object.keys(endState).length).toBe(2);
})
