import { v1 as uuidv1 } from 'uuid'

export const getUniqueName = (name: string) => {
  return `${name}/${uuidv1()}`
}
