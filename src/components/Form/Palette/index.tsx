import { FC } from 'react'
import { Input, useModal, Modal, Button } from '@geist-ui/core'
import { Circle, Plus, Minus } from '@geist-ui/icons'
import { HexColorPicker } from 'react-colorful'
import { validateHTMLColorHex } from 'validate-color'
import { useSetUserConfig } from '@/hooks/useSetUserConfig'
import { useDebouncedCallback } from 'use-debounce'
interface PaletteProps {
  label: string
  placeholder?: string
  fallbackValue?: string
  paletteModalTitle?: string
  paletteModalSubtitle?: string
  keyPath: string
  linearGradientDirectionKeyPath?: string
  multiple?: boolean
}

const Palette: FC<PaletteProps> = ({
  keyPath,
  linearGradientDirectionKeyPath,
  label,
  placeholder,
  fallbackValue,
  paletteModalTitle,
  paletteModalSubtitle,
  multiple
}) => {
  const { setVisible, bindings } = useModal()
  const { value, set } = useSetUserConfig({ keyPath })
  const onIconClick = () => {
    setVisible(true)
  }
  const onColorChange = (color: string) => {
    set(color)
  }

  const debouncedColorChanged = useDebouncedCallback((color, index) => {
    const colors = [...value]
    colors[index] = color
    set(colors)
  }, 1000)

  const addColor = () => {
    if (typeof value === 'string') {
      set([value, '#ff0000'])
    } else {
      set([...value, '#ff0000'])
    }
  }

  const deleteColor = (index: number) => {
    const colors = [...value]
    colors.splice(index, 1)
    if (colors.length === 1) {
      set(colors[0])
    } else {
      set(colors)
    }
  }

  const LinearGradientIcon = () => {
    const { value: linearGradientDirection } = useSetUserConfig({ keyPath: linearGradientDirectionKeyPath! })
    return (
      <div
        style={{
          background: `linear-gradient(${linearGradientDirection}, ${value.toString()})`,
          width: '100%',
          height: '100%',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      ></div>
    )
  }

  const IconRight = () => {
    return typeof value === 'string' ? <Circle fill={value} stroke={value} /> : <LinearGradientIcon />
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
        iconRight={<IconRight />}
        iconClickable
        onIconClick={onIconClick}
        onBlur={e => {
          const colors = e.target.value.trim()
          const inputColors = colors.split(',').map(color => color.trim())
          const validColors = inputColors.every(color => validateHTMLColorHex(color))
          if (!validColors) {
            onColorChange(fallbackValue!)
          } else {
            if (inputColors.length > 1) {
              set(inputColors)
            }
          }
        }}
      />
      <Modal {...bindings} width="auto">
        <Modal.Title>{paletteModalTitle ? paletteModalTitle : `请选择${label}`}</Modal.Title>
        {paletteModalSubtitle && <Modal.Subtitle>{paletteModalSubtitle}</Modal.Subtitle>}
        <Modal.Content style={{ maxHeight: '50vh', overflow: 'scroll' }}>
          {typeof value === 'string' ? (
            <HexColorPicker color={value} onChange={onColorChange} />
          ) : (
            value.map((color: string, index: number) => {
              return (
                <div style={{ position: 'relative', padding: '0 30px' }} key={`${color}-${index}`}>
                  <HexColorPicker
                    style={{ marginTop: index !== 0 ? '1.5rem' : 0 }}
                    color={color}
                    onChange={val => {
                      debouncedColorChanged(val, index)
                    }}
                  />
                  <Button
                    style={{
                      position: 'absolute',
                      zIndex: 10,
                      left: '50%',
                      bottom: '2rem',
                      transform: 'translateX(-50%)'
                    }}
                    placeholder="remove-color"
                    auto
                    icon={<Minus />}
                    scale={1 / 3}
                    px={0.5}
                    title={`删除该${label}`}
                    onClick={() => deleteColor(index)}
                  />
                </div>
              )
            })
          )}
          {multiple ? (
            <Button
              style={{ margin: '1rem auto 0', display: 'block' }}
              placeholder="add-color"
              auto
              icon={<Plus />}
              scale={1 / 3}
              px={0.5}
              title={`添加更多${label}`}
              onClick={addColor}
            />
          ) : null}
        </Modal.Content>
      </Modal>
    </>
  )
}

Palette.defaultProps = {
  placeholder: '请选择或输入颜色',
  fallbackValue: '#000000',
  multiple: false
}

export default Palette
