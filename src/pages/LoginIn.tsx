import React, { useState, useRef } from 'react'
import { Field, Form, FormSpy } from 'react-final-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { useLocalStorageState } from 'ahooks'
import Typography from '../components/Typography'
import AppFooter from '../views/AppFooter'
import AppAppBar from '../views/AppAppBar'
import AppForm from '../views/AppForm'
import { isEmail, required } from '../form/validation'
import RFTextField from '../form/RFTextField'
import FormButton from '../form/FormButton'
import FormFeedback from '../form/FormFeedback'
import { ResponseCode } from '../api/api.d'
import { type LoginInParams, loginIn } from '../api/loginIn'
import SnackbarUtils from '../components/SnackbarUtilsConfigurator'
import { useApp } from '../store/app'
import useCaptcha from '../hooks/useCaptcha'
import { AppTokenKey } from '../config'

function SignIn() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sent, setSent] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [appToken, setAppToken] = useLocalStorageState<string | undefined>(AppTokenKey, {
    serializer: val => val as string,
    deserializer: val => val
  })
  const loginInParams = useRef<Omit<LoginInParams, 'user_identifier_type'>>()
  const { dispatch } = useApp()
  const navigate = useNavigate()

  useCaptcha({
    SceneId: process.env.REACT_APP_ALI_CAPTCHA_LOGININ_SCENE_ID as string,
    prefix: process.env.REACT_APP_ALI_CAPTCHA_PREFIX as string,
    element: '#login-in-captcha-element',
    button: '#login-in-submit-button',
    captchaVerifyCallback: async (captchaVerifyParam: string) => {
      const userLoginInIdentifierType = isEmail(loginInParams.current?.user_identifier!) ? 'user_email' : 'user_id'
      const loginInResult = await loginIn(captchaVerifyParam, {
        ...loginInParams.current!,
        user_identifier_type: userLoginInIdentifierType
      })
      if (loginInResult.code !== ResponseCode.OK) {
        SnackbarUtils.error(loginInResult.message)
      }
      const { bizResult, verifyResult, ...userMsg } = loginInResult.data
      if (bizResult && verifyResult) {
        dispatch({
          type: 'loginIn',
          payload: userMsg
        })
        console.log(loginInResult.data)
        setAppToken(loginInResult.data.token)
      }
      console.log(loginInResult.data)
      return {
        captchaResult: loginInResult.data.verifyResult,
        bizResult: loginInResult.data.bizResult
      }
    },
    onBizResultCallback: (bizResult: boolean) => {
      if (bizResult) {
        navigate('/')
        SnackbarUtils.success('登录成功')
      }
    }
  })

  const validate = (values: Record<string, string>) => {
    const errors = required(['user_identifier', 'user_pwd'], values)
    return errors
  }

  const handleSubmit = (val: Record<'user_identifier' | 'user_pwd', any>) => {
    loginInParams.current = val
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
            Login In
          </Typography>
          <Typography variant="body2" align="center" color="secondary.contrastText">
            {'Not a member yet? '}
            <Link
              component={RouterLink}
              to="/sign-up/"
              align="center"
              underline="always"
              color="secondary.contrastText"
              fontWeight="bolder"
            >
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true, invalid: true }} validate={validate}>
          {({ handleSubmit: handleSubmit2, submitting, invalid }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email Or UserId"
                margin="normal"
                defaultValue="xdz@520.com"
                name="user_identifier"
                required
                size="large"
                validate={value => {
                  if (!value) {
                    return '用户标识符不能为空，使用用户邮箱或ID'
                  }
                  if (/[\u4E00-\u9FA5]/.test(value)) {
                    return '用户标识符不能包含中文字符'
                  }
                }}
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                defaultValue="190713"
                name="user_pwd"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
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
                      123
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <div id="login-in-captcha-element"></div>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={invalid || submitting || sent}
                size="large"
                color="button"
                fullWidth
                id="login-in-submit-button"
              >
                {submitting || sent ? 'In progress…' : 'Login In'}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link
            underline="always"
            component={RouterLink}
            to="/forgot-password/"
            color="secondary.contrastText"
            fontWeight="bolder"
          >
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  )
}

export default SignIn
