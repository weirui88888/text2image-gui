import React, { useRef, useEffect, useState } from 'react'
import { Textarea, Tooltip } from '@geist-ui/core'
import autosize from 'autosize'
import { PenTool } from '@geist-ui/icons'
import ButtonRound from '@/components/ButtonRound'
import './index.css'

const Home = () => {
  const textareaRef = useRef(null)
  useEffect(() => {
    const textareaDom = textareaRef.current
    autosize(textareaDom!)
    return () => {
      autosize.destroy(textareaDom!)
    }
  }, [])

  const [value, setValue] = useState<string>('')
  const handler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    console.log(e.target.value)
  }
  return (
    <div className="home-page">
      <Textarea
        width="100%"
        placeholder="type any thing you like..."
        rows={16}
        ref={textareaRef}
        className="autosize"
        style={{ maxHeight: 'calc(100vh - 280px)', transition: 'height 0.4s' }}
        value={value}
        onChange={handler}
      ></Textarea>
      {!value ? (
        <>
          <Tooltip
            scale={0.5}
            text="type something before you click this button..."
            style={{ position: 'absolute', bottom: '10px', right: '10px' }}
            placement="left"
          >
            <ButtonRound disabled auto aria-label="Glossary" icon={<PenTool />} />
          </Tooltip>
        </>
      ) : (
        <ButtonRound
          auto
          aria-label="Glossary"
          style={{ position: 'absolute', bottom: '10px', right: '10px' }}
          icon={<PenTool />}
          onClick={() => {
            console.log('docs')
          }}
        />
      )}
    </div>
  )
}

export default Home
