import { createContext, type Dispatch, useContext } from 'react'

export interface IState {
  logining: boolean;
}

export interface Action {
  type: string;
  payload?: any;
}

interface IContext {
  state: IState;
  dispatch: Dispatch<Action>;
}

export const initState: IState = {
  logining: false
}

export const Context = createContext<IContext>({
  state: initState,
  dispatch: () => {}
})

export const useUser = () => {
  return useContext(Context)
}
