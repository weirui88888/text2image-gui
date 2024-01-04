import React, { FC, useEffect } from 'react'
import { useTheme, Select } from '@geist-ui/core'
import { useSetUserConfig } from '@/hooks/useSetUserConfig'
import { useSetRecoilState } from 'recoil'
import SelectFontState from '@/recoil/selectFont'
import './index.css'

interface LabelSelectProps {
  options: { key: string; value: string; className?: string }[]
  label: string
  keyPath: string
  placeholder?: string
  isFontSelect?: boolean
}

const LabelSelect: FC<LabelSelectProps> = ({ keyPath, label, options, placeholder, isFontSelect }) => {
  const { palette } = useTheme()
  const { value, set } = useSetUserConfig({ keyPath })
  const setSelectFontClassName = useSetRecoilState(SelectFontState)

  useEffect(() => {
    if (options && isFontSelect) {
      const { className } = options.find(option => option.value === value) as any
      setSelectFontClassName(className)
    }
  }, [value])
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        color: '#666',
        backgroundColor: `${palette.accents_1}`,
        borderRadius: '6px',
        border: `1px solid ${palette.border}`,
        height: '36px',
        lineHeight: '36px',
        fontSize: '14px'
      }}
    >
      <label style={{ whiteSpace: 'nowrap', padding: '0 8pt', borderRight: `1px solid ${palette.border}` }}>
        {label}
      </label>
      <Select
        value={value}
        placeholder={placeholder}
        style={{
          flex: 1,
          background: `${palette.background}`,
          border: 'none',
          height: '34px',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: '6px',
          borderBottomRightRadius: '6px',
          minWidth: 'inherit'
        }}
        onChange={val => set(val)}
      >
        {options
          ? options.map((option, index) => {
              return (
                <Select.Option value={option.value} key={`${option.key}-${index}`} className={option.className ?? ''}>
                  {option.key}
                </Select.Option>
              )
            })
          : null}
      </Select>
    </div>
  )
}

LabelSelect.defaultProps = {
  placeholder: '',
  isFontSelect: false
}

export default LabelSelect
