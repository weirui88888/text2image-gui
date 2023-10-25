import { createContext, type Dispatch, useContext } from 'react'

export interface AppState {
  isLoggedIn: boolean
  isFetchingAuth: boolean
  token?: string
  userId?: string
  userName?: string
}

export interface AppAction {
  type: string
  payload?: Record<string, any>
}

interface IAppContext {
  state: AppState
  dispatch: Dispatch<AppAction>
}

export const initState: AppState = {
  isLoggedIn: false,
  isFetchingAuth: true
}

export const AppContext = createContext<IAppContext>({
  state: initState,
  dispatch: () => {}
})

export const useApp = () => {
  return useContext(AppContext)
}
