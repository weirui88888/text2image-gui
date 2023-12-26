import React, { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import './index.css'

interface FadeTransitionProps {
  visible: boolean
  children: React.ReactNode
}

const FadeTransition: FC<FadeTransitionProps> = ({ visible, children }) => {
  return (
    <CSSTransition in={visible} timeout={300} classNames="fade" unmountOnExit>
      {children}
    </CSSTransition>
  )
}

export default FadeTransition
