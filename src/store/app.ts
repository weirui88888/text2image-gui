import { createContext, type Dispatch, useContext } from 'react'

export interface AppState {
  isLoggedIn: boolean
}

export interface AppAction {
  type: string
  payload?: any
}

interface IAppContext {
  state: AppState
  dispatch: Dispatch<AppAction>
}

export const initState: AppState = {
  isLoggedIn: false
}

export const AppContext = createContext<IAppContext>({
  state: initState,
  dispatch: () => {}
})

export const useApp = () => {
  return useContext(AppContext)
}
