import getUniqueName from '@/utils/getUniqueName'
import { atom } from 'recoil'

export default atom<{ validAvatar: boolean; validBackgroundImage: boolean }>({
  key: getUniqueName('CheckerState'),
  default: {
    validAvatar: false,
    validBackgroundImage: false
  }
})
