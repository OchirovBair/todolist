import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./todolist/Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const initialTodolists:TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const initialtasks: TasksType = {
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

    const [todolists, setTodolists] = useState<TodolistType[]>(initialTodolists)
    const [tasks, setTasks] = useState<TasksType>(initialtasks)

    const addTask = (title: string, todoId: string) => {
        const newTask = {id: v1(), title, isDone:false}
        setTasks({...tasks, [todoId]:[newTask, ...tasks[todoId]]})
    }

    const deleteTask = (taskId: string, todoId:string) => {
        setTasks({...tasks, [todoId]:tasks[todoId].filter(el => el.id !== taskId)})
    }

    const changeFilter = (filter: FilterType, todoId: string) => {
        setTodolists(todolists.map(el => el.id === todoId ? {...el, filter} : el))
        // setFilter(filter)
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todoId:string) => {
        setTasks({...tasks, [todoId]:tasks[todoId].map(el=>el.id === taskId ? {...el, isDone:taskStatus} : el)})
        // setTasks(tasks.map(el=>el.id === taskId ? {...el, isDone: taskStatus} : el))
    }

    const deleteTodolist = (todoId:string) => {
        setTodolists(todolists.filter(el => el.id !== todoId))
        delete tasks[todoId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map(td => {
                let tasksForTodolist = tasks[td.id]

                return (
                    <Todolist title={td.title}
                              todoId={td.id}
                              key={td.id}
                              tasks={tasksForTodolist}
                              deleteTask={deleteTask}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              changeFilter={changeFilter}
                              filter={td.filter}

                              deleteTodolist={deleteTodolist}/>
                )
            })}
        </div>
    );
}

export default App;
