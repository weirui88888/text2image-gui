import request from './request'
import type { AnyPhotoResponse } from './api.d'
interface LoginInParams {
  user_identifier: string
  user_pwd: string
  user_identifier_type: 'user_id' | 'user_email'
}

interface LoginInResponseData {
  verifyResult: boolean
  bizResult: boolean
  token: string
  userId: string
  userName: string
}

const loginIn = async (
  captchaVerifyParam: string,
  loginInParams: LoginInParams
): Promise<AnyPhotoResponse<LoginInResponseData>> =>
  await request.post('user/login-in', { captchaVerifyParam, loginInParams })

export { type LoginInParams, loginIn }
