const crypto = require('crypto')

const commonConfig = {
  Format: 'JSON',
  SignatureMethod: 'HMAC-SHA1',
  SignatureVersion: '1.0'
}

const sortParameterKeys = parameters => {
  const response = {}
  Object.keys(parameters)
    .sort((a, b) => (a < b ? -1 : 1))
    .forEach(key => {
      response[key] = parameters[key]
    })
  return response
}

const fixedEncodeURIComponent = input =>
  encodeURIComponent(input).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)

const getCaptchaUrl = (accessKeyId, appSecret, version, action, captchaVerifyParam) => {
  const params = sortParameterKeys(
    Object.assign({}, commonConfig, {
      Version: version,
      AccessKeyId: accessKeyId,
      Action: action,
      CaptchaVerifyParam: captchaVerifyParam,
      Timestamp: new Date().toISOString().replace(/\.\d{3}/, ''),
      SignatureNonce: Math.round(Math.random() * 10000)
    })
  )

  let headerString = ''
  Object.keys(params).forEach(key => (headerString += `${key}=${fixedEncodeURIComponent(params[key])}&`))
  headerString = headerString.slice(0, -1)

  const stringToSign = `GET&%2F&${encodeURIComponent(headerString)}`
  const sign = crypto.createHmac('sha1', `${appSecret}&`).update(stringToSign).digest('base64')
  return `https://captcha.cn-shanghai.aliyuncs.com?Signature=${encodeURIComponent(sign)}&${headerString}`
}

exports.getCaptchaUrl = getCaptchaUrl
