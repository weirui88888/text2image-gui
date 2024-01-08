import React, { FC } from 'react'
import PageFooter from '../Footer'

interface PageContentProps {
  children: React.ReactNode
}

const PageContent: FC<PageContentProps> = ({ children }) => {
  return <div style={{ height: 'calc(100vh - 64px)', overflow: 'scroll', position: 'relative' }}>
    <div style={{minHeight:'calc(100% - 88px)'}}>
    {children}
    </div>
    <PageFooter/>
  </div>
}

export default PageContent
