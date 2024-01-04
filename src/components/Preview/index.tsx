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
}

const Preview: FC<PreviewProps> = ({ content }) => {
  const userConfig = useRecoilValue(userConfigState)
  const selectFontClassName = useRecoilValue(SelectFontState)
  const [textareaStyle, setTextareaStyle] = useState<CSSProperties>({})

  useEffect(() => {
    const { canvasSetting } = userConfig
    const { backgroundColor, color, linearGradientDirection } = canvasSetting
    if (typeof backgroundColor === 'string') {
      setTextareaStyle({
        background: backgroundColor,
        color
      })
    } else {
      setTextareaStyle({
        color,
        background: `linear-gradient(${linearGradientDirection}, ${backgroundColor.toString()})`
      })
    }
  }, [userConfig])
  return (
    <div className="preview-container">
      <Note label="提示" mb={1}>
        该部分为预览效果图，仅供参考
      </Note>
      <div className="demo-container" style={textareaStyle}>
        <div style={{position:'relative', zIndex:1}}>
        <PreviewHeader />
        <Text p className={selectFontClassName}>
          {content}
        </Text>
        </div>
        <PreviewBackground/>
      </div>
    </div>
  )
}

export default Preview
