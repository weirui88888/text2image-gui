import request from './request'
import type { AnyPhotoResponse } from './api.d'

interface AuthCheckResponseData {
  tokenExpired: boolean
  userId?: string
  userName?: string
  userEmail?: string
}

const authCheck = async (): Promise<AnyPhotoResponse<AuthCheckResponseData>> => await request.get('user/auth-check')

export { authCheck }
