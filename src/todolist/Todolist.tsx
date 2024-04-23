import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "../App";
import {Button} from "../components/Button";

type TodolistPropsType = {
    tasks: TaskType[]
    title: string
    deleteTask: (taskId: string, todoId:string) => void
    addTask: (title: string, todoId:string) => void
    changeFilter: (filter: FilterType, todoId:string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todoId:string) => void
    filter:FilterType

    deleteTodolist:(todoId:string)=>void
    todoId: string
}

export const Todolist = ({tasks, title, addTask, deleteTask, changeFilter, changeTaskStatus, deleteTodolist, todoId, filter}: TodolistPropsType) => {
    if (filter === 'active') {
        tasks = tasks.filter(el => !el.isDone)
    } else if (filter === 'completed') {
        tasks = tasks.filter(el => el.isDone)
    }

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState(false)
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length > 10) {
            setError(true)
        } else {
            setError(false)
        }
        setInputValue(e.currentTarget.value)
        console.log(e)
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        const newTaskTitle = inputValue.trim()
        if (newTaskTitle) {
            addTask(inputValue.trim(), todoId)
            setInputValue('')
        } else {
            setError(true)
            setInputValue('')
        }
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(todoId)
    }

    const changeTodolistFilterHandler = (filter: FilterType) => {
        changeFilter(filter, todoId)
    }

    const taskList = tasks.length === 0
        ? <span>Тасок нет</span>
        : <ul>
            {tasks.map(el => {
                const deleteTaskHandler = () => {
                    deleteTask(el.id, todoId)
                }

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    const newStatusValue = e.currentTarget.checked
                    changeTaskStatus(el.id, newStatusValue, todoId)
                }

                return (
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone} onChange={changeTaskStatusHandler}/>
                        <span>{el.title}</span>
                        <Button title={'Х'} callback={deleteTaskHandler}/>
                    </li>
                )
            })}
        </ul>

    return (
        <div>
            <h3>{title}<Button title={'X'} callback={deleteTodolistHandler}/></h3>
            <div>
                <input value={inputValue} onChange={inputHandler} onKeyUp={onKeyUpHandler}/>
                <Button title={'+'} callback={addTaskHandler} isDisabled={error}/>
            </div>
            {error && <span style={{color: 'red'}}>Ошибка ввода</span>}
            {taskList}
            <div>
                <Button title={'All'} callback={() => changeTodolistFilterHandler('all')}/>
                <Button title={'Active'} callback={() => changeTodolistFilterHandler('active')}/>
                <Button title={'Completed'} callback={() => changeTodolistFilterHandler('completed')}/>
            </div>
        </div>
    );
};