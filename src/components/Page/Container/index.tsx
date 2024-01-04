import React, { FC } from 'react'
import { Page } from '@geist-ui/core'
import './index.css'

const index: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Page
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '1400px'
      }}
    >
      {children}
    </Page>
  )
}

export default index
