import React, { useState, useRef } from 'react'
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
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { ResponseCode } from '../api/api.d'
import { type SignUpParams, signUp } from '../api/signUp'
import SnackbarUtils from '../components/SnackbarUtilsConfigurator'

function SignUp() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sent, setSent] = useState(false)
  const navigate = useNavigate()
  const signUpParams = useRef<SignUpParams>()

  // 业务请求(带验证码校验)回调函数
  /**
   * @name captchaVerifyCallback
   * @function
   * 请求参数：由验证码脚本回调的验证参数，不需要做任何处理，直接传给服务端即可
   * @params {string} captchaVerifyParam
   * 返回参数：字段名固定，captchaResult为必选；如无业务验证场景时，bizResult为可选
   * @returns {{captchaResult: boolean, bizResult?: boolean|undefined}}
   */
  const captchaVerifyCallback = async (captchaVerifyParam: string) => {
    const signUpResult = await signUp(captchaVerifyParam, signUpParams.current!)
    if (signUpResult.code !== ResponseCode.OK) {
      SnackbarUtils.error(signUpResult.message)
    }
    console.log(signUpResult.data.token)
    // 1.向后端发起业务请求，获取验证码验证结果和业务结果
    return {
      captchaResult: signUpResult.data.verifyResult,
      bizResult: signUpResult.data.bizResult
    }
  }

  // 业务请求验证结果回调函数
  const onBizResultCallback = (bizResult: boolean) => {
    if (bizResult) {
      navigate('/')
      SnackbarUtils.success('注册成功')
    }
  }

  initAliyunCaptcha({
    SceneId: process.env.REACT_APP_ALI_CAPTCHA_SCENE_ID, // 场景ID。根据步骤二新建验证场景后，您可以在验证码场景列表，获取该场景的场景ID
    prefix: process.env.REACT_APP_ALI_CAPTCHA_PREFIX, // 身份标。开通阿里云验证码2.0后，您可以在控制台概览页面的实例基本信息卡片区域，获取身份标
    mode: 'popup', // 验证码模式。popup表示要集成的验证码模式为弹出式。无需修改
    element: '#sign-up-captcha-element', // 页面上预留的渲染验证码的元素，与原代码中预留的页面元素保持一致。
    button: '#sign-up-submit-button', // 触发验证码弹窗的元素。button表示单击登录按钮后，触发captchaVerifyCallback函数。您可以根据实际使用的元素修改element的值
    captchaVerifyCallback, // 业务请求(带验证码校验)回调函数，无需修改
    onBizResultCallback, // 业务请求结果回调函数，无需修改
    getInstance() {}, // 绑定验证码实例函数，无需修改
    slideStyle: {
      width: 860,
      height: 140
    }, // 滑块验证码样式，支持自定义宽度和高度，单位为px。其中，width最小值为320 px
    language: 'cn' // 验证码语言类型，支持简体中文（cn）、繁体中文（tw）、英文（en）
  })

  const validate = (values: Record<string, string>) => {
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
    signUpParams.current = val
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
            <Link component={RouterLink} to="/login-in/" underline="always">
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
                defaultValue="小布偶毛的一天"
                label="NickName"
                margin="normal"
                name="user_name"
                validate={value => {
                  if (!value) {
                    return '用户名不能为空'
                  }
                  if (value.length < 3) {
                    return '用户名长度过短'
                  }
                }}
                required
              />
              <Field
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                defaultValue="xdz"
                label="UserId"
                margin="normal"
                name="user_id"
                validate={value => {
                  if (!value) {
                    return '用户id不能为空'
                  }
                  if (value.length < 3 || value.length > 12) {
                    return '用户id长度为3至12位'
                  }
                  if (/[\u4E00-\u9FA5]/.test(value)) {
                    return '用户id不能包含中文字符'
                  }
                }}
                required
              />
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                defaultValue="xdz@520.com"
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
                defaultValue="xdzde88"
                name="user_pwd"
                label="Password"
                type="password"
                margin="normal"
                autoComplete="new-password"
                validate={value => {
                  if (!value) {
                    return '密码不能为空'
                  }
                  if (value.length < 6 || value.length > 12) {
                    return '密码长度为6至12位'
                  }
                  if (/[\u4E00-\u9FA5]/.test(value)) {
                    return '密码不能包含中文字符'
                  }
                }}
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

export default SignUp
