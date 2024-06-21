import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {selectors} from "../../state/selectors";
import {addTaskTC, removeTaskTC, updateTaskAC} from "../../state/tasks-reducer";
import {TaskStatuses} from "../../api/todolistsAPI";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterType,
    getTodolistsTC,
    removeTodolistTC
} from "../../state/todolists-reducer";
import Grid from "@mui/material/Unstable_Grid2";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from './todolist/Todolist';
import {Navigate} from "react-router-dom";


export const TodolistsList = () => {

    const todolists = useAppSelector(selectors.getTodolistsSelector)
    const tasks = useAppSelector(selectors.getTasksSelector)
    const isLoggedIn = useAppSelector(selectors.getIsLoggedInSelector)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(getTodolistsTC())
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC(todolistId, id));
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title));
    }, [dispatch])

    const changeStatus = useCallback((id: string, taskStatus: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskAC(id, {status: taskStatus}, todolistId));
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskAC(id, {title: newTitle}, todolistId));
    }, [dispatch])

    const changeFilter = useCallback((value: FilterType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId));
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id));
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleTC(title, id));
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }
    return (
        <>
            <Grid container sx={{mb: '30px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                {
                    todolists.map(tl => {
                        return <Grid key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    todoId={tl.id}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    entityStatus={tl.entityStatus}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    );
};