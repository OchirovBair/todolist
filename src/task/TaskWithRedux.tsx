import React, {ChangeEvent, memo} from 'react';
import {getListItemSx} from "../todolist/Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskStatuses, TaskType} from "../api/todolistsAPI";

export type TaskPropsType = {
    task: TaskType
    todoId: string
}

export const TaskWithRedux = memo(({task, todoId}: TaskPropsType) => {
    const dispatch = useDispatch()
    const removeTaskHandler = () => {
        // removeTask(task.id, todoId)
        const action = removeTaskAC(task.id, todoId)
        dispatch(action)
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const booleanStatusValue = e.currentTarget.checked
        const newStatusValue = booleanStatusValue ? TaskStatuses.Completed : TaskStatuses.New
        // changeTaskStatus(task.id, newStatusValue, todoId)
        const action = changeTaskStatusAC(task.id, newStatusValue, todoId)
        dispatch(action)
    }

    const changeTaskTitleHandler = (title: string) => {
        // changeTaskTitle(title, task.id, todoId)
        const action = changeTaskTitleAC(title, task.id, todoId)
        dispatch(action)
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


