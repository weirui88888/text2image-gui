import { getUniqueName } from '@/utils/getUniqueName'
import { atom, selector } from 'recoil'

export const templateState = atom({
  key: getUniqueName('ThemeState'),
  default: {
    template: 'template1'
  }
})
