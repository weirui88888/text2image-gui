const axios = require('axios')
const UserModel = require('../database/model/user')
const { getAliCaptchaUrl } = require('../utils')

const signUp = async (req, res) => {
  const { captchaVerifyParam, signUpParams } = req.body
  const url = getAliCaptchaUrl(captchaVerifyParam)
  const result = await axios.get(url)
  if (result.data.Result.VerifyResult) {
    const userWithUserId = await UserModel.find({ user_id: signUpParams.user_id })
    if (userWithUserId.length !== 0) {
      res.send({
        code: 409,
        message: '用户名重复，请更换',
        data: {
          verifyResult: result.data.Result.VerifyResult,
          bizResult: false
        }
      })
    } else {
      const user = new UserModel(signUpParams)
      await user.save()
      res.send({
        code: 200,
        message: 'success',
        data: {
          verifyResult: true,
          bizResult: true,
          token: 'this is token 123'
        }
      })
    }
  } else {
    res.send({
      code: 404,
      message: '验证码校验失败',
      data: {
        verifyResult: false,
        bizResult: false
      }
    })
  }
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
