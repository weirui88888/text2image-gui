import React, { useEffect, useReducer } from 'react'
import { useLocalStorageState } from 'ahooks'
import { AppTokenKey } from './config'
import { AppContext, initState, type AppState, type AppAction } from './store/app'
import { authCheck } from './api/authCheck'

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
  const [appToken] = useLocalStorageState<string | undefined>(AppTokenKey)
  useEffect(() => {
    if (appToken) {
      const checkUserAuth = async () => {
        const user = await authCheck()
        console.log(user)
      }
      checkUserAuth()
    }
  }, [])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export default AppProvider
