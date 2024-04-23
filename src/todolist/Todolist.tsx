import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "../App";
import {Button} from "../components/Button";
import {AddItemForm} from "../components/AddItemForm";

type TodolistPropsType = {
    tasks: TaskType[]
    title: string
    deleteTask: (taskId: string, todoId: string) => void
    addTask: (title: string, todoId: string) => void
    changeFilter: (filter: FilterType, todoId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todoId: string) => void
    filter: FilterType

    deleteTodolist: (todoId: string) => void
    todoId: string
}

export const Todolist = ({
                             tasks,
                             title,
                             addTask,
                             deleteTask,
                             changeFilter,
                             changeTaskStatus,
                             deleteTodolist,
                             todoId,
                             filter
                         }: TodolistPropsType) => {
    if (filter === 'active') {
        tasks = tasks.filter(el => !el.isDone)
    } else if (filter === 'completed') {
        tasks = tasks.filter(el => el.isDone)
    }

    const addTaskHandler = (value: string) => {
        addTask(value, todoId)
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
            <AddItemForm addItem={addTaskHandler}/>
            {taskList}
            <div>
                <Button title={'All'} callback={() => changeTodolistFilterHandler('all')}/>
                <Button title={'Active'} callback={() => changeTodolistFilterHandler('active')}/>
                <Button title={'Completed'} callback={() => changeTodolistFilterHandler('completed')}/>
            </div>
        </div>
    );
};