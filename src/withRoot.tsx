import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'

export default function withRoot<P extends React.ComponentType<any>>(Component: P) {
  function WithRoot(props: React.ComponentProps<P>) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    )
  }

  return WithRoot
}
