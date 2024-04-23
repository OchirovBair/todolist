import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from "../App";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";


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
        changeTodolistTitle(title, todoId)
    }

    const taskList = tasks.length === 0
        ? <span>Тасок нет</span>
        : <List>
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
                    <ListItem key={task.id}
                              disableGutters
                              disablePadding
                              sx={getListItemSx(task.isDone)}>
                        <div>
                            <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                            {/*<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>*/}
                            <EditableSpan title={task.title} changeTitleHandler={changeTaskTitleHandler}/>
                        </div>
                        <IconButton onClick={deleteTaskHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>
                )
            })}
        </List>

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitleHandler={changeTodolistTitleHandler}/>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            {taskList}
            <Box sx={filterButtonsContainerSx}>
                <Button onClick={() => changeTodolistFilterHandler('all')} children={'All'}
                        variant={filter === 'all' ? 'contained' : 'outlined'}/>
                <Button onClick={() => changeTodolistFilterHandler('active')} children={'Active'}
                        variant={filter === 'active' ? 'contained' : 'outlined'}/>
                <Button onClick={() => changeTodolistFilterHandler('completed')} children={'Completed'}
                        variant={filter === 'completed' ? 'contained' : 'outlined'}/>
            </Box>
        </div>
    );
};