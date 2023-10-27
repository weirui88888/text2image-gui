import React from 'react'
import { type FieldRenderProps } from 'react-final-form'
import TextField, { type AnyPhotoTextFieldProps } from '../components/TextField'

function RFTextField(props: AnyPhotoTextFieldProps & FieldRenderProps<string, HTMLElement>) {
  const {
    autoComplete,
    input,
    InputProps,
    meta: { touched, error, submitError },
    ...other
  } = props

  return (
    <TextField
      error={Boolean(!!touched && (error || submitError))}
      {...input}
      {...other}
      InputLabelProps={{
        sx: {
          color: 'secondary.contrastText'
        }
      }}
      InputProps={{
        inputProps: {
          autoComplete
        },
        ...InputProps
      }}
      helperText={touched ? error || submitError : ''}
      variant="standard"
    />
  )
}

export default RFTextField
