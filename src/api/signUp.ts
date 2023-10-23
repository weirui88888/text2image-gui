import request from './request'
import type { AnyPhotoResponse } from './api.d'
interface SignUpParams {
  user_name: string
  user_id: string
  user_email: string
  user_pwd: string
}

interface SignUpResponseData {
  verifyResult: boolean
  bizResult: boolean
  token: string
  userId: string
  userName: string
}

const signUp = async (
  captchaVerifyParam: string,
  signUpParams: SignUpParams
): Promise<AnyPhotoResponse<SignUpResponseData>> =>
  await request.post('user/sign-up', { captchaVerifyParam, signUpParams })

export { type SignUpParams, signUp }
