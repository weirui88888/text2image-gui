import React from 'react'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { BrowserRouter as Router, Routes as ReactRouters, Route } from 'react-router-dom'
import { useLocalStorage } from 'react-use'
import PageContainer from '@/components/Page/Container'
import PageHeader from '@/components/Page/Header'
import PageContent from '@/components/Page/Content'
import PageFooter from '@/components/Page/Footer'
import { RecoilRoot } from 'recoil'
import Home from './pages/home'
import Docs from './pages/docs'

function App() {
  const [theme, setTheme] = useLocalStorage<string>('theme', 'dark', {raw:true})
  const switchTheme = (themeType: string) => {
    setTheme(themeType)
    localStorage.setItem('theme', themeType)
  }

  return (
    <RecoilRoot>
      <GeistProvider themeType={theme}>
        <CssBaseline />
        <Router>
          <PageContainer>
            <PageHeader switchTheme={switchTheme} theme={theme} />
            <PageContent>
              <ReactRouters>
                <Route path="/" element={<Home />} />
                <Route path="/doc" element={<Docs />} />
              </ReactRouters>
            </PageContent>
            <PageFooter />
          </PageContainer>
        </Router>
      </GeistProvider>
    </RecoilRoot>
  )
}

export default App
