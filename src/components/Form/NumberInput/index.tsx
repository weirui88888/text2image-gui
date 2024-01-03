import React, { FC } from 'react'
import { Input } from '@geist-ui/core'
import { useSetUserConfig } from '@/hooks/useSetUserConfig'

interface NumberInputProps {
  label: string
  keyPath: string
  min: number
  max: number
  step?: number
}

const NumberInput: FC<NumberInputProps> = ({ keyPath, label, min, max, step }) => {
  const { value, set } = useSetUserConfig({ keyPath })
  return (
    <Input
      label={label}
      crossOrigin="anonymous"
      htmlType="number"
      min={min}
      max={max}
      step={step}
      value={Number(value).toString()}
      onChange={e => set(Number(e.target.value))}
      onBlur={e => {
        if (Number(e.target.value) < min) {
          set(min)
        }
        if (Number(e.target.value) > max) {
          set(max)
        }
      }}
    />
  )
}

NumberInput.defaultProps = {
  step: 1
}

export default NumberInput
