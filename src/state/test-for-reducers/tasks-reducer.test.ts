import {v1} from "uuid";
import {TasksType} from "../../App";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from "../tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolistsAPI";

let startState: TasksType
let todolistId1:string
let todolistId2:string

beforeEach(()=>{
    todolistId1 = v1()
    todolistId2 = v1()
    startState = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
        ],
        [todolistId2]: [
            {id: '1', title: 'butter', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
            {id: '2', title: 'juice', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
        ],
    };
})

test('correct task should be deleted from correct array', () => {
    const taskId = '2'

    const action = removeTaskAC(taskId, todolistId2)

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
        ],
        [todolistId2]: [
            {id: '1', title: 'butter', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
        ]
    })
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC("juice", todolistId2);

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId2].length).toBe(3);
    expect(endState[todolistId2][0].id).toBeDefined();
    expect(endState[todolistId2][0].title).toBe('juice');
    expect(endState[todolistId2][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("2", TaskStatuses.New, todolistId2);

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId2][1].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('onion', "2", todolistId2);

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId2][1].title).toBe('onion');
    expect(endState[todolistId1][1].title).toBe('JS');
})

test('task should be added for todo', () => {
    const tasks = [
        {id: v1(), title: 'milk', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
            todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
        {id: v1(), title: 'juice', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
            todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
    ]
    const action = setTasksAC(tasks, todolistId2);

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId2][0].title).toBe('milk');
})


