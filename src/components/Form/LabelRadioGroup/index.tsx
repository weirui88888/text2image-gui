import { FC } from 'react'
import { Radio, useTheme } from '@geist-ui/core'
import { useSetUserConfig } from '@/hooks/useSetUserConfig'
import './index.css'

interface RadioGroupProps {
  options: { key: string; value: string }[]
  label: string
  keyPath: string
}
const RadioGroup: FC<RadioGroupProps> = ({ label, options, keyPath }) => {
  const { value, set } = useSetUserConfig({ keyPath })
  const { palette } = useTheme()
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
      <label style={{ padding: '0 8pt', borderRight: `1px solid ${palette.border}` }}>{label}</label>
      <Radio.Group
        value={value}
        onChange={val => {
          set(val)
        }}
        useRow
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'space-around',
          background: `${palette.background}`,
          borderTopRightRadius: '6px',
          borderBottomRightRadius: '6px'
        }}
      >
        {options.map(option => {
          return (
            <Radio key={option.value} value={option.value} className="custom-radio">
              {option.key}
            </Radio>
          )
        })}
      </Radio.Group>
    </div>
  )
}

export default RadioGroup
