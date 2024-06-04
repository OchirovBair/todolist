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
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolistsAPI";
import {TodolistDomainType} from "./state/todolists-reducer";

type ThemeMode = 'dark' | 'light'

export type TasksType = {
    [key: string]: TaskType[]
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

    const initialTodolists: TodolistDomainType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ]

    const initialtasks: TasksType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
        ],
        [todolistId2]: [
            {id: v1(), title: 'butter', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
            {id: v1(), title: 'juice', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '',
                todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low},
        ],
    }

    const [todolists, setTodolists] = useState<TodolistDomainType[]>(initialTodolists)
    const [tasks, setTasks] = useState<TasksType>(initialtasks)

    const addTask = (title: string, todoId: string) => {
        const newTask = {id: v1(), title, status: TaskStatuses.New, order: 0, addedDate: '', deadline: '',
            todoListId: todolistId1, startDate: '', description: '', priority: TaskPriorities.Low}
        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})
    }

    const deleteTask = (taskId: string, todoId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(el => el.id !== taskId)})
    }

    const changeTaskStatus = (taskId: string, taskStatus: TaskStatuses, todoId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(el => el.id === taskId ? {...el, status: taskStatus} : el)})
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
        const newTodolist: TodolistDomainType = {id: newTodolistId, title, filter: 'all', addedDate: '', order: 0}
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