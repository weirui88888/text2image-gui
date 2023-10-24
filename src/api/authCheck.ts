import request from './request'
import type { AnyPhotoResponse } from './api.d'

interface AuthCheckResponseData {
  userId: string
  userName: string
}

const authCheck = async (): Promise<AnyPhotoResponse<AuthCheckResponseData>> => await request.get('user/auth-check')

export { authCheck }
