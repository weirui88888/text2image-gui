const { color, colorTip } = require('./color')
const { getAliCaptchaUrl } = require('./getAliCaptchaUrl')
const { createToken, verifyToken, TOKEN_ENCODE_STR } = require('./token')
const { isEmail } = require('./isEmail')
module.exports = {
  getAliCaptchaUrl,
  color,
  colorTip,
  createToken,
  verifyToken,
  TOKEN_ENCODE_STR,
  isEmail
}
