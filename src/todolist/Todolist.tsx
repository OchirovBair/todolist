import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TasksType} from "../App";
import {Button} from "../components/Button";

type TodolistPropsType = {
    tasks: TasksType[]
    title: string
    deleteTask: (taskId: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterType)=>void
    changeTaskStatus: (taskId: string, taskStatus: boolean) =>void
}

export const Todolist = ({tasks, title, addTask, deleteTask, changeFilter, changeTaskStatus}: TodolistPropsType) => {
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

    const onKeyUpHandler = (e:KeyboardEvent<HTMLInputElement> ) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        const newTaskTitle = inputValue.trim()
        if (newTaskTitle) {
            addTask(inputValue.trim())
            setInputValue('')
        } else {
            setError(true)
            setInputValue('')
        }
    }

    const taskList = tasks.length === 0
        ? <span>Тасок нет</span>
        : <ul>
            {tasks.map(el => {
                const deleteTaskHandler = () => {
                    deleteTask(el.id)
                }

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    const newStatusValue = e.currentTarget.checked
                    changeTaskStatus(el.id, newStatusValue)
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
            <h3>{title}</h3>
            <div>
                <input value={inputValue} onChange={inputHandler} onKeyUp={onKeyUpHandler}/>
                <Button title={'+'} callback={addTaskHandler} isDisabled={error}/>
            </div>
            {error && <span style={{color: 'red'}}>Ошибка ввода</span>}
            {taskList}
            <div>
                <Button title={'All'} callback={()=>changeFilter('all')}/>
                <Button title={'Active'} callback={()=>changeFilter('active')}/>
                <Button title={'Completed'} callback={()=>changeFilter('completed')}/>
            </div>
        </div>
    );
};