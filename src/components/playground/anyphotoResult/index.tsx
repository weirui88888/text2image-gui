import React from 'react'
import Box from '@mui/material/Box'

interface AnyphotoResultProps {
  generatedPhotoUrl: string
  isGenerate: boolean
}

const AnyphotoResult: React.FC<AnyphotoResultProps> = ({ generatedPhotoUrl, isGenerate }) => {
  return <Box>{generatedPhotoUrl ? <img src={generatedPhotoUrl} style={{ width: '100%' }} /> : null}</Box>
}
export default AnyphotoResult
