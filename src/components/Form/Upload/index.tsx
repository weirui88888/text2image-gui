import React, { FC, useState, useRef, ChangeEvent } from 'react'
import { Input, useModal, Modal } from '@geist-ui/core'
import { UploadCloud } from '@geist-ui/icons'
import Cropper, { type ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import AliOssUpload from '@/utils/aliOssUpload'
import { useRecoilValue } from 'recoil'
import userConfigState from '@/recoil/config'

import objectPath from 'object-path'

interface UploadProps {
  label: string
  placeholder?: string
  uploadModalTitle?: string
  uploadModalSubtitle?: string
  bucketName: string
  directoryName: string
  onSuccess: (url: string) => void
  onCheck?: (url: string) => void
  keyPath: string
  previewRadius?: boolean
  cropper?: boolean
}

interface UploadButtonProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const UploadButton: FC<UploadButtonProps> = ({ onChange }) => {
  return (
    <span style={{ position: 'relative' }}>
      <UploadCloud></UploadCloud>
      <input type="file" style={{ position: 'absolute' }} onChange={onChange} accept="image/*" />
    </span>
  )
}

const Upload: FC<UploadProps> = ({
  label,
  uploadModalTitle,
  uploadModalSubtitle,
  placeholder,
  bucketName,
  directoryName,
  keyPath,
  onSuccess,
  onCheck,
  cropper,
  previewRadius
}) => {
  const { setVisible, bindings } = useModal()
  const [originSource, setOriginSource] = useState('')
  const [uploading, setUploading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const cropperRef = useRef<ReactCropperElement>(null)
  const [uploadFileMeta, setUploadFileMeta] = useState({ type: '', name: '' })
  const userConfig = useRecoilValue(userConfigState)
  const url = objectPath.get(userConfig, keyPath)

  const { upload } = new AliOssUpload({
    bucket: bucketName,
    region: 'oss-cn-beijing',
    domain: 'https://text2image.xdzi8b.cn/',
    directory: directoryName,
    asyncGetStsToken: async () =>
      await Promise.resolve({
        accessKeyId: process.env.REACT_APP_ALI_ACCESS_KEY_ID!,
        accessKeySecret: process.env.REACT_APP_ALI_ACCESS_KEY_SECRET!
      })
  })

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files = e.target.files!
    if (cropper) {
      const { type, name } = files[0]
      setVisible(true)
      setUploadFileMeta({ type, name })
      const reader = new FileReader()
      reader.onload = () => {
        setOriginSource(reader.result as any)
      }
      reader.readAsDataURL(files[0])
    } else {
      const { ossSourceUrl } = await upload({
        file: files[0],
        randomName: false
      })
      onSuccess(ossSourceUrl)
    }
  }

  const onUpload = () => {
    setUploading(true)
    const cropper = cropperRef.current?.cropper
    const cropperCanvas = cropper?.getCroppedCanvas()
    cropperCanvas!.toBlob(async file => {
      const fileObj = new File([file!], uploadFileMeta.name, { type: file!.type })
      const { ossSourceUrl } = await upload({
        file: fileObj,
        randomName: false
      })
      onSuccess(ossSourceUrl)
      setVisible(false)
      setUploading(false)
    }, uploadFileMeta.type)
  }

  return (
    <>
      <Input
        label={label}
        placeholder={placeholder}
        value={url}
        crossOrigin="anonymous"
        onMouseEnter={() => {
          if (url) {
            setShowPreview(true)
          }
        }}
        onMouseLeave={() => {
          setShowPreview(false)
        }}
        iconRight={<UploadButton onChange={onFileChange} />}
        iconClickable
        onChange={e => {
          onSuccess(e.target.value)
        }}
        onBlur={e => {
          onCheck!(e.target.value)
        }}
      />
      {showPreview ? (
        <img
          style={{
            position: 'absolute',
            width: '80px',
            zIndex: 10,
            height: '80px',
            right: '-70px',
            transform: 'translateY(-50%)',
            top: '50%',
            objectFit: 'contain',
            borderRadius: previewRadius ? '50%' : 'none'
          }}
          alt="img"
          src={url}
        />
      ) : null}

      <Modal {...bindings} disableBackdropClick width="50vw">
        <Modal.Title>{uploadModalTitle}</Modal.Title>
        {uploadModalSubtitle && <Modal.Subtitle>{uploadModalSubtitle}</Modal.Subtitle>}
        <Modal.Content>
          <Cropper
            src={originSource}
            initialAspectRatio={1}
            guides={false}
            ref={cropperRef}
            style={{ height: 400, width: '100%' }}
          />
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)} placeholder="cancel">
          取消
        </Modal.Action>
        <Modal.Action loading={uploading} placeholder="submit" onClick={onUpload}>
          确认
        </Modal.Action>
      </Modal>
    </>
  )
}

Upload.defaultProps = {
  placeholder: '请上传或输入地址',
  uploadModalTitle: '请上传',
  onCheck: val => {},
  cropper: true,
  previewRadius: false
}

export default Upload
