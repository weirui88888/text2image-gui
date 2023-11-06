import AliOss from 'ali-oss'
import languageConfig, {
  STSTOKEN_NOT_SUPPLY,
  ASYNC_GET_STSTOKEN_NOT_FUNCTION,
  STSTOKEN_TYPE_ERROR,
  Language
} from './language'
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
  language?: keyof typeof Language // 报错提示的语言，支持zh｜en
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
  public language?: keyof typeof Language
  public asyncGetStsToken?: AsyncGetStsToken
  constructor(config: Config) {
    const {
      bucket,
      domain,
      region,
      directory = '',
      extraUploadOptions = {},
      asyncGetStsToken,
      language = Language.zh
    } = config
    this.bucket = bucket
    this.domain = this.handelDomain(domain)
    this.directory = directory
    this.region = region
    this.defaultUploadOption = extraUploadOptions
    this.asyncGetStsToken = asyncGetStsToken
    this.language = language
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
    const { directory: originDirectory = this.directory } = options
    const { name, randomName } = options
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
    if (typeof stsToken !== 'object') {
      throw new TypeError(languageConfig[this.language!][STSTOKEN_TYPE_ERROR])
    }
    if (!('accessKeyId' in stsToken) || !('accessKeySecret' in stsToken)) {
      throw new TypeError(languageConfig[this.language!][STSTOKEN_TYPE_ERROR])
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
      throw new Error(languageConfig[this.language!][STSTOKEN_NOT_SUPPLY])
    }
    if (asyncGetStsToken && typeof asyncGetStsToken !== 'function') {
      throw new TypeError(languageConfig[this.language!][ASYNC_GET_STSTOKEN_NOT_FUNCTION])
    }
    if (!asyncGetStsToken && this.asyncGetStsToken && typeof this.asyncGetStsToken !== 'function') {
      throw new TypeError(languageConfig[this.language!][ASYNC_GET_STSTOKEN_NOT_FUNCTION])
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

  upload = async (uploadOptions: UploadOptions) => {
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
