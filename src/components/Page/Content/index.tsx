import React, { FC } from 'react'

interface PageContentProps {
  children: React.ReactNode
}

const PageContent: FC<PageContentProps> = ({ children }) => {
  return <div style={{ minHeight: 'calc(100vh - 128px)', padding: '24px 0', position: 'relative' }}>{children}</div>
}

export default PageContent
