import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { templateState } from '@/recoil/template'
import { Input } from '@geist-ui/core'

const Docs = () => {
  const [oldval, setTemplateState] = useRecoilState(templateState)
  const [template, setTemplate] = useState(oldval)
  const onChangeTemplate = (e: any) => {
    setTemplate(e.target.value)
    setTemplateState(template => ({
      ...template,
      template: e.target.value
    }))
  }

  return (
    <div>
      <Input value={template.template} crossOrigin="anonymous" onChange={onChangeTemplate} />
    </div>
  )
}

export default Docs
