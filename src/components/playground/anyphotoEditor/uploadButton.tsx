import React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AliOssUpload from './utils/AliOssUpload'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

interface UploadButtonProps {
  fieldName?: string
  bucketName: string
  directoryName: string
  onSuccess: (url: string) => void
}

const UploadButton: React.FC<UploadButtonProps> = ({ fieldName, bucketName, directoryName, onSuccess }) => {
  const { upload } = new AliOssUpload({
    bucket: bucketName,
    region: 'oss-cn-beijing',
    domain: 'https://anyphoto.newarray.vip/',
    directory: directoryName,
    asyncGetStsToken: async () =>
      await Promise.resolve({
        accessKeyId: process.env.REACT_APP_ALI_ACCESSKEYID!,
        accessKeySecret: process.env.REACT_APP_ALI_ACCESSKEYSECRET!
      })
  })

  const onUploadFile = async (e: any) => {
    const file = e.target.files[0]
    const { ossSrc } = await upload({
      file,
      randomName: true
    })
    onSuccess(ossSrc)
  }
  return (
    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload {fieldName}
      <VisuallyHiddenInput type="file" onChange={onUploadFile} />
    </Button>
  )
}

UploadButton.defaultProps = {
  fieldName: 'file'
}

export default UploadButton
