import React, { FC, Dispatch, SetStateAction, memo, useEffect } from 'react'
import { Tag, Text, Display, Image, Modal, Spinner, useTheme } from '@geist-ui/core'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { integratedThemes, pickedThemeName } from '@/recoil/theme'
import './index.css'

interface ThemeModalProps {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const ThemeModal: FC<ThemeModalProps> = ({ isVisible, setIsVisible }) => {
  const themeLoadable = useRecoilValueLoadable(integratedThemes)
  const [selectTheme, setSelectTheme] = useRecoilState(pickedThemeName)
  useEffect(() => {
    if (isVisible) {
      const index = themeLoadable.contents.findIndex((content: any) => content.name === selectTheme)
      if (index !== -1) {
        setTimeout(() => {
          const selectThemeOffsetLeft = document.querySelector('.select-theme') as HTMLDivElement
          selectThemeOffsetLeft.scrollIntoView({
            inline: 'center'
          })
        }, 100)
      }
    }
  }, [isVisible])
  const {
    palette: { border }
  } = useTheme()
  return (
    <Modal
      width="90vw"
      visible={isVisible}
      onClose={() => {
        setIsVisible(false)
      }}
    >
      <Modal.Title>integrated themes</Modal.Title>
      <Modal.Subtitle>Choose the theme you like and configure it accordingly</Modal.Subtitle>
      <Modal.Content>
        {themeLoadable.state === 'loading' ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <Spinner />
          </div>
        ) : (
          <div style={{ display: 'flex', overflow: 'scroll' }} className="theme-container">
            {themeLoadable.contents.map((theme: any, index: number) => {
              return (
                <div
                  style={{
                    cursor: 'pointer',
                    flexShrink: 0,
                    padding: '10px',
                    width: '300px',
                    border: `1px solid ${border}`,
                    borderRadius: '6px',
                    marginRight: index === themeLoadable.contents.length - 1 ? '0' : '16px'
                  }}
                  key={theme.name}
                  className={selectTheme === theme.name ? 'select-theme' : ''}
                  onClick={() => {
                    setSelectTheme(theme.name)
                    setIsVisible(false)
                  }}
                >
                  <Text h6 style={{ marginBottom: '0' }}>
                    {theme.name}
                  </Text>
                  <Text p style={{ height: '64px' }}>
                    {theme.description}
                  </Text>
                  <Display
                    shadow
                    caption={
                      <div style={{ margin: 0 }}>
                        {theme.tags.map((tag: string, index: number) => (
                          <Tag type="secondary" scale={0.75} className="theme-tag" key={index}>
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    }
                    style={{ margin: 0 }}
                  >
                    <Image width="100%" height="300px" src={theme.preview} />
                  </Display>
                </div>
              )
            })}
          </div>
        )}
      </Modal.Content>
    </Modal>
  )
}

export default memo(ThemeModal)
