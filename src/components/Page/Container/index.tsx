import React, { FC } from 'react'
import { Page } from '@geist-ui/core'
import './index.css'

const index: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Page
      dotBackdrop
      dotSize={5}
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '1000px'
      }}
    >
      {children}
    </Page>
  )
}

export default index
