import React, {useCallback, useEffect, useState} from 'react';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Grid from '@mui/material/Unstable_Grid2'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import {toolBarSx} from "./App.styles";
import {MenuButton} from "./components/MenuBotton/MenuBotton";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    fetchTodolistsTC,
    FilterType,
    removeTodolistAC
} from "./state/todolists-reducer";
import {Todolist} from "./todolist/Todolist";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useAppSelector} from "./hooks/hooks";
import {TaskStatuses} from "./api/todolistsAPI";
import {useAppDispatch} from "./state/store";

type ThemeMode = 'dark' | 'light'



function AppWithRedux() {



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

    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch();


    const removeTask = useCallback((id: string, todolistId: string)=> {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }, [dispatch])

    const changeStatus = useCallback((id: string, taskStatus: TaskStatuses, todolistId: string) => {
        const action = changeTaskStatusAC(id, taskStatus, todolistId);
        dispatch(action);
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string)=> {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }, [dispatch])

    const changeFilter = useCallback((value: FilterType, todolistId: string)=> {
        const action = changeTodolistFilterAC(value, todolistId);
        dispatch(action);
    }, [dispatch])

    const removeTodolist = useCallback((id: string)=> {
        const action = removeTodolistAC(id);
        dispatch(action);
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, []);

    return (
        <ThemeProvider theme={theme}>
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
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </ThemeProvider>
    );
}

export default AppWithRedux;
