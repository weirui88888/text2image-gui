import { FC, useState, useEffect } from 'react'

import { Grid, Page, Text } from '@geist-ui/core'
import { Book, Moon, Settings, Sun } from '@geist-ui/icons'
import ButtonRound from '@/components/ButtonRound'
import Logo from '@/components/Logo'
import TemplateSettingDrawer from '@/components/TemplateSettingDrawer'
import { format } from 'date-fns'

interface PageHeaderProps {
  theme?: string
  switchTheme: (theme: string) => any
}

const PageHeader: FC<PageHeaderProps> = ({ theme = 'dark', switchTheme }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div style={{ height: '64px', display: 'flex', alignItems: 'center' }}>
      <Page.Header center>
        <Grid.Container alignItems="center" gap={1} justify="space-between">
          <Grid sm>
            <Grid.Container alignItems="center" gap={1}>
              <Grid>
                <Logo />
              </Grid>
              <Grid
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  transform: 'translateY(-2px)'
                }}
              >
                <Text
                  b
                  span
                  margin={0}
                  style={{ display: 'block', cursor: 'pointer' }}
                  onClick={() => {
                    console.log('home')
                  }}
                >
                  text2image-gui
                </Text>
                <Text span font={0.7}>
                  {format(time, 'yyyy/MM/dd HH:mm:ss')}
                </Text>
              </Grid>
            </Grid.Container>
          </Grid>
          <Grid>
            <Grid.Container alignItems="center" gap={1}>
              <Grid>
                <ButtonRound
                  auto
                  aria-label="Glossary"
                  icon={<Book />}
                  onClick={() => {
                    console.log('docs')
                  }}
                />
              </Grid>
              <Grid>
                <ButtonRound
                  auto
                  aria-label="Theme"
                  icon={theme === 'dark' ? <Moon /> : <Sun />}
                  onClick={() => switchTheme(theme === 'dark' ? 'light' : 'dark')}
                />
              </Grid>
              <Grid>
                <ButtonRound auto aria-label="Settings" icon={<Settings />} onClick={() => setIsDrawerVisible(true)} />
              </Grid>
            </Grid.Container>
            <TemplateSettingDrawer isVisible={isDrawerVisible} setIsVisible={setIsDrawerVisible} />
          </Grid>
        </Grid.Container>
      </Page.Header>
    </div>
  )
}

export default PageHeader
