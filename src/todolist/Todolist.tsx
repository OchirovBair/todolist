import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
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
import {MiuButton} from "../components/MUIButton/MiuButton";
import {Task} from "../task/Task";
import {TaskWithRedux} from "../task/TaskWithRedux";


type TodolistPropsType = {
    tasks: TaskType[]
    title: string
    removeTask: (taskId: string, todoId: string) => void
    addTask: (title: string, todoId: string) => void
    changeFilter: (filter: FilterType, todoId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todoId: string) => void
    filter: FilterType
    changeTaskTitle: (title: string, taskId: string, todoId: string) => void
    todoId: string

    changeTodolistTitle: (title: string, todoId: string) => void
    removeTodolist: (todoId: string) => void
}

export const Todolist = memo(({
                                  tasks,
                                  title,
                                  addTask,
                                  removeTask,
                                  changeFilter,
                                  changeTaskStatus,
                                  removeTodolist,
                                  todoId,
                                  filter,
                                  changeTaskTitle,
                                  changeTodolistTitle
                              }: TodolistPropsType) => {

    let tasksMemo = tasks
    tasksMemo = useMemo(() => {
        console.log('useMemo')
        if (filter === 'active') {
            tasksMemo = tasksMemo.filter(el => !el.isDone)
        } else if (filter === 'completed') {
            tasksMemo = tasksMemo.filter(el => el.isDone)
        }
        return tasksMemo
    }, [tasks, filter])


    const addTaskHandler = useCallback((value: string) => {
        addTask(value, todoId)
    }, [addTask, todoId])

    const removeTodolistHandler = useCallback(() => {
        removeTodolist(todoId)
    }, [removeTodolist, todoId])

    const changeTodolistFilterHandlerAll = useCallback(() => {
        changeFilter('all', todoId)
    }, [changeFilter, todoId])
    const changeTodolistFilterHandlerActive = useCallback(() => {
        changeFilter('active', todoId)
    }, [changeFilter, todoId])
    const changeTodolistFilterHandlerCompleted = useCallback(() => {
        changeFilter('completed', todoId)
    }, [changeFilter, todoId])

    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(title, todoId)
    }, [changeTodolistTitle, todoId])

    const taskList = tasksMemo.length === 0
        ? <span>Тасок нет</span>
        : <List>
            {tasksMemo.map(task => {
                // return <Task key={task.id}
                //              task={task}
                //              removeTask={removeTask}
                //              changeTaskStatus={changeTaskStatus}
                //              changeTaskTitle={changeTaskTitle}
                //              todoId={todoId}/>
                return <TaskWithRedux task={task} todoId={todoId}/>
            })}
        </List>

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitleHandler={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            {taskList}
            <Box sx={filterButtonsContainerSx}>
                <MiuButton onClick={changeTodolistFilterHandlerAll}
                           title={'All'}
                           variant={filter === 'all' ? 'contained' : 'outlined'}/>
                <MiuButton onClick={changeTodolistFilterHandlerActive}
                           title={'Active'}
                           variant={filter === 'active' ? 'contained' : 'outlined'}/>
                <MiuButton onClick={changeTodolistFilterHandlerCompleted}
                           title={'Completed'}
                           variant={filter === 'completed' ? 'contained' : 'outlined'}/>
            </Box>
        </div>
    );
})