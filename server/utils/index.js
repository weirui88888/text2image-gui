const { color, colorTip } = require('./color')
const { getAliCaptchaUrl } = require('./getAliCaptchaUrl')
const { createToken, TOKEN_ENCODE_STR } = require('./token')
module.exports = {
  getAliCaptchaUrl,
  color,
  colorTip,
  createToken,
  TOKEN_ENCODE_STR
}
