import AliOss from 'ali-oss'
import type { Options, MultipartUploadOptions } from 'ali-oss'

interface StsToken {
  accessKeyId: string
  accessKeySecret: string
  expiration?: string
  securityToken?: string
}

type AsyncGetStsToken = (...args: any[]) => Promise<StsToken>

interface GetOssConfigOptions {
  stsToken: StsToken
  bucket: string
  region: string
}
interface GetConfigOptions {
  asyncGetStsToken?: AsyncGetStsToken
  bucket: string
  region: string
}

interface Config {
  bucket: string // bucket库
  domain: string // 自定义域名
  directory?: string // oss目录
  region: string // 地域节点
  extraUploadOptions?: MultipartUploadOptions // 额外的配置
  asyncGetStsToken?: AsyncGetStsToken // 获取ststoken的异步方法，一般是调用后端服务获得
}

interface ConstructOssKeyOptions {
  name: string
  directory?: string
  randomName?: boolean | string
}

interface UploadOptions {
  asyncGetStsToken?: AsyncGetStsToken
  file: File
  directory?: string
  extraUploadOptions?: MultipartUploadOptions
  randomName?: boolean | string
  bucket?: string
  region?: string
}

interface BatchUploadOptions extends Omit<UploadOptions, 'file'> {
  files: File[]
}

interface InitOssClientOptions {
  asyncGetStsToken?: AsyncGetStsToken
  bucket?: string
  region?: string
}

class AliOssUpload {
  public bucket: string
  public domain?: string
  public directory?: string
  public region: string
  public defaultUploadOption?: MultipartUploadOptions
  public asyncGetStsToken?: AsyncGetStsToken
  constructor(config: Config) {
    const {
      bucket,
      domain,
      region,
      directory = '',
      extraUploadOptions = {},
      asyncGetStsToken,
    } = config
    this.bucket = bucket
    this.domain = this.handelDomain(domain)
    this.directory = directory
    this.region = region
    this.defaultUploadOption = extraUploadOptions
    this.asyncGetStsToken = asyncGetStsToken
  }

  handelDomain(domain?: string) {
    if (!domain) return
    if (typeof domain !== 'string') return
    const regex = /\/$/
    return regex.test(domain) ? domain : `${domain}/`
  }

  handelDirectory(directory: string) {
    if (directory === '' || directory === '/') return ''
    return directory.replace(/^\/+|\/+$/g, '') + '/'
  }

  getConstructOssKey(options: ConstructOssKeyOptions) {
    const { directory: originDirectory = this.directory, name, randomName } = options
    const directory = this.handelDirectory(originDirectory!)
    const type = name.split('.')[name.split('.').length - 1]
    if (randomName) {
      return typeof randomName === 'string'
        ? `${directory}${randomName}.${type}`
        : `${directory}${this.getUuid()}.${type}`
    } else {
      return `${directory}${name}`
    }
  }

  getUuid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
  }

  checkStsToken(stsToken: any) {
    if (typeof stsToken !== 'object' || !('accessKeyId' in stsToken) || !('accessKeySecret' in stsToken)) {
      throw new TypeError('The return value of asyncGetStsToken method should be StsToken object type, and at least include accessKeyId and accessKeySecret field.')
    }
  }

  getOssConfig(options: GetOssConfigOptions) {
    const { stsToken, region, bucket } = options
    const { accessKeyId, accessKeySecret, securityToken } = stsToken
    return {
      secure: true,
      region,
      accessKeyId,
      accessKeySecret,
      stsToken: securityToken,
      bucket
    }
  }

  getConfig = async (options: GetConfigOptions) => {
    const { asyncGetStsToken, bucket, region } = options
    if (!asyncGetStsToken && !this.asyncGetStsToken) {
      throw new Error('Uploading files requires permission authentication information. You need to provide the global asynchronous method asyncGetStsToken when instantiating AliOssUpload, or actively pass in the asynchronous method asyncGetStsToken when calling the upload method.')
    }
    if (asyncGetStsToken && typeof asyncGetStsToken !== 'function') {
      throw new TypeError('The asyncGetStsToken should be an asynchronous function and return stsToken object, and the object includes at least accessKeyId and accessKeySecret fields, and it is better to provide securityToken for temporary access.')
    }
    if (!asyncGetStsToken && this.asyncGetStsToken && typeof this.asyncGetStsToken !== 'function') {
      throw new TypeError('The asyncGetStsToken should be an asynchronous function and return stsToken object, and the object includes at least accessKeyId and accessKeySecret fields, and it is better to provide securityToken for temporary access.')
    }
    try {
      const stsToken = asyncGetStsToken ? await asyncGetStsToken() : await this.asyncGetStsToken!()
      this.checkStsToken(stsToken)
      const ossConfig: Options = this.getOssConfig({
        stsToken,
        bucket,
        region
      })
      return ossConfig
    } catch (error: any) {
      console.error(error.message)
    }
  }

  initOssClient = async (options: InitOssClientOptions = {}) => {
    try {
      const { asyncGetStsToken, bucket = this.bucket, region = this.region } = options
      const ossConfig = await this.getConfig({ asyncGetStsToken, bucket, region })
      return new AliOss(ossConfig as Options)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  upload = async (uploadOptions: UploadOptions): Promise<{ ossSourceUrl: string; [key: string]: any }> => {
    const {
      directory,
      asyncGetStsToken,
      file,
      extraUploadOptions,
      randomName = false,
      bucket = this.bucket,
      region = this.region
    } = uploadOptions

    try {
      const ossConfig = await this.getConfig({ asyncGetStsToken, bucket, region })
      const { name } = file
      const ossClient = new AliOss(ossConfig as Options)
      const uploadOptions = extraUploadOptions ?? this.defaultUploadOption
      const uploadPath = this.getConstructOssKey({
        name,
        directory,
        randomName
      })
      const res = await ossClient.multipartUpload(uploadPath, file, uploadOptions as MultipartUploadOptions)
      return this.domain
        ? {
            ossSourceUrl: `${this.domain}${res.name}`,
            ...res
          }
        : {
            ossSourceUrl: `https://${bucket}.${region}.aliyuncs.com/${res.name}`,
            ...res
          }
    } catch (error: any) {
      console.error(error.message)
      return error.message
    }
  }

  batchUpload = async (batchUploadOptions: BatchUploadOptions) => {
    let { files, ...uploadOptions } = batchUploadOptions
    files = [...files]
    try {
      const uploadQueue = []
      for (let i = 0; i < files.length; i++) {
        uploadQueue.push(
          this.upload({
            ...uploadOptions,
            file: files[i]
          })
        )
      }
      return await Promise.all(uploadQueue)
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export default AliOssUpload
