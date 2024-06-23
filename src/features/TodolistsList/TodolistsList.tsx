import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { selectors } from "utils/selectors";
import {addTaskTC, removeTaskTC, tasksActions} from "features/TodolistsList/tasksSlice";
import { TaskStatuses } from "api/todolistsAPI";
import {
    addTodolistTC,
    changeTodolistTitleTC,
    FilterType,
    getTodolistsTC,
    removeTodolistTC, todolistsActions,
} from "features/TodolistsList/todolistsSlice";
import Grid from "@mui/material/Unstable_Grid2";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import { Todolist } from "./todolist/Todolist";
import { Navigate } from "react-router-dom";

export const TodolistsList = () => {
  const todolists = useAppSelector(selectors.getTodolists);
  const tasks = useAppSelector(selectors.getTasks);
  const isLoggedIn = useAppSelector(selectors.getIsLoggedIn);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(getTodolistsTC());
  }, []);

  const removeTask = useCallback(
    (id: string, todolistId: string) => {
      dispatch(removeTaskTC(todolistId, id));
    },
    [dispatch],
  );

  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(addTaskTC(todolistId, title));
    },
    [dispatch],
  );

  const changeStatus = useCallback(
    (id: string, taskStatus: TaskStatuses, todolistId: string) => {
      dispatch(tasksActions.updateTask({todolistId: todolistId, taskId: id, model: { status: taskStatus }}));
    },
    [dispatch],
  );

  const changeTaskTitle = useCallback(
    (id: string, newTitle: string, todolistId: string) => {
      dispatch(tasksActions.updateTask({taskId: id, model: { title: newTitle }, todolistId: todolistId}));
    },
    [dispatch],
  );

  const changeFilter = useCallback(
    (value: FilterType, todolistId: string) => {
      dispatch(todolistsActions.changeTodolistFilter({filter: value, todoId: todolistId}));
    },
    [dispatch],
  );

  const removeTodolist = useCallback(
    (id: string) => {
      dispatch(removeTodolistTC(id));
    },
    [dispatch],
  );

  const changeTodolistTitle = useCallback(
    (id: string, title: string) => {
      dispatch(changeTodolistTitleTC(title, id));
    },
    [dispatch],
  );

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={4}>
        {todolists.map((tl: any) => { //TODO: fix any
          return (
            <Grid key={tl.id}>
              <Paper style={{ padding: "10px" }}>
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
          );
        })}
      </Grid>
    </>
  );
};
