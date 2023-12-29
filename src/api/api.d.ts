export enum ResponseCode {
  OK = 200,
  Unauthorized = 401,
  InternalServerError = 500,
  NotFound = 404,
  Forbidden = 403
}

export interface AnyPhotoResponse<T = Record<string, any>> {
  code:
    | ResponseCode.OK
    | ResponseCode.Unauthorized
    | ResponseCode.InternalServerError
    | ResponseCode.NotFound
    | ResponseCode.Forbidden
  message: string
  data: T
}
