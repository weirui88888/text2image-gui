import React, { useRef, useEffect, useState } from 'react'
import { Textarea, Tooltip, useKeyboard, KeyCode, Keyboard } from '@geist-ui/core'
import autosize from 'autosize'
import { PenTool, X } from '@geist-ui/icons'
import ButtonRound from '@/components/ButtonRound'
import './index.css'

const mockGenerate = () => {
  return new Promise((res, rej) => {
    setTimeout(res, 3000)
  })
}

const Home = () => {
  const textareaRef = useRef(null)
  const [generate, setGenerate] = useState(false)
  const [value, setValue] = useState<string>('')
  useEffect(() => {
    const textareaDom = textareaRef.current
    autosize(textareaDom!)
    return () => {
      autosize.destroy(textareaDom!)
    }
  }, [])

  const handler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  const generateImage = async () => {
    setGenerate(true)
    await mockGenerate()
    setGenerate(false)
  }

  const { bindings } = useKeyboard(
    () => {
      if (!generate && value) {
        generateImage()
      }
    },
    [KeyCode.Enter],
    { disableGlobalEvent: true }
  )
  return (
    <div className="home-page">
      <Textarea
        {...bindings}
        width="100%"
        placeholder="type any thing you like..."
        rows={16}
        ref={textareaRef}
        className="autosize"
        style={{ maxHeight: 'calc(100vh - 280px)', transition: 'height 0.2s' }}
        value={value}
        onChange={handler}
      ></Textarea>
      {value && (
        <Tooltip
          style={{ position: 'absolute', bottom: '60px', right: '10px' }}
          text="clear input..."
          placement="left"
          scale={0.5}
        >
          <ButtonRound
            auto
            icon={<X />}
            onClick={() => {
              ;(textareaRef.current as any).style.removeProperty('height')
              setValue('')
            }}
          />
        </Tooltip>
      )}

      {!value ? (
        <Tooltip
          scale={0.5}
          text="😊 type something before you click this button..."
          style={{ position: 'absolute', bottom: '10px', right: '10px' }}
          placement="left"
        >
          <ButtonRound disabled auto icon={<PenTool />} />
        </Tooltip>
      ) : (
        <Tooltip
          scale={0.5}
          text={
            <>
              click this button or press {''}
              <Keyboard scale={0.5}>Enter</Keyboard>
            </>
          }
          style={{ position: 'absolute', bottom: '10px', right: '10px' }}
          placement="left"
        >
          <ButtonRound loading={generate} auto icon={<PenTool />} onClick={generateImage} />
        </Tooltip>
      )}
    </div>
  )
}

export default Home
