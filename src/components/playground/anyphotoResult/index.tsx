import React, { useEffect, useState } from 'react'
import Camera from '../camera'
import { styled } from '@mui/material/styles'
import Fade from '@mui/material/Fade'

interface AnyphotoResultProps {
  generatedPhotoUrl: string
  isGenerate: boolean
}

const AnimatedImage = styled('img')(() => ({
  width: '100%',
  cursor: 'pointer'
}))

const CameraOrAnimatedImage: React.FC<{ generatedPhotoUrl: string }> = ({ generatedPhotoUrl }) => {
  const [showImg, setShowImg] = useState(false)

  useEffect(() => {
    setShowImg(Boolean(generatedPhotoUrl))
  }, [generatedPhotoUrl])
  return (
    <>
      {generatedPhotoUrl ? null : <Camera />}
      <Fade in={showImg} timeout={2000}>
        <AnimatedImage src={generatedPhotoUrl} />
      </Fade>
    </>
  )
}

const AnyphotoResult: React.FC<AnyphotoResultProps> = ({ generatedPhotoUrl, isGenerate }) => {
  return isGenerate ? <Camera generating /> : <CameraOrAnimatedImage generatedPhotoUrl={generatedPhotoUrl} />
}
export default AnyphotoResult
