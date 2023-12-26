import { useRecoilState, useSetRecoilState } from 'recoil'
import userConfigState from '@/recoil/config'
import objectPath from 'object-path'
import { useLocalStorage } from 'react-use'

type UseSetUserConfig = (input: { keyPath: string }) => { value: any; set: (value: any) => void }

export const useSetUserConfig: UseSetUserConfig = ({ keyPath }) => {
  const [userConfig, setUserConfig] = useRecoilState(userConfigState)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userLocalConfig, setUserLocalConfig] = useLocalStorage<Record<string, any>>('user-config', undefined, {
    raw: true
  })
  const value = objectPath.get(userConfig, keyPath)
  const set = (val: any) => {
    setUserConfig((prevUserConfig: Record<string, any>) => {
      const newUserConfig = JSON.parse(JSON.stringify(prevUserConfig))
      objectPath.set(newUserConfig, keyPath, val)
      setUserLocalConfig(newUserConfig)
      return newUserConfig
    })
  }
  return {
    value,
    set
  }
}

type BatchSet = (input: { keyPath: string; value: any }[]) => void

export const useBatchSetUserConfig = () => {
  const setUserConfig = useSetRecoilState(userConfigState)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userLocalConfig, setUserLocalConfig] = useLocalStorage<Record<string, any>>('user-config', undefined, {
    raw: true
  })
  const batchSet: BatchSet = input => {
    setUserConfig((prevUserConfig: Record<string, any>) => {
      const newUserConfig = JSON.parse(JSON.stringify(prevUserConfig))
      for (let { keyPath, value } of input) {
        objectPath.set(newUserConfig, keyPath, value)
      }
      setUserLocalConfig(newUserConfig)
      return newUserConfig
    })
  }
  return {
    batchSet
  }
}
