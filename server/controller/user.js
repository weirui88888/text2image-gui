const axios = require('axios')
const bcrypt = require('bcryptjs')
const xss = require('xss')
const UserModel = require('../database/model/user')
const { getAliCaptchaUrl, createToken } = require('../utils')

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
      const { user_id, user_pwd, user_name } = signUpParams
      const salt = bcrypt.genSaltSync(10)
      const hashUserPwd = bcrypt.hashSync(user_pwd, salt)
      const token = createToken(user_id)
      const user = new UserModel({ ...signUpParams, user_pwd: hashUserPwd, token, user_name: xss(user_name) })
      await user.save()
      res.send({
        code: 200,
        message: 'success',
        data: {
          verifyResult: true,
          bizResult: true,
          token
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
