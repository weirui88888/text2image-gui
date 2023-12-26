import React, { FC } from 'react'
import { Input, useModal, Modal } from '@geist-ui/core'
import { Circle } from '@geist-ui/icons'
import { HexColorPicker } from 'react-colorful'
import { validateHTMLColorHex } from 'validate-color'
import { useSetUserConfig } from '@/hooks/useSetUserConfig'

interface PaletteProps {
  label: string
  placeholder?: string
  fallbackValue?: string
  paletteModalTitle?: string
  paletteModalSubtitle?: string
  keyPath: string
}

const Palette: FC<PaletteProps> = ({
  keyPath,
  label,
  placeholder,
  fallbackValue,
  paletteModalTitle,
  paletteModalSubtitle
}) => {
  const { setVisible, bindings } = useModal()
  const { value, set } = useSetUserConfig({ keyPath })

  const onIconClick = () => {
    setVisible(true)
  }
  const onColorChange = (color: string) => {
    set(color)
  }

  return (
    <>
      <Input
        label={label}
        onChange={e => {
          onColorChange(e.target.value)
        }}
        placeholder={placeholder}
        value={value}
        crossOrigin="anonymous"
        iconRight={<Circle fill={value} stroke={value} />}
        iconClickable
        onIconClick={onIconClick}
        onBlur={e => {
          if (!validateHTMLColorHex(e.target.value)) {
            onColorChange(fallbackValue!)
          }
        }}
      />
      <Modal {...bindings} width="auto">
        <Modal.Title>{paletteModalTitle ? paletteModalTitle : `请选择${label}`}</Modal.Title>
        {paletteModalSubtitle && <Modal.Subtitle>{paletteModalSubtitle}</Modal.Subtitle>}
        <Modal.Content>
          <HexColorPicker color={value} onChange={onColorChange} />
        </Modal.Content>
      </Modal>
    </>
  )
}

Palette.defaultProps = {
  placeholder: '请选择或输入颜色',
  fallbackValue: '#000000'
}

export default Palette
