import { useRecoilValue } from 'recoil'
import userConfigState from '@/recoil/config'
import SelectFontState from '@/recoil/selectFont'
import { Text } from '@geist-ui/core'

const PreviewHeader = () => {
  const userConfig = useRecoilValue(userConfigState)
  const selectFontClassName = useRecoilValue(SelectFontState)
  const {
    avatar,
    title,
    canvasSetting: {
      width,
      header: {
        showHeaderAvatar,
        showHeaderTitle,
        headerAlign,
        showHeaderDescription,
        headerDescriptionPrefix,
        headerAvatarBorderWidth,
        headerAvatarBorderColor,
        headerAvatarMarginBottom,
        headerTitleFontColor,
        headerDescriptionFontColor
      }
    }
  } = userConfig
  const scale = 500 / width
  const getHeaderAlignItems = (headerAlign: 'left' | 'center' | 'right') => {
    switch (headerAlign) {
      case 'left':
        return 'flex-start'
      case 'center':
        return 'center'
      case 'right':
        return 'flex-end'
      default:
        return 'center'
    }
  }
  return (
    <div
      className="zh-MaShanZheng"
      style={{ display: 'flex', flexDirection: 'column', alignItems: getHeaderAlignItems(headerAlign) }}
    >
      {showHeaderAvatar && avatar ? (
        <img
          src={avatar}
          alt="avatar"
          style={{
            width: `56px`,
            height: `56px`,
            borderRadius: '50%',
            marginBottom: `${headerAvatarMarginBottom * scale}px`,
            border: `${headerAvatarBorderWidth}px solid ${headerAvatarBorderColor}`
          }}
        />
      ) : null}
      {showHeaderTitle && title ? (
        <Text p mb={0} font={1.3} className={selectFontClassName} style={{color:headerTitleFontColor}}>
          {title}
        </Text>
      ) : null}
      {showHeaderDescription && headerDescriptionPrefix ? (
        <Text p my={0} className={selectFontClassName} style={{color:headerDescriptionFontColor}}>
          {headerDescriptionPrefix}
        </Text>
      ) : null}
    </div>
  )
}

export default PreviewHeader
