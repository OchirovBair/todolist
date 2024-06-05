import React, {ChangeEvent, memo} from 'react';
import {getListItemSx} from "../todolist/Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {TaskStatuses, TaskType} from "../api/todolistsAPI";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string, todoId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todoId: string) => void
    changeTaskTitle: (title: string, taskId: string, todoId: string) => void
    todoId: string
}

export const TaskUseStateOrReducer = memo(({task, removeTask, changeTaskStatus, changeTaskTitle, todoId}: TaskPropsType) => {
    const removeTaskHandler = () => {
        removeTask(task.id, todoId)
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(task.id, newStatusValue, todoId)
    }

    const changeTaskTitleHandler = (title: string) => {
        changeTaskTitle(title, task.id, todoId)
    }

    return (
        <ListItem disableGutters
                  disablePadding
                  sx={getListItemSx(task.status)}>
            <div>
                <Checkbox checked={task.status === TaskStatuses.Completed} onChange={changeTaskStatusHandler}/>
                {/*<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>*/}
                <EditableSpan title={task.title} changeTitleHandler={changeTaskTitleHandler}/>
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
})


