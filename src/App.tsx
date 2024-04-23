import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./todolist/Todolist";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'
function App() {
    const title = 'What to learn'
    const initialTasks: TasksType[] = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: true},
        {id: v1(), title: 'TS', isDone: false},
    ]

    const [tasks, setTasks] = useState<TasksType[]>(initialTasks)
    const [filter, setFilter] = useState<FilterType>('all')

    const addTask = (title: string) => {
        const newTask = {id: v1(), title, isDone:false}
        setTasks([newTask, ...tasks])
    }

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(el => el.id !== taskId))
    }

    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    const changeTaskStatus = (taskId:string, taskStatus: boolean) => {
        setTasks(tasks.map(el=>el.id === taskId ? {...el, isDone: taskStatus} : el))
    }

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(el=>!el.isDone)
    } else if (filter === 'completed') {
        tasksForTodolist = tasks.filter(el=>el.isDone)
    }

    return (
        <div className="App">
            <Todolist title={title}
                      tasks={tasksForTodolist}
                      deleteTask={deleteTask}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
