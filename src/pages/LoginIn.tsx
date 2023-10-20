import React, { useState } from 'react'
import { Field, Form, FormSpy } from 'react-final-form'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '../components/Typography'
import AppFooter from '../views/AppFooter'
import AppAppBar from '../views/AppAppBar'
import AppForm from '../views/AppForm'
import { email, required } from '../form/validation'
import RFTextField from '../form/RFTextField'
import FormButton from '../form/FormButton'
import FormFeedback from '../form/FormFeedback'
import withRoot from '../withRoot'
import { Link as RouterLink } from 'react-router-dom'

function SignIn() {
  const [sent, setSent] = useState(false)

  const validate = (values: Record<string, string>) => {
    const errors = required(['email', 'password'], values)

    if (!errors.email) {
      const emailError = email(values.email)
      if (emailError) {
        errors.email = emailError
      }
    }

    return errors
  }

  const handleSubmit = () => {
    setSent(true)
  }

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Login In
          </Typography>
          <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link component={RouterLink} to="/sign-up/" align="center" underline="always">
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true }} validate={validate}>
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
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
              <FormButton sx={{ mt: 3, mb: 2 }} disabled={submitting || sent} size="large" color="secondary" fullWidth>
                {submitting || sent ? 'In progress…' : 'Login In'}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" component={RouterLink} to="/forgot-password/">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  )
}

export default withRoot(SignIn)
