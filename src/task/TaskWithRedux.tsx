import React, {ChangeEvent, memo} from 'react';
import {getListItemSx} from "../todolist/Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    task: TaskType
    todoId: string
}

export const TaskWithRedux = memo(({task, todoId}: TaskPropsType) => {
    console.log('TaskWithRedux')
    const dispatch = useDispatch()
    const removeTaskHandler = () => {
        // removeTask(task.id, todoId)
        const action = removeTaskAC(task.id, todoId)
        dispatch(action)
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
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
                  sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                {/*<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>*/}
                <EditableSpan title={task.title} changeTitleHandler={changeTaskTitleHandler}/>
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
})


