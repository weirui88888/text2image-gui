const { color, colorTip } = require('./color')
const { getAliCaptchaUrl } = require('./getAliCaptchaUrl')
const { createToken, verifyToken, TOKEN_ENCODE_STR } = require('./token')
const { isEmail } = require('./isEmail')
const { sleep } = require('./sleep')
const { getTime } = require('./time')
module.exports = {
  TOKEN_ENCODE_STR,
  getAliCaptchaUrl,
  color,
  colorTip,
  createToken,
  verifyToken,
  isEmail,
  sleep,
  getTime
}
