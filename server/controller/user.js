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
    const userWithUserEmail = await UserModel.find({ user_email: signUpParams.user_email })
    if (userWithUserId.length !== 0) {
      res.send({
        code: 409,
        message: '用户名重复，请更换',
        data: {
          verifyResult: result.data.Result.VerifyResult,
          bizResult: false
        }
      })
      return
    }
    if (userWithUserEmail.length !== 0) {
      res.send({
        code: 409,
        message: '邮箱已经被注册过，请更换',
        data: {
          verifyResult: result.data.Result.VerifyResult,
          bizResult: false
        }
      })
      return
    }
    const { user_id, user_pwd, user_name } = signUpParams
    const salt = bcrypt.genSaltSync(10)
    const hashUserPwd = bcrypt.hashSync(user_pwd, salt)
    const xss_user_id = xss(user_id)
    const xss_user_name = xss(user_name)
    const token = createToken(xss_user_id)
    const user = new UserModel({
      ...signUpParams,
      user_pwd: hashUserPwd,
      user_id: xss_user_id,
      user_name: xss_user_name,
      token
    })
    await user.save()
    res.send({
      code: 200,
      message: 'success',
      data: {
        verifyResult: true,
        bizResult: true,
        userId: xss_user_id,
        userName: xss_user_name,
        token
      }
    })
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
