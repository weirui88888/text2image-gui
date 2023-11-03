import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import SnackbarUtils from '../components/SnackbarUtilsConfigurator'
import { ResponseCode } from './api.d'
import type { AnyPhotoResponse } from './api.d'
import { useGetAppToken } from '../hooks/useAppToken'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://anyphoto.space/api'
    : `http://localhost:${process.env.REACT_APP_ANYPHOTO_SERVER_PORT}/api`

const AuthorizationHeader = {
  Authorization: useGetAppToken()
}

export interface InterceptorsConfig {
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  responseErrorInterceptor?: (error: AxiosError) => Promise<any>
  responseInterceptors?: (response: AxiosResponse) => any
  requestErrorInterceptor?: (error: AxiosError) => Promise<any>
}

export class Request {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig = {}, interceptorConfig?: InterceptorsConfig) {
    const baseConfig: AxiosRequestConfig = {
      timeout: 10000,
      responseType: 'json',
      baseURL,
      ...config
    }

    this.instance = axios.create(baseConfig)
    this.setupInterceptor(interceptorConfig)
  }

  public setupInterceptor(interceptorConfig?: InterceptorsConfig) {
    const defaultInterceptors = {
      requestInterceptors: (config: InternalAxiosRequestConfig) => {
        config.headers = Object.assign({}, AuthorizationHeader, config.headers)
        return config
      },
      requestErrorInterceptor: async (err: AxiosError) => {
        return await Promise.reject(err)
      },
      responseInterceptors: (res: AxiosResponse<AnyPhotoResponse>) => {
        switch (res.data.code) {
          case ResponseCode.Unauthorized:
            SnackbarUtils.error('Wrong authority')
            break
          case ResponseCode.InternalServerError:
            SnackbarUtils.error('The server has some problems')
            break
        }
        return res.data as any
      },
      responseErrorInterceptor: async (err: AxiosError) => {
        if (err.code === 'ECONNABORTED') {
          SnackbarUtils.error('Request timed out, please try again later')
        }
        return await Promise.reject(err)
      }
    }
    if (!interceptorConfig) {
      this.instance.interceptors.request.use(
        defaultInterceptors.requestInterceptors,
        defaultInterceptors.requestErrorInterceptor
      )
      this.instance.interceptors.response.use(
        defaultInterceptors.responseInterceptors,
        defaultInterceptors.responseErrorInterceptor
      )
    } else {
      this.instance.interceptors.request.use(
        interceptorConfig.requestInterceptors ?? defaultInterceptors.requestInterceptors,
        interceptorConfig.requestErrorInterceptor ?? defaultInterceptors.requestErrorInterceptor
      )
      this.instance.interceptors.response.use(
        interceptorConfig.responseInterceptors ?? defaultInterceptors.responseInterceptors,
        interceptorConfig.responseErrorInterceptor ?? defaultInterceptors.responseErrorInterceptor
      )
    }
  }

  public async request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.instance.request(config)
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return await this.instance.get(url, config)
  }

  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return await this.instance.post(url, data, config)
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return await this.instance.put(url, data, config)
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return await this.instance.delete(url, config)
  }

  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return await this.instance.patch(url, data, config)
  }
}

export default new Request()
