import { createContext, useContext } from 'react'
import { type PaletteMode } from '@mui/material'

interface IAppThemeContext {
  toggleThemeMode: () => void
  themeMode: PaletteMode
}
export const AppThemeProviderContext = createContext<IAppThemeContext>({
  toggleThemeMode: () => {},
  themeMode: 'light'
})

export const useAppTheme = () => {
  return useContext(AppThemeProviderContext)
}
