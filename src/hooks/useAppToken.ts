import { AppTokenKey } from '../config'

export const useGetAppToken = () => localStorage.getItem(AppTokenKey)

export const useRemoveAppToken = () => localStorage.removeItem(AppTokenKey)
