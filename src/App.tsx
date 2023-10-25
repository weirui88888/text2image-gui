import React, { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Privacy from './pages/Privacy'
import LoginIn from './pages/LoginIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Terms from './pages/Terms'
import SpeedDial from './components/SpeedDial'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SnackbarUtilsConfigurator } from './components/SnackbarUtilsConfigurator'
import getThemeByAppThemeMode from './theme'
import AppProvider from './AppProvider'
import { AppThemeProviderContext } from './store/theme'

function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light')
  const toggleThemeMode = () => { setThemeMode(prevThemeModeMode => (prevThemeModeMode === 'light' ? 'dark' : 'light')) }
  return (
    <AppThemeProviderContext.Provider value={{ themeMode, toggleThemeMode }}>
      <AppProvider>
        <ThemeProvider theme={getThemeByAppThemeMode(themeMode)}>
          <CssBaseline />
          <SnackbarProvider
            anchorOrigin={{
              horizontal: 'center',
              vertical: 'top'
            }}
            maxSnack={3}
            autoHideDuration={3000}
            classes={{
              containerAnchorOriginTopCenter: 'z-alert'
            }}
          >
            <SnackbarUtilsConfigurator />
            <Router>
              <Routes>
                <Route path="/forgot-password" element={<ForgotPassword />}></Route>
                <Route path="/sign-up" element={<SignUp />}></Route>
                <Route path="/login-in" element={<LoginIn />}></Route>
                <Route path="/privacy" element={<Privacy />}></Route>
                <Route path="/terms" element={<Terms />}></Route>
                <Route path="/" element={<Home />}></Route>
              </Routes>
              <SpeedDial />
            </Router>
          </SnackbarProvider>
        </ThemeProvider>
      </AppProvider>
    </AppThemeProviderContext.Provider>
  )
}

export default App
