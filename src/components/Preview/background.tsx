import { useRecoilValue } from 'recoil'
import userConfigState from '@/recoil/config'

const PreviewBackground = () => {
  const userConfig = useRecoilValue(userConfigState)
  const {
    canvasSetting: {
      backgroundLineSpacing,
      backgroundLineColor,
      backgroundImage
    }
  } = userConfig

  const getBackground = () => {
    if (backgroundImage) {
      return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat:'no-repeat'
      }
    }
    if (backgroundLineSpacing > 0) {
      return {
backgroundImage: `linear-gradient(0deg, ${backgroundLineColor} 0px, ${backgroundLineColor} 1px, transparent 1px, transparent 100px), linear-gradient(90deg, ${backgroundLineColor} 0px, ${backgroundLineColor} 1px, transparent 1px, transparent 100px)`,
        backgroundSize: `${backgroundLineSpacing}px ${backgroundLineSpacing}px`,
      }
    }
    return {}
  }



  
  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        content: "''",
        width: '100%',
        height: '100%',
        ...getBackground()
      }}
    >
    </div>
  )
}

export default PreviewBackground
