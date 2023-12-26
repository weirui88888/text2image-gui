import { FC, ReactNode } from 'react'

import { Button, ButtonProps } from '@geist-ui/core'
import styled from 'styled-components'

interface StyledButtonProps {
  mini?: boolean
}

const StyledButton = styled(Button)<StyledButtonProps>`
  padding: 0 !important;
  width: 2.5rem !important;
  min-width: auto !important;
  border-radius: 50% !important;
  border-width: 2px !important;
`

interface ButtonRoundProps extends ButtonProps {
  icon: ReactNode
  placeholder?: string
}

const ButtonRound: FC<ButtonRoundProps> = ({ icon, placeholder, ...props }) => {
  return (
    <StyledButton
      icon={icon}
      placeholder={placeholder}
      {...props}
      style={{ height: 'auto !important', width: 'auto !important' }}
    />
  )
}

export default ButtonRound
