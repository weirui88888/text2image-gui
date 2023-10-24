const { color, colorTip } = require('./color')
const { getAliCaptchaUrl } = require('./getAliCaptchaUrl')
const { createToken, verifyToken, TOKEN_ENCODE_STR } = require('./token')
module.exports = {
  getAliCaptchaUrl,
  color,
  colorTip,
  createToken,
  verifyToken,
  TOKEN_ENCODE_STR
}
