import React from 'react'
import { ButtonProps } from '@mui/material'
import Button from '../components/Button'
import defer from './defer'

interface FormButtonProps {
  disabled?: boolean
  mounted?: boolean
}

function FormButton(props: FormButtonProps & ButtonProps) {
  const { disabled, mounted, ...others } = props
  return <Button disabled={!mounted || !!disabled} type="submit" variant="contained" {...others} />
}
export default defer(FormButton)
