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
import { useRecoilValue } from 'recoil'
import userConfigState from '@/recoil/config'
import { text2Image } from '@/api/generate'

const maxInputLength = 3000

const Home = () => {
  const textareaRef: RefObject<HTMLTextAreaElement | null> = useRef(null)
  const [generate, setGenerate] = useState(false)
  const [mini, setMini] = useState(false)
  const [heightGreaterThanWidth, setHeightGreaterThanWidth] = useState(false)
  const [blurValue, setBlurValue] = useState(100)
  const [generatedImage, setGeneratedImage] = useState('')
  const { setVisible: setImageModalVisible, bindings: imageModalVisible } = useModal(false)
  const upSM = useMediaQuery('sm', { match: 'up' })
  const userConfig = useRecoilValue(userConfigState)
  const [value, setValue] =
    useState<string>(`寒冬降临，大地被冰雪所覆盖，这是一年中最美丽的季节之一。记得那年冬天的第一场雪，仿佛是天地间的一幅画卷，让人陶醉其中。

那天，天空阴沉沉的，寒风凛冽，似乎预示着一场雪的到来。人们心中充满期待，期待着那冰雪的降临，期待着冬天的第一场雪。
  
终于，雪花飘飘洒洒地从天空中飘落下来。起初是零星的小雪花，如同飘落的蝶舞动，轻盈而翩跹。随着时间的推移，雪花越来越密集，仿佛是天空中的白色花瓣，铺满了整个大地`)
  // setTimeout(() => {
  //   if (textareaRef.current!) {
  //     console.log(textareaRef.current.scrollHeight)
  //     textareaRef.current.scrollTop = textareaRef.current.scrollHeight
  //   }
  //   autosize.update(textareaRef.current!)
  // }, 1000)

  const {
    palette: { background }
  } = useTheme()
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

  const textChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const generateImage = async () => {
    const { avatar, title, canvasSetting } = userConfig
    setGenerate(true)
    const {
      data: { url }
    } = await text2Image({
      content: value,
      options: {
        avatar,
        title
      },
      canvasSetting: canvasSetting
    })

    const { width, height } = await getImageMeta(url)
    setHeightGreaterThanWidth(height / width > 1)
    setGeneratedImage(url)
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
    <div
      className="home-page"
      style={
        upSM
          ? { position: 'relative' }
          : { position: 'absolute', width: '100%', top: '50%', transform: 'translateY(-50%)' }
      }
    >
      {upSM ? <Form /> : null}
      <Textarea
        {...bindings}
        width="100%"
        maxLength={maxInputLength}
        placeholder="type any thing you like..."
        rows={10}
        ref={textareaRef as any}
        className="autosize"
        style={{
          maxHeight: upSM ? '40vh' : '50vh',
          transition: 'height 0.2s',
          fontSize: '14px',
          background,
          borderRadius: '6px',
          overflow: 'scroll !important'
        }}
        value={value}
        onChange={textChange}
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
