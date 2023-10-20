import React from 'react'
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
function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}
      autoHideDuration={5000}
    >
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
  )
}

export default App
