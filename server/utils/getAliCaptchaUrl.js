const CryptoJS = require('crypto-js')

const commonConfig = {
  Format: 'JSON',
  SignatureMethod: 'HMAC-SHA1',
  SignatureVersion: '1.0'
}

const sortParameterKeys = parameters => {
  const sortedParams = {}
  Object.keys(parameters)
    .sort((a, b) => (a < b ? -1 : 1))
    .forEach(key => {
      sortedParams[key] = parameters[key]
    })
  return sortedParams
}

const fixedEncodeURIComponent = input =>
  encodeURIComponent(input).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)

const getAliCaptchaUrl = captchaVerifyParam => {
  const params = sortParameterKeys({
    ...commonConfig,
    Version: '2023-03-05',
    AccessKeyId: process.env.AccessKeyId,
    Action: 'VerifyCaptcha',
    CaptchaVerifyParam: captchaVerifyParam,
    Timestamp: new Date().toISOString().replace(/\.\d{3}/, ''),
    SignatureNonce: Math.round(Math.random() * 10000)
  })

  const headerString = Object.entries(params)
    .map(([key, value]) => `${key}=${fixedEncodeURIComponent(value)}`)
    .join('&')

  const stringToSign = `GET&%2F&${encodeURIComponent(headerString)}`
  const hmac = CryptoJS.HmacSHA1(stringToSign, `${process.env.AccessKeySecret}&`)
  const sign = CryptoJS.enc.Base64.stringify(hmac)

  return `https://captcha.cn-shanghai.aliyuncs.com?Signature=${encodeURIComponent(sign)}&${headerString}`
}

exports.getAliCaptchaUrl = getAliCaptchaUrl
