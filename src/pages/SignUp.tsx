import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Field, Form, FormSpy } from 'react-final-form'
import Typography from '../components/Typography'
import AppFooter from '../views/AppFooter'
import AppAppBar from '../views/AppAppBar'
import AppForm from '../views/AppForm'
import { email, required } from '../form/validation'
import RFTextField from '../form/RFTextField'
import FormButton from '../form/FormButton'
import FormFeedback from '../form/FormFeedback'
import withRoot from '../withRoot'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignUp() {
  const [sent, setSent] = useState(false)
  const navigate = useNavigate()
  const signUpMsg = useRef()
  // let captcha

  // function getInstance(instance: any) {
  //   captcha = instance
  // }

  // 业务请求(带验证码校验)回调函数
  /**
   * @name captchaVerifyCallback
   * @function
   * 请求参数：由验证码脚本回调的验证参数，不需要做任何处理，直接传给服务端即可
   * @params {string} captchaVerifyParam
   * 返回参数：字段名固定，captchaResult为必选；如无业务验证场景时，bizResult为可选
   * @returns {{captchaResult: boolean, bizResult?: boolean|undefined}}
   */
  async function captchaVerifyCallback(captchaVerifyParam: any) {
    const result = await axios.post('http://localhost:3001/auth', {
      captchaVerifyParam: captchaVerifyParam, // 验证码参数
      signUpMsg: signUpMsg.current
    })
    // 1.向后端发起业务请求，获取验证码验证结果和业务结果
    return {
      captchaResult: result.data.verifyResult,
      bizResult: result.data.bizResult
    }
  }

  // 业务请求验证结果回调函数
  function onBizResultCallback(bizResult: any) {
    if (bizResult === true) {
      navigate('/')
    } else {
      alert('业务验证不通过！')
    }
  }

  initAliyunCaptcha({
    SceneId: 'pcflzxg9', // 场景ID。根据步骤二新建验证场景后，您可以在验证码场景列表，获取该场景的场景ID
    prefix: 'wr8jiu', // 身份标。开通阿里云验证码2.0后，您可以在控制台概览页面的实例基本信息卡片区域，获取身份标
    mode: 'popup', // 验证码模式。popup表示要集成的验证码模式为弹出式。无需修改
    element: '#sign-up-captcha-element', //页面上预留的渲染验证码的元素，与原代码中预留的页面元素保持一致。
    button: '#sign-up-submit-button', // 触发验证码弹窗的元素。button表示单击登录按钮后，触发captchaVerifyCallback函数。您可以根据实际使用的元素修改element的值
    captchaVerifyCallback: captchaVerifyCallback, // 业务请求(带验证码校验)回调函数，无需修改
    onBizResultCallback: onBizResultCallback, // 业务请求结果回调函数，无需修改
    getInstance() {}, // 绑定验证码实例函数，无需修改
    slideStyle: {
      width: 860,
      height: 140
    }, // 滑块验证码样式，支持自定义宽度和高度，单位为px。其中，width最小值为320 px
    language: 'cn' // 验证码语言类型，支持简体中文（cn）、繁体中文（tw）、英文（en）
  })

  const validate = (values: { [index: string]: string }) => {
    const errors = required(['user_name', 'user_pwd', 'user_email'], values)
    if (!errors.user_email) {
      const emailError = email(values.user_email)
      if (emailError) {
        errors.user_email = emailError
      }
    }
    return errors
  }

  const handleSubmit = (val: any) => {
    signUpMsg.current = val
  }

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link component={RouterLink} to="/sign-in/" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true, invalid: true }} validate={validate}>
          {({ handleSubmit: handleSubmit2, submitting, invalid }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Field
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="NickName"
                margin="normal"
                name="user_name"
                required
              />
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="user_email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="user_pwd"
                label="Password"
                type="password"
                margin="normal"
                autoComplete="new-password"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <div id="sign-up-captcha-element"></div>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={invalid || submitting || sent}
                color="secondary"
                fullWidth
                id="sign-up-submit-button"
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  )
}

export default withRoot(SignUp)
