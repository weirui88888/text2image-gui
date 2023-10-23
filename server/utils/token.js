const jwt = require('jsonwebtoken')

const TOKEN_ENCODE_STR = 'ANYPHOTO_TOKEN_ENCODE_STR'

module.exports = {
  TOKEN_ENCODE_STR,
  createToken(str) {
    return jwt.sign({ str }, TOKEN_ENCODE_STR, { expiresIn: '24h' })
  }
}
