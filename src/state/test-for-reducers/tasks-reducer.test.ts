import {v1} from "uuid";
import {
    addTaskAC,
    updateTaskAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer, TasksType
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
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low, entityStatus: 'idle'},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low, entityStatus: 'idle'},
        ],
        [todolistId2]: [
            {id: '1', title: 'butter', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low, entityStatus: 'idle'},
            {id: '2', title: 'juice', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low, entityStatus: 'idle'},
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
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low, entityStatus: 'idle'},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low, entityStatus: 'idle'},
        ],
        [todolistId2]: [
            {id: '1', title: 'butter', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low, entityStatus: 'idle'},
        ]
    })
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC({id: v1(), title: 'juice', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
        todoListId: todolistId2, startDate: '', description: '', priority: TaskPriorities.Low});

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId2].length).toBe(3);
    expect(endState[todolistId2][0].id).toBeDefined();
    expect(endState[todolistId2][0].title).toBe('juice');
})

test('status of specified task should be changed', () => {
    const action = updateTaskAC("2", {status: TaskStatuses.New}, todolistId2);

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId2][1].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {
    const action = updateTaskAC('2', {title: "onion"}, todolistId2);

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

test('when task entity status if "loading" then entityStatus should be "loading"', () => {
    const action = updateTaskAC('1', {entityStatus: 'loading'}, todolistId1);

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1][0].entityStatus).toBe('loading');
})



