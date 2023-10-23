import request from './request'
import { type AnyPhotoResponse } from './api.d'
const pen = async (content: string): Promise<AnyPhotoResponse> =>
  await request.post('pen', { user_pen_content: content })

export { pen }
