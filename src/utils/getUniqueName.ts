import { v1 as uuidv1 } from 'uuid'

const getUniqueName = (name: string) => {
  return `${name}/${uuidv1()}`
}

export default getUniqueName
