import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import {toolBarSx} from "../trash/App.styles";
import {MenuButton} from "../components/MenuBotton/MenuBotton";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import {selectors} from "../state/selectors";
import {CustomizedSnackbars} from "../components/CustomizeSnakbar/CastomizeSnakbar";
import {Outlet} from "react-router-dom";
import {logoutTC, meTC} from "../features/Login/auth-reducer";
import {CircularProgress} from "@mui/material";


type ThemeMode = 'dark' | 'light'


function App() {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(selectors.getIsInitSelector)
    const isLoggedIn = useAppSelector(selectors.getIsLoggedInSelector)

    useEffect(() => {
        dispatch(meTC())
    }, [])

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
    const logoutHandle = () => {
        dispatch(logoutTC())
    }

    const status = useAppSelector(selectors.getStatusSelector)

    if (!isInitialized) {
        return (
            <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
                <CircularProgress />
            </div>
        )
    }
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
                        {isLoggedIn && <MenuButton onClick={logoutHandle}>Logout</MenuButton>}
                        <MenuButton>FAQ</MenuButton>
                        <Switch color={'default'} onChange={changeThemeMode}/>
                    </div>
                </Toolbar>
                <Box sx={{width: '100%', height: '2px'}}>
                    {status === 'loading' && <LinearProgress/>}
                </Box>
            </AppBar>
            <Container fixed>
                <Outlet/>
            </Container>
        </ThemeProvider>
    )
}

export default App;
