import React, { useReducer, type ReactNode } from 'react'
import { Context, initState, type IState, type Action } from './store/user'

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const reducer = (preState: IState, action: Action) => {
    const { type } = action
    switch (type) {
      case 'login':
        return { ...preState, logining: true }
      case 'loginout':
        return { ...preState, logining: false }
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, initState) // TODO:这里使用接口判断用户token是否过期,用三个参数初始化

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  )
}

export default UserProvider
