import React, { FC } from 'react'
import { SwitchTransition, Transition, TransitionStatus } from 'react-transition-group'
import styled from 'styled-components'

type FadeDivProps = {
  state: TransitionStatus
}

const FadeDiv = styled.span<FadeDivProps>`
  transition: 0.5s;
  display: inline-block !important;
  opacity: ${({ state }) => (state === 'entered' ? 1 : 0)};
  display: ${({ state }) => (state === 'exited' ? 'none' : 'block')};
`
interface FadeTransitionProps {
  children: React.ReactNode
  unmountOnExit: boolean
  mountOnEnter: boolean
  timeout: number
}

const FadeTransition: FC<FadeTransitionProps> = ({ children, ...rest }) => (
  <Transition {...rest}>{state => <FadeDiv state={state}>{children}</FadeDiv>}</Transition>
)

interface SwitchFadeTransitionProps {
  valid: boolean
  children1: React.ReactNode
  children2: React.ReactNode
}

const SwitchFadeTransition: FC<SwitchFadeTransitionProps> = ({ valid, children1, children2 }) => {
  return (
    <SwitchTransition mode="out-in">
      <FadeTransition key={valid ? 'valid-children' : 'invalid-children'} timeout={50} unmountOnExit mountOnEnter>
        {valid ? children1 : children2}
      </FadeTransition>
    </SwitchTransition>
  )
}

export default SwitchFadeTransition
