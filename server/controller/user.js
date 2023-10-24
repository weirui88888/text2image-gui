const axios = require('axios')
const bcrypt = require('bcryptjs')
const xss = require('xss')
const UserModel = require('../database/model/user')
const { getAliCaptchaUrl, createToken, verifyToken } = require('../utils')
const { logDebugger } = require('../debug')

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
        message: '用户ID重复，请更换',
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
    const { user_name, user_id, user_email, user_pwd } = signUpParams

    const xss_user_name = xss(user_name)
    const xss_user_id = xss(user_id)
    const xss_user_email = xss(user_email)
    const xss_user_pwd = xss(user_pwd)
    const salt = bcrypt.genSaltSync(10)
    const hashUserPwd = bcrypt.hashSync(xss_user_pwd, salt)
    const token = createToken(xss_user_id)
    const user = new UserModel({
      user_name: xss_user_name,
      user_id: xss_user_id,
      user_email: xss_user_email,
      user_pwd: hashUserPwd,
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

// TODO:重复代码剔除
const loginIn = async (req, res) => {
  const { captchaVerifyParam, loginInParams } = req.body
  const url = getAliCaptchaUrl(captchaVerifyParam)
  const result = await axios.get(url)
  const { user_identifier, user_pwd, user_identifier_type } = loginInParams
  if (result.data.Result.VerifyResult) {
    if (user_identifier_type === 'user_email') {
      const queryWithUserEmail = await UserModel.find({ user_email: user_identifier })
      if (queryWithUserEmail.length) {
        const { user_pwd: last_user_pwd, user_id, user_name } = queryWithUserEmail[0]
        console.log(user_pwd, last_user_pwd)
        const isPassWordMatched = bcrypt.compareSync(user_pwd, last_user_pwd)
        logDebugger(`login-type:queryWithUserEmail,isPassWordMatched is ${isPassWordMatched}`)
        if (isPassWordMatched) {
          const newUserToken = createToken(xss(user_identifier))
          queryWithUserEmail[0].token = newUserToken
          queryWithUserEmail[0].save()
          res.send({
            code: 200,
            message: 'success',
            data: {
              verifyResult: true,
              bizResult: true,
              userId: user_id,
              userName: user_name,
              token: newUserToken
            }
          })
        } else {
          res.send({
            code: 404,
            message: `用户邮箱为 ${user_identifier} 的用户与当前密码不匹配，请重新尝试`,
            data: {
              verifyResult: true,
              bizResult: false
            }
          })
        }
      } else {
        res.send({
          code: 404,
          message: `不存在用户邮箱为 ${user_identifier} 的用户，请先前往注册`,
          data: {
            verifyResult: true,
            bizResult: false
          }
        })
      }
    }
    if (user_identifier_type === 'user_id') {
      const queryWithUserId = await UserModel.find({ user_id: user_identifier })
      if (queryWithUserId.length) {
        const { user_pwd: last_user_pwd, user_id, user_name } = queryWithUserId[0]
        const isPassWordMatched = bcrypt.compareSync(user_pwd, last_user_pwd)
        logDebugger(`login-type:queryWithUserId,isPassWordMatched is ${isPassWordMatched}`)
        if (isPassWordMatched) {
          const newUserToken = createToken(xss(user_identifier))
          logDebugger(`newUserToken,newUserToken is ${newUserToken}`)
          queryWithUserEmail[0].token = newUserToken
          queryWithUserEmail[0].save()
          res.send({
            code: 200,
            message: 'success',
            data: {
              verifyResult: true,
              bizResult: true,
              userId: user_id,
              userName: user_name,
              token: newUserToken
            }
          })
        } else {
          res.send({
            code: 404,
            message: `用户id为 ${user_identifier} 的用户与当前密码不匹配，请重新尝试`,
            data: {
              verifyResult: true,
              bizResult: false
            }
          })
        }
      } else {
        res.send({
          code: 404,
          message: `不存在用户id为 ${user_identifier} 的用户，请先前往注册`,
          data: {
            verifyResult: true,
            bizResult: false
          }
        })
      }
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

const authCheck = async (req, res) => {
  const token = req.headers.authorization
  const { str = '' } = await verifyToken(token.replace(/"/g, ''))
  console.log(str)
  res.send('user authCheck route')
}
const loginOut = async (req, res) => {
  res.send('user login-out route')
}

module.exports = {
  signUp,
  loginIn,
  authCheck,
  loginOut
}
