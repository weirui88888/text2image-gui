import React, { useReducer } from 'react'
import { AppContext, initState, type AppState, type AppAction } from './store/app'

const AppProvider = (props: React.HTMLAttributes<HTMLElement>) => {
  const { children } = props
  const reducer = (state: AppState, action: AppAction) => {
    const { type } = action
    switch (type) {
      case 'loginIn':
        return { ...state, ...action.payload, isLoggedIn: true }
      case 'loginOut':
        return { isLoggedIn: false }
      default:
        throw Error('Unknown action: ' + action.type)
    }
  }

  const [state, dispatch] = useReducer(reducer, initState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export default AppProvider
