import getUniqueName from '@/utils/getUniqueName'
import { atom } from 'recoil'
import defaultConfig from '@/default-config'

const getLocalUserConfig = (value: any) => {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Object' &&
    'avatar' in value &&
    'title' in value &&
    'canvasSetting' in value
    ? value
    : defaultConfig
}

const userConfig = (() => {
  try {
    const localUserConfig = localStorage.getItem('user-config')
    if (localUserConfig) {
      const parsedUserLocalConfig = JSON.parse(localUserConfig)
      return getLocalUserConfig(parsedUserLocalConfig)
    } else {
      return defaultConfig
    }
  } catch (error) {
    return defaultConfig
  }
})()
export default atom<{ title: string; avatar: string; canvasSetting: Record<string, any> }>({
  key: getUniqueName('ConfigState'),
  default: userConfig
})
