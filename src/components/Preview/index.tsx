import { FC, useState, useEffect, CSSProperties } from 'react'
import { useRecoilValue } from 'recoil'
import userConfigState from '@/recoil/config'
import SelectFontState from '@/recoil/selectFont'
import { Note, Text } from '@geist-ui/core'
import './index.css'
import PreviewHeader from './header'
import PreviewBackground from './background'

interface PreviewProps {
  content: string
  upLg: boolean
}

const Preview: FC<PreviewProps> = ({ content, upLg }) => {
  const userConfig = useRecoilValue(userConfigState)
  const {
    canvasSetting: {
      from: { showFrom, name },
      footer: { showFooter, slogan, sloganPosition, sloganFontColor }
    }
  } = userConfig
  const selectFontClassName = useRecoilValue(SelectFontState)
  const [demoContainerStyle, setDemoContainerStyle] = useState<CSSProperties>({})
  const [contentStyle, setContentStyle] = useState<CSSProperties>({})
  const [previewStyle, setPreviewStyle] = useState<CSSProperties>({})

  useEffect(() => {
    if (upLg) {
      setPreviewStyle({})
    } else {
      setPreviewStyle({
        width: '100%',
        paddingLeft: 0
      })
    }
  }, [upLg])

  useEffect(() => {
    const { canvasSetting } = userConfig
    const { backgroundColor, color, linearGradientDirection, x, y,lineGap,width } = canvasSetting
    if (typeof backgroundColor === 'string') {
      setDemoContainerStyle({
        background: backgroundColor,
        color,
        paddingLeft: `${x}px`,
        paddingRight: `${x}px`
      })
    } else {
      setDemoContainerStyle({
        color,
        background: `linear-gradient(${linearGradientDirection}, ${backgroundColor.toString()})`,
        paddingLeft: `${x}px`,
        paddingRight: `${x}px`
      })
    }
    setPreviewStyle(previewStyle=>{
      return {
        ...previewStyle,
        width:`${500+width/15}px`
      }
    })
    setContentStyle({
      paddingTop: `${y}px`,
      paddingBottom: `${y}px`,
      lineHeight:`${lineGap*1.3}px`
    })
  }, [userConfig])
  return (
    <div className="preview-container" style={previewStyle}>
      <Note label="提示" mb={1}>
        该部分为预览效果图，仅供参考。
      </Note>
      <div className="demo-container" style={demoContainerStyle}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <PreviewHeader />
          <Text p className={selectFontClassName} my={0} style={contentStyle}>
            {content.replace(/[{}]/g, '')}
          </Text>
          {showFrom && name ? (
            <Text p className={selectFontClassName}>
              {name}
            </Text>
          ) : null}

          {showFooter && slogan ? (
            // @ts-ignore
            <Text p className={selectFontClassName} style={{ textAlign: sloganPosition, color: sloganFontColor }}>
              {slogan}
            </Text>
          ) : null}
        </div>
        <PreviewBackground />
      </div>
    </div>
  )
}

export default Preview
