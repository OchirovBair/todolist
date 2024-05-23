import React, {useState} from 'react';
import {Todolist} from "./todolist/Todolist";
import {v1} from "uuid";
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

type ThemeMode = 'dark' | 'light'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed'

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

    const todolistId1 = v1()
    const todolistId2 = v1()

    const initialTodolists: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const initialtasks: TasksType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: true},
            {id: v1(), title: 'TS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'bread', isDone: false},
            {id: v1(), title: 'butter', isDone: true},
            {id: v1(), title: 'juice', isDone: true},
            {id: v1(), title: 'ice cream', isDone: false},
        ],
    }

    const [todolists, setTodolists] = useState<TodolistType[]>(initialTodolists)
    const [tasks, setTasks] = useState<TasksType>(initialtasks)

    const addTask = (title: string, todoId: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})
    }

    const deleteTask = (taskId: string, todoId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(el => el.id !== taskId)})
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todoId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(el => el.id === taskId ? {...el, isDone: taskStatus} : el)})
    }

    const changeTaskTitle = (title: string, taskId: string, todoId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(el => el.id === taskId ? {...el, title} : el)})
    }

    const deleteTodolist = (todoId: string) => {
        setTodolists(todolists.filter(el => el.id !== todoId))
        delete tasks[todoId]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const changeFilter = (filter: FilterType, todoId: string) => {
        setTodolists(todolists.map(el => el.id === todoId ? {...el, filter} : el))
    }

    const changeTodolistTitle = (title: string, todoId: string) => {
        setTodolists(todolists.map(todo => todo.id === todoId ? {...todo, title} : todo))
    }

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
                    {todolists.map(td => {
                        let tasksForTodolist = tasks[td.id]

                        return (
                            <Grid>
                                <Paper elevation={3} sx={{p: '0 20px 20px 20px'}}>
                                    <Todolist title={td.title}
                                              todoId={td.id}
                                              key={td.id}
                                              tasks={tasksForTodolist}
                                              removeTask={deleteTask}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              changeFilter={changeFilter}
                                              filter={td.filter}
                                              changeTaskTitle={changeTaskTitle}

                                              removeTodolist={deleteTodolist}
                                              changeTodolistTitle={changeTodolistTitle}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

        </ThemeProvider>
    );
}

export default App;