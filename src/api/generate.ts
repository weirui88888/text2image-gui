import request from './request'
import type { AnyPhotoResponse } from './api.d'

type GenerateParams = {
  content: string
  options: {
    avatar: string
    title: string
  }
  canvasSetting: Record<string, any>
}

interface GenerateResponseData {
  url: string
}

const text2Image = async (generateParams: GenerateParams): Promise<AnyPhotoResponse<GenerateResponseData>> => {
  return await request.post('/generate', generateParams)
}

export { type GenerateParams, text2Image }
