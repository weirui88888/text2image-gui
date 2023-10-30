import React from 'react'

interface AnyphotoResultProps {
  generatedPhotoUrl: string
  isGenerate: boolean
}

const AnyphotoResult: React.FC<AnyphotoResultProps> = ({ generatedPhotoUrl, isGenerate }) => {
  return <div>{generatedPhotoUrl ? <img src={generatedPhotoUrl} style={{ width: '100%' }} /> : null}</div>
}
export default AnyphotoResult
