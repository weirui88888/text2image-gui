import getUniqueName from '@/utils/getUniqueName'
import { atom } from 'recoil'

export default atom<string>({
  key: getUniqueName('SelectState'),
  default: ''
})
