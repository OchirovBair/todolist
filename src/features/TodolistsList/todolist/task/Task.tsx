import React, {ChangeEvent, memo} from 'react';
import {getListItemSx} from "../Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {DomainTaskType, removeTaskTC, updateTaskTC} from "../../../../state/tasks-reducer";
import {TaskStatuses} from "../../../../api/todolistsAPI";
import {useAppDispatch} from "../../../../hooks/hooks";

export type TaskPropsType = {
    task: DomainTaskType
    todoId: string
}

export const Task = memo(({task, todoId}: TaskPropsType) => {
    const dispatch = useAppDispatch()
    const removeTaskHandler = () => {
        dispatch(removeTaskTC(todoId, task.id))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const booleanStatusValue = e.currentTarget.checked
        const newStatusValue = booleanStatusValue ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(todoId, task.id, {status: newStatusValue}))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(updateTaskTC(todoId, task.id, {title}))
    }

    return (
        <ListItem disableGutters
                  disablePadding
                  sx={getListItemSx(task.status)}>
            <div>
                <Checkbox checked={task.status === TaskStatuses.Completed} onChange={changeTaskStatusHandler} disabled={task.entityStatus === 'loading'}/>
                {/*<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>*/}
                <EditableSpan title={task.title} changeTitleHandler={changeTaskTitleHandler} disabled={task.entityStatus === 'loading'}/>
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
})


