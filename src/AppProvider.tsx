import React, { useEffect, useReducer } from 'react'
import { useLocalStorageState } from 'ahooks'
import { AppTokenKey } from './config'
import { AppContext, initState, type AppState, type AppAction } from './store/app'
import { authCheck } from './api/authCheck'
import { useRemoveAppToken } from './hooks/useAppToken'

const AppProvider = (props: React.HTMLAttributes<HTMLElement>) => {
  const { children } = props
  const reducer = (state: AppState, action: AppAction) => {
    const { type } = action
    switch (type) {
      case 'isFetchingAuth':
        return { ...state, isFetchingAuth: action.payload!.isFetchingAuth }
      case 'loginIn':
        return { ...state, ...action.payload, isLoggedIn: true }
      case 'loginOut':
        useRemoveAppToken()
        return { ...state, isLoggedIn: false }
      default:
        throw Error('Unknown action: ' + action.type)
    }
  }

  const [state, dispatch] = useReducer(reducer, initState)
  const [appToken] = useLocalStorageState<string | undefined>(AppTokenKey, {
    serializer: val => val as string,
    deserializer: val => val
  })
  useEffect(() => {
    if (appToken) {
      const checkUserAuth = async () => {
        dispatch({
          type: 'isFetchingAuth',
          payload: {
            isFetchingAuth: true
          }
        })
        let authCheckResult
        try {
          authCheckResult = await authCheck()
        } catch (error) {
          dispatch({
            type: 'isFetchingAuth',
            payload: {
              isFetchingAuth: false
            }
          })
          return
        }
        dispatch({
          type: 'isFetchingAuth',
          payload: {
            isFetchingAuth: false
          }
        })
        const { data } = authCheckResult
        const { tokenExpired, userName, userId, userEmail } = data
        if (!tokenExpired) {
          dispatch({
            type: 'loginIn',
            payload: {
              userName,
              userId,
              userEmail
            }
          })
        } else {
          dispatch({ type: 'loginOut' })
        }
      }
      checkUserAuth()
    } else {
      dispatch({
        type: 'isFetchingAuth',
        payload: {
          isFetchingAuth: false
        }
      })
    }
  }, [])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export default AppProvider
