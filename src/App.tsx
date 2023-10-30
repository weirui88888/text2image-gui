import React from 'react'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useLocalStorageState } from 'ahooks'
import { type PaletteMode } from '@mui/material'
import Privacy from './pages/Privacy'
import LoginIn from './pages/LoginIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Playground from './pages/Playground'
import Terms from './pages/Terms'
import SpeedDial from './components/SpeedDial'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SnackbarUtilsConfigurator } from './components/SnackbarUtilsConfigurator'
import getThemeByAppThemeMode from './theme'
import AppProvider from './AppProvider'
import { AppThemeProviderContext } from './store/theme'
import { AppThemeMode } from './config'

function App() {
  const [themeMode, setThemeMode] = useLocalStorageState<string | undefined>(AppThemeMode, {
    serializer: val => val as string,
    deserializer: val => val,
    defaultValue: 'light'
  })
  const toggleThemeMode = () => {
    setThemeMode(prevThemeModeMode => {
      const currentThemeMode = prevThemeModeMode === 'light' ? 'dark' : 'light'
      setThemeMode(currentThemeMode)
      return currentThemeMode
    })
  }
  return (
    <AppThemeProviderContext.Provider value={{ themeMode: themeMode as PaletteMode, toggleThemeMode }}>
      <AppProvider>
        <ThemeProvider theme={getThemeByAppThemeMode(themeMode as PaletteMode)}>
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
                <Route path="/" element={<Home />}></Route>
                <Route path="/sign-up" element={<SignUp />}></Route>
                <Route path="/login-in" element={<LoginIn />}></Route>
                <Route path="/forgot-password" element={<ForgotPassword />}></Route>
                <Route path="/playground" element={<Playground />}></Route>
                <Route path="/privacy" element={<Privacy />}></Route>
                <Route path="/terms" element={<Terms />}></Route>
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
