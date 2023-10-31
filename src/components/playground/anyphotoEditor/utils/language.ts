export const ASYNC_GET_STSTOKEN_NOT_FUNCTION = 'ASYNC_GET_STSTOKEN_NO_FUNCTION'
export const STSTOKEN_NOT_SUPPLY = 'STSTOKEN_NOT_SUPPLY'
export const STSTOKEN_TYPE_ERROR = 'STSTOKEN_TYPE_ERROR'

export enum Language {
  zh = 'zh',
  en = 'en'
}

export default {
  [Language.zh]: {
    [ASYNC_GET_STSTOKEN_NOT_FUNCTION]:
      'asyncGetStsToken应该是一个异步函数，并且返回stsToken对象,且对象至少包括accessKeyId和accessKeySecret字段，同时最好提供securityToken从而进行临时访问😊',
    [STSTOKEN_NOT_SUPPLY]:
      '上传文件需要权限认证信息，需在实例化AliOssUpload时提供全局异步方法asyncGetStsToken，或在调用upload方法时主动传入异步方法asyncGetStsToken😊',
    [STSTOKEN_TYPE_ERROR]: 'asyncGetStsToken方法的返回值应为StsToken对象类型，且至少包括accessKeyId及accessKeySecret😊'
  },
  [Language.en]: {
    [ASYNC_GET_STSTOKEN_NOT_FUNCTION]:
      'asyncGetStsToken should be an asynchronous function and return stsToken object, and the object includes at least accessKeyId and accessKeySecret fields, and it is better to provide securityToken for temporary access.😊',
    [STSTOKEN_NOT_SUPPLY]:
      'Uploading files requires permission authentication information. You need to provide the global asynchronous method asyncGetStsToken when instantiating AliOssUpload, or actively pass in the asynchronous method asyncGetStsToken when calling the upload method.😊',
    [STSTOKEN_TYPE_ERROR]:
      'The return value of asyncGetStsToken method should be StsToken object type, and at least include accessKeyId and accessKeySecret field😊'
  }
}
