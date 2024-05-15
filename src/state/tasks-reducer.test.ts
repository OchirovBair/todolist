import {v1} from "uuid";
import {TasksType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

let startState: TasksType
let todolistId1:string
let todolistId2:string

beforeEach(()=>{
    todolistId1 = v1()
    todolistId2 = v1()
    startState = {
        [todolistId1]: [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
    [todolistId2]: [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const taskId = '2'

    const action = removeTaskAC(taskId, todolistId2)

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        [todolistId1]: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC("juice", todolistId2);

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(4);
    expect(endState[todolistId2][0].id).toBeDefined();
    expect(endState[todolistId2][0].title).toBe('juice');
    expect(endState[todolistId2][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("2", false,todolistId2);

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId2][1].isDone).toBe(false);
    expect(endState[todolistId1][1].isDone).toBe(true);
});

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('onion', "2", todolistId2);

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId2][1].title).toBe('onion');
    expect(endState[todolistId1][1].title).toBe('JS');
})


