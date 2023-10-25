import React, { createContext } from 'react'
import { type PaletteMode } from '@mui/material'
interface IAppThemeContext {
  toggleThemeMode: () => void
  themeMode: PaletteMode
}
export const AppThemeProviderContext = createContext<IAppThemeContext>({
  toggleThemeMode: () => {},
  themeMode: 'light'
})

const AppThemeProvider = (props: React.HTMLAttributes<HTMLElement>) => {
  const { children } = props
  const [themeMode, setThemeMode] = React.useState<'light' | 'dark'>('light')
  const colorMode = {
    toggleThemeMode: () => {
      setThemeMode(prevThemeModeMode => (prevThemeModeMode === 'light' ? 'dark' : 'light'))
    },
    themeMode
  }
  return <AppThemeProviderContext.Provider value={colorMode}>{children}</AppThemeProviderContext.Provider>
}

export default AppThemeProvider
