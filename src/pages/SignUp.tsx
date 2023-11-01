import React, { useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Field, Form, FormSpy } from 'react-final-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useLocalStorageState } from 'ahooks'
import Typography from '../components/Typography'
import AppFooter from '../views/AppFooter'
import AppAppBar from '../views/AppAppBar'
import AppForm from '../views/AppForm'
import { email, required } from '../form/validation'
import RFTextField from '../form/RFTextField'
import FormButton from '../form/FormButton'
import FormFeedback from '../form/FormFeedback'
import { ResponseCode } from '../api/api.d'
import { type SignUpParams, signUp } from '../api/signUp'
import SnackbarUtils from '../components/SnackbarUtilsConfigurator'
import { useApp } from '../store/app'
import useCaptcha from '../hooks/useCaptcha'
import { AppTokenKey } from '../config'

function SignUp() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sent, setSent] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [appToken, setAppToken] = useLocalStorageState<string | undefined>(AppTokenKey, {
    serializer: val => val as string,
    deserializer: val => val
  })
  const navigate = useNavigate()
  const signUpParams = useRef<SignUpParams>()
  const { dispatch } = useApp()
  useCaptcha({
    SceneId: process.env.REACT_APP_ALI_CAPTCHA_SIGNUP_SCENE_ID as string,
    prefix: process.env.REACT_APP_ALI_CAPTCHA_PREFIX as string,
    element: '#sign-up-captcha-element',
    button: '#sign-up-submit-button',
    captchaVerifyCallback: async (captchaVerifyParam: string) => {
      const signUpResult = await signUp(captchaVerifyParam, signUpParams.current!)
      if (signUpResult.code !== ResponseCode.OK) {
        SnackbarUtils.error(signUpResult.message)
      }
      const { bizResult, verifyResult, ...userMsg } = signUpResult.data
      if (bizResult && verifyResult) {
        dispatch({
          type: 'loginIn',
          payload: userMsg
        })
        setAppToken(signUpResult.data.token)
      }
      return {
        captchaResult: signUpResult.data.verifyResult,
        bizResult: signUpResult.data.bizResult
      }
    },
    onBizResultCallback: (bizResult: boolean) => {
      if (bizResult) {
        navigate('/')
        SnackbarUtils.success('注册成功')
      }
    }
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

  const handleSubmit = (val: Record<'user_id' | 'user_name' | 'user_email' | 'user_pwd', any>) => {
    signUpParams.current = val
  }

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography
            variant="h3"
            gutterBottom
            suffixBgColor="secondary.contrastText"
            marked="center"
            align="center"
            color="secondary.contrastText"
          >
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link component={RouterLink} to="/login-in" underline="always" color="secondary.contrastText">
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
                defaultValue="布偶猫的一天"
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
                defaultValue="190713"
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
                color="button"
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
