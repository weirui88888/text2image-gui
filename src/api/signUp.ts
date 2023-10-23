import request from './request'
import type { AnyPhotoResponse } from './api.d'
interface SignUpParams {
  user_name: string
  user_id: string
  user_email: string
  user_pwd: string
}

const signUp = async (
  captchaVerifyParam: string,
  signUpParams: SignUpParams
): Promise<AnyPhotoResponse<{ verifyResult: boolean; bizResult: boolean }>> =>
  await request.post('user/sign-up', { captchaVerifyParam, signUpParams })

export { type SignUpParams, signUp }
