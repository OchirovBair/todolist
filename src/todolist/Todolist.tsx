import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "../App";
import {Button} from "../components/Button";
import {AddItemForm} from "../components/AddItemForm";
import {EditableSpan} from "../components/EditableSpan";

type TodolistPropsType = {
    tasks: TaskType[]
    title: string
    deleteTask: (taskId: string, todoId: string) => void
    addTask: (title: string, todoId: string) => void
    changeFilter: (filter: FilterType, todoId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todoId: string) => void
    filter: FilterType
    changeTaskTitle: (title: string, taskId: string, todoId: string) => void
    todoId: string

    changeTodolistTitle: (title: string, todoId: string) => void
    deleteTodolist: (todoId: string) => void
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
                             filter,
                             changeTaskTitle,
                             changeTodolistTitle
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

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(title,todoId)
    }

    const taskList = tasks.length === 0
        ? <span>Тасок нет</span>
        : <ul>
            {tasks.map(task => {
                const deleteTaskHandler = () => {
                    deleteTask(task.id, todoId)
                }

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    const newStatusValue = e.currentTarget.checked
                    changeTaskStatus(task.id, newStatusValue, todoId)
                }

                const changeTaskTitleHandler = (title: string) => {
                    changeTaskTitle(title, task.id, todoId)
                }

                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <EditableSpan title={task.title} changeTitleHandler={changeTaskTitleHandler}/>
                        {/*<span>{el.title}</span>*/}
                        <Button title={'Х'} callback={deleteTaskHandler}/>
                    </li>
                )
            })}
        </ul>

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitleHandler={changeTodolistTitleHandler}/>
                <Button title={'X'} callback={deleteTodolistHandler}/>
            </h3>
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