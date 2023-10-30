import request from './request'
import type { AnyPhotoResponse } from './api.d'

interface GenerateParams {
  avatar: string
  content: string
  outputName: string
  author: string
}

interface GenerateResponseData {
  url: string
}

const generatePhoto = async (generateParams: GenerateParams): Promise<AnyPhotoResponse<GenerateResponseData>> =>
  await request.post('photo/generate', generateParams)

export { type GenerateParams, generatePhoto }
