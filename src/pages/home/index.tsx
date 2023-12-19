import React, { useRef, useEffect } from 'react'
import { Button, Textarea } from '@geist-ui/core'
import autosize from 'autosize'
import { PenTool } from '@geist-ui/icons'
import ButtonRound from '@/components/ButtonRound'
import './index.css'

const Home = () => {
  const textareaRef = useRef(null)
  useEffect(() => {
    autosize(textareaRef.current!)
    return () => {
      autosize.destroy(textareaRef.current!)
    }
  }, [])
  return (
    <div className="home-page">
      <Textarea
        width="100%"
        placeholder="type any thing you like..."
        rows={16}
        ref={textareaRef}
        className="autosize"
      ></Textarea>
      <ButtonRound
        auto
        style={{ position: 'absolute', bottom: '10px', right: '10px' }}
        aria-label="Glossary"
        icon={<PenTool />}
        onClick={() => {
          console.log('docs')
        }}
      />
    </div>
  )
}

export default Home
