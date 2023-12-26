import React, { FC } from 'react'
import { Input } from '@geist-ui/core'
import { useSetUserConfig } from '@/hooks/useSetUserConfig'

interface StringInputProps {
  label: string
  keyPath: string
  maxLength?: number
  after?: (value: string) => void
}

const StringInput: FC<StringInputProps> = ({ keyPath, label, maxLength, after }) => {
  const { value, set } = useSetUserConfig({ keyPath })
  return (
    <Input
      label={label}
      crossOrigin="anonymous"
      clearable
      value={value}
      onChange={e => {
        set(e.target.value.trim())
        after && after(e.target.value.trim())
      }}
      maxLength={maxLength}
    />
  )
}

StringInput.defaultProps = {
  maxLength: 10
}

export default StringInput
