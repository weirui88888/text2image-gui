import React from 'react'
import clsx from 'clsx'
import Box from '@mui/material/Box'
import './index.css'
interface CameraProps {
  generating?: boolean
}

const Camera: React.FC<CameraProps> = ({ generating }) => {
  return (
    <Box className="Camera-container" sx={{ mt: { xs: 0, sm: 20 }, mx: 'auto' }}>
      <Box className="Camera-top">
        <Box className="zoom"></Box>
        <Box className="mode-changer"></Box>
        <Box className="sides"></Box>
        <Box className="range-finder"></Box>
        <Box className="focus"></Box>
        <Box className="red"></Box>
        <Box className="view-finder"></Box>
        <Box className="flash">
          <Box className={clsx({ light: true, generating })}></Box>
        </Box>
      </Box>
      <Box className="Camera-mid">
        <Box className="sensor"></Box>
        <Box className="lens"></Box>
        <Box className="app-name" sx={{ position: 'absolute', left: '16px', bottom: '8px' }} color="common.black">
          AnyPhoto
        </Box>
      </Box>
      <div className="Camera-bottom"></div>
    </Box>
  )
}

Camera.defaultProps = {
  generating: false
}

export default Camera
