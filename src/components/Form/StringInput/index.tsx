import React, { FC } from 'react'
import { Input } from '@geist-ui/core'
import { useSetUserConfig } from '@/hooks/useSetUserConfig'

interface StringInputProps {
  label: string
  keyPath: string
  maxLength?: number
  after?: (value: string) => void
  placeholder?: string
}

const StringInput: FC<StringInputProps> = ({ keyPath, label, maxLength, after, placeholder }) => {
  const { value, set } = useSetUserConfig({ keyPath })
  return (
    <Input
      label={label}
      placeholder={placeholder}
      crossOrigin="anonymous"
      clearable
      value={value}
      onChange={e => {
        set(e.target.value)
        after && after(e.target.value)
      }}
      maxLength={maxLength}
    />
  )
}

StringInput.defaultProps = {
  maxLength: 20,
  placeholder: ''
}

export default StringInput
