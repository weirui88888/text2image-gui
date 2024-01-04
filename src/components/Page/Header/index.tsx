import { FC, useState, useEffect } from 'react'

import { Grid, Page, Text, useKeyboard, KeyCode, KeyMod, useMediaQuery } from '@geist-ui/core'
import { Book, Moon, Settings, Sun, Github, MoreVertical, Aperture } from '@geist-ui/icons'
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
  const upSM = useMediaQuery('sm', { match: 'up' })
  useKeyboard(() => {
    setIsUserSettingModalVisible(true)
  }, [KeyMod.CtrlCmd, KeyCode.KEY_S])

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
      <Page.Header>
        <Grid.Container alignItems="center" justify="space-between">
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
                  transform: 'translateY(-2px)',
                  paddingLeft: 0
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
            {upSM ? (
              <Grid.Container alignItems="center" gap={1}>
                <Grid>
                  <ButtonRound auto aria-label="Aperture" icon={<Aperture />} title="Template" onClick={() => {}} />
                </Grid>
                <Grid>
                  <ButtonRound
                    auto
                    aria-label="About"
                    title="About"
                    icon={<Book />}
                    onClick={() => {
                      console.log('docs')
                    }}
                  />
                </Grid>
                <Grid>
                  <ButtonRound
                    auto
                    aria-label="Github"
                    title="Github"
                    icon={<Github />}
                    onClick={() => window.open('https://github.com/weirui88888/text2image-gui', '_blank')}
                  />
                </Grid>
                <Grid>
                  <ButtonRound
                    auto
                    aria-label="Theme"
                    title="Theme"
                    icon={theme === 'dark' ? <Moon /> : <Sun />}
                    onClick={() => switchTheme(theme === 'dark' ? 'light' : 'dark')}
                  />
                </Grid>
                <Grid>
                  <ButtonRound
                    auto
                    aria-label="Settings"
                    title="Settings"
                    icon={<Settings />}
                    onClick={() => setIsUserSettingModalVisible(true)}
                  />
                </Grid>
              </Grid.Container>
            ) : (
              <Grid.Container alignItems="center" gap={1}>
                <Grid>
                  <ButtonRound auto aria-label="Aperture" icon={<Aperture />} onClick={() => {}} />
                </Grid>
                <Grid>
                  <ButtonRound auto aria-label="Theme" icon={<MoreVertical />} onClick={() => {}} />
                </Grid>
              </Grid.Container>
            )}
          </Grid>
        </Grid.Container>
        <UserSettingModal isVisible={isUserSettingModalVisible} setIsVisible={setIsUserSettingModalVisible} />
      </Page.Header>
    </div>
  )
}

export default PageHeader
