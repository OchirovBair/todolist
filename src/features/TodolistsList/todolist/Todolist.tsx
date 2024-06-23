import React, { memo, useCallback, useMemo } from "react";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import { filterButtonsContainerSx } from "./Todolist.styles";
import { MiuButton } from "components/MUIButton/MiuButton";
import { Task } from "./task/Task";
import { TaskStatuses } from "api/todolistsAPI";
import { DomainTaskType } from "features/TodolistsList/tasksSlice";
import { RequestStatusType } from "app/appSlice";
import { FilterType } from "features/TodolistsList/todolistsSlice";

type TodolistPropsType = {
  tasks: DomainTaskType[];
  title: string;
  removeTask: (taskId: string, todoId: string) => void;
  addTask: (title: string, todoId: string) => void;
  changeFilter: (filter: FilterType, todoId: string) => void;
  changeTaskStatus: (taskId: string, taskStatus: TaskStatuses, todoId: string) => void;
  filter: FilterType;
  changeTaskTitle: (title: string, taskId: string, todoId: string) => void;
  todoId: string;
  entityStatus: RequestStatusType;

  changeTodolistTitle: (title: string, todoId: string) => void;
  removeTodolist: (todoId: string) => void;
};

export const Todolist = memo(
  ({
    tasks,
    title,
    addTask,
    changeFilter,
    removeTodolist,
    todoId,
    filter,
    changeTodolistTitle,
    entityStatus,
  }: TodolistPropsType) => {
    let tasksMemo = tasks;
    tasksMemo = useMemo(() => {
      if (filter === "active") {
        tasksMemo = tasksMemo.filter((el) => el.status === TaskStatuses.New);
      } else if (filter === "completed") {
        tasksMemo = tasksMemo.filter((el) => el.status === TaskStatuses.Completed);
      }
      return tasksMemo;
    }, [tasks, filter]);

    const addTaskHandler = useCallback(
      (value: string) => {
        addTask(value, todoId);
      },
      [addTask, todoId],
    );

    const removeTodolistHandler = useCallback(() => {
      removeTodolist(todoId);
    }, [removeTodolist, todoId]);

    const changeTodolistFilterHandlerAll = useCallback(() => {
      changeFilter("all", todoId);
    }, [changeFilter, todoId]);
    const changeTodolistFilterHandlerActive = useCallback(() => {
      changeFilter("active", todoId);
    }, [changeFilter, todoId]);
    const changeTodolistFilterHandlerCompleted = useCallback(() => {
      changeFilter("completed", todoId);
    }, [changeFilter, todoId]);

    const changeTodolistTitleHandler = useCallback(
      (title: string) => {
        changeTodolistTitle(title, todoId);
      },
      [changeTodolistTitle, todoId],
    );

    const taskList =
      tasksMemo.length === 0 ? (
        <span>Тасок нет</span>
      ) : (
        <List>
          {tasksMemo.map((task) => {
            return <Task key={task.id} task={task} todoId={todoId} />;
          })}
        </List>
      );

    return (
      <div>
        <h3>
          <EditableSpan title={title} changeTitleHandler={changeTodolistTitleHandler} />
          <IconButton onClick={removeTodolistHandler}>
            <DeleteIcon />
          </IconButton>
        </h3>
        <AddItemForm addItem={addTaskHandler} disabled={entityStatus === "loading"} />
        {taskList}
        <Box sx={filterButtonsContainerSx}>
          <MiuButton
            onClick={changeTodolistFilterHandlerAll}
            title={"All"}
            variant={filter === "all" ? "contained" : "outlined"}
          />
          <MiuButton
            onClick={changeTodolistFilterHandlerActive}
            title={"Active"}
            variant={filter === "active" ? "contained" : "outlined"}
          />
          <MiuButton
            onClick={changeTodolistFilterHandlerCompleted}
            title={"Completed"}
            variant={filter === "completed" ? "contained" : "outlined"}
          />
        </Box>
      </div>
    );
  },
);
