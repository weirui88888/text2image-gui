const axios = require('axios')
const UserModel = require('../database/model/user')
const { getCaptchaUrl } = require('../utils')

const signUp = async (req, res) => {
  const { captchaVerifyParam, signUpMsg } = req.body
  const user = new UserModel(signUpMsg)
  await user.save()
  const url = getCaptchaUrl(
    process.env.AccessKeyId,
    process.env.AccessKeySecret,
    '2023-03-05',
    'VerifyCaptcha',
    captchaVerifyParam
  )
  const result = await axios.get(url)
  res.send({
    verifyResult: result.data.Result.VerifyResult,
    bizResult: true,
    token: 'this is token'
  })
}

const loginIn = async (req, res) => {
  res.send('user login-in route')
}
const loginOut = async (req, res) => {
  res.send('user login-out route')
}

module.exports = {
  signUp,
  loginIn,
  loginOut
}
