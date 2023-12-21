import { FC, useState, useEffect } from 'react'

import { Grid, Page, Text, useKeyboard, KeyCode, KeyMod } from '@geist-ui/core'
import { Book, Moon, Settings, Sun } from '@geist-ui/icons'
import ButtonRound from '@/components/ButtonRound'
import Logo from '@/components/Logo'
import UserSettingModal from '@/components/UserSettingModal'
import { format } from 'date-fns'

interface PageHeaderProps {
  theme?: string
  switchTheme: (theme: string) => any
}

const PageHeader: FC<PageHeaderProps> = ({ theme = 'dark', switchTheme }) => {
  const [isUserSettingModalVisible, setIsUserSettingModalVisible] = useState(false)
  const [time, setTime] = useState(new Date())

  useKeyboard(() => {
    setIsUserSettingModalVisible(true)
  }, [KeyCode.KEY_S, KeyMod.CtrlCmd])

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
                  span
                  margin={0}
                  style={{ display: 'block', cursor: 'pointer' }}
                  onClick={() => {
                    console.log('home')
                  }}
                >
                  text2image-gui
                </Text>
                <Text span font={0.7} style={{ letterSpacing: '1px' }}>
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
                <ButtonRound
                  auto
                  aria-label="Settings"
                  icon={<Settings />}
                  onClick={() => setIsUserSettingModalVisible(true)}
                />
              </Grid>
            </Grid.Container>
            <UserSettingModal isVisible={isUserSettingModalVisible} setIsVisible={setIsUserSettingModalVisible} />
          </Grid>
        </Grid.Container>
      </Page.Header>
    </div>
  )
}

export default PageHeader
