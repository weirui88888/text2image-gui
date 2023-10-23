export enum ResponseCode {
  OK = 200,
  Unauthorized = 401,
  InternalServerError = 500
}

export interface AnyPhotoResponse<T = Record<string, any>> {
  code: ResponseCode.OK | ResponseCode.Unauthorized | ResponseCode.InternalServerError
  message: string
  data?: T
}
