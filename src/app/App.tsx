import React, {useCallback, useEffect, useState} from 'react';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Grid from '@mui/material/Unstable_Grid2'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import {toolBarSx} from "../trash/App.styles";
import {MenuButton} from "../components/MenuBotton/MenuBotton";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterType,
    getTodolistsTC,
    removeTodolistTC
} from "../state/todolists-reducer";
import {Todolist} from "../todolist/Todolist";
import {addTaskTC, removeTaskTC, updateTaskAC} from "../state/tasks-reducer";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {TaskStatuses} from "../api/todolistsAPI";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import {selectors} from "../state/selectors";
import {CustomizedSnackbars} from "../components/CustomizeSnakbar/CastomizeSnakbar";


type ThemeMode = 'dark' | 'light'


function App() {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#2f6bf8',
            },
        },
    })

    const changeThemeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const todolists = useAppSelector(selectors.getTodolistsSelector)
    const tasks = useAppSelector(selectors.getTasksSelector)
    const status = useAppSelector(selectors.getStatusSelector)


    const dispatch = useAppDispatch();


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

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CustomizedSnackbars/>
            <CssBaseline/>
            <AppBar position="static" sx={{mb: '30px'}}>
                <Toolbar sx={toolBarSx}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton background={theme.palette.primary.dark}>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton>FAQ</MenuButton>
                        <Switch color={'default'} onChange={changeThemeMode}/>
                    </div>
                </Toolbar>
                <Box sx={{width: '100%', height: '2px'}}>
                    {status === 'loading' && <LinearProgress/>}
                </Box>
            </AppBar>
            <Container fixed>
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
            </Container>
        </ThemeProvider>
    )
}

export default App;
