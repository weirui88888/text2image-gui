import React, { useRef, useEffect, useState, RefObject } from 'react'
import {
  Textarea,
  Tooltip,
  useKeyboard,
  KeyCode,
  KeyMod,
  Text,
  Keyboard,
  useTheme,
  Image,
  Modal,
  useModal,
  Button,
  useMediaQuery
} from '@geist-ui/core'
import autosize from 'autosize'
import { PenTool, X, Camera, Minimize2, Maximize2, Download } from '@geist-ui/icons'
import ButtonRound from '@/components/ButtonRound'
import Form from '@/components/Form'
import getImageMeta from '@/utils/getImageMeta'
import './index.css'

const maxInputLength = 3000

const image1 = 'https://static.anyphoto.space/pexels-krishna-lair-1165005.jpg'
const image2 = 'https://static.anyphoto.space/pexels-waldir-%C3%A9vora-19317145.jpg'
const image3 = 'https://static.anyphoto.space/photos/pro/valid-photo-generate-at-2023.12.11.17.35.49.png'
const image4 = 'https://static.anyphoto.space/WechatIMG595.jpg'

const images = [image1, image2, image3, image4]

const Home = () => {
  console.log('home')
  const textareaRef: RefObject<HTMLTextAreaElement | null> = useRef(null)
  const [generate, setGenerate] = useState(false)
  const [mini, setMini] = useState(false)
  const [heightGreaterThanWidth, setHeightGreaterThanWidth] = useState(false)
  const [blurValue, setBlurValue] = useState(100)
  const [generatedImage, setGeneratedImage] = useState('')
  const { setVisible: setImageModalVisible, bindings: imageModalVisible } = useModal(false)
  const upSM = useMediaQuery('sm', { match: 'up' })
  const [usedImageIndex, setUsedImageIndex] = useState(0)

  const mockGenerate = (): Promise<string> => {
    return new Promise(res => {
      setTimeout(() => {
        res(images[usedImageIndex % 4])
        // res(images[1])
      }, 1000)
    })
  }
  const {
    palette: { background }
  } = useTheme()
  const [value, setValue] = useState<string>('')
  useEffect(() => {
    const textareaDom = textareaRef.current
    textareaDom!.focus()
    autosize(textareaDom!)
    return () => {
      autosize.destroy(textareaDom!)
    }
  }, [])

  const transitionBlur = () => {
    const interval = setInterval(() => {
      setBlurValue(prevBlurValue => prevBlurValue - 10)
    }, 100)

    setTimeout(() => {
      clearInterval(interval)
      setBlurValue(0)
    }, 1000)
  }

  const handler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const generateImage = async () => {
    setUsedImageIndex(usedImageIndex => usedImageIndex + 1)
    setGenerate(true)
    const imageSrc = await mockGenerate()
    const { width, height } = await getImageMeta(imageSrc)
    setHeightGreaterThanWidth(height / width > 1)
    setGeneratedImage(imageSrc)
    setImageModalVisible(true)
    transitionBlur()
    setGenerate(false)
  }
  const { bindings } = useKeyboard(
    () => {
      if (!generate && value) {
        generateImage()
      }
    },
    [KeyMod.Alt, KeyCode.Enter],
    { disableGlobalEvent: true }
  )
  return (
    <div className="home-page" style={{ position: 'relative' }}>
      {upSM ? <Form /> : null}
      <Textarea
        {...bindings}
        width="100%"
        maxLength={maxInputLength}
        placeholder="type any thing you like..."
        rows={8}
        ref={textareaRef as any}
        className="autosize"
        style={{
          maxHeight: '50vh',
          transition: 'height 0.2s',
          fontSize: '14px',
          background,
          borderRadius: '6px'
        }}
        value={value}
        onChange={handler}
      ></Textarea>
      {value && (
        <Tooltip
          style={{ position: 'absolute', bottom: '60px', right: '10px' }}
          text={
            <Text my={0} style={{ whiteSpace: 'nowrap' }}>
              clear input...
            </Text>
          }
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

      <Text
        // onAnimationStart={() => setInShake(true)}
        // onAnimationEnd={() => setInShake(false)}
        my={0}
        style={{ position: 'absolute', bottom: '-30px', left: '4px' }}
        font={0.75}
        className={value.length === maxInputLength ? 'shake' : ''}
      >
        {value.length > maxInputLength ? maxInputLength : value.length}/{maxInputLength}
      </Text>

      {!value ? (
        <Tooltip
          scale={0.5}
          text={
            <Text my={0} style={{ whiteSpace: 'nowrap' }}>
              😊 type something before you click this button...
            </Text>
          }
          style={{ position: 'absolute', bottom: '10px', right: '10px' }}
          placement="left"
        >
          <ButtonRound disabled auto icon={<PenTool />} />
        </Tooltip>
      ) : (
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', alignItems: 'center', display: 'flex' }}>
          <Keyboard option mr="10px" scale={0.5}></Keyboard>
          <Keyboard mr="10px" scale={0.5}>
            Enter
          </Keyboard>
          <ButtonRound loading={generate} auto icon={<Camera />} onClick={generateImage} />
        </div>
      )}
      <Modal
        width="50rem"
        {...imageModalVisible}
        onClose={() => {
          setImageModalVisible(false)
          setTimeout(() => {
            setMini(false)
            setBlurValue(100)
          }, 500)
        }}
      >
        <Modal.Title style={{ marginBottom: '21px', position: 'relative' }}>
          Image Title
          {heightGreaterThanWidth ? (
            <Button
              placeholder={mini ? 'Maximize' : 'Minimize'}
              iconRight={mini ? <Maximize2 /> : <Minimize2 />}
              auto
              scale={2 / 3}
              px={0.6}
              style={{ position: 'absolute', right: '40px' }}
              onClick={() => setMini(mini ? false : true)}
            ></Button>
          ) : null}
          <Button
            placeholder="Download"
            style={{ position: 'absolute', right: 0 }}
            iconRight={<Download />}
            auto
            scale={2 / 3}
            px={0.6}
            onClick={() => {}}
          ></Button>
        </Modal.Title>
        <Modal.Content style={{ maxHeight: '68vh', overflow: 'scroll', paddingTop: 0, textAlign: 'center' }}>
          <Image
            src={generatedImage}
            style={{
              filter: `blur(${blurValue}px) contrast(${blurValue + 1})`,
              transition: 'filter 1s',
              borderRadius: '6px',
              height: mini ? '65vh' : 'auto'
            }}
          />
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default Home
