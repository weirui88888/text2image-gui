import React, { useRef, useEffect, useState, RefObject, CSSProperties } from 'react'
import {
  useKeyboard,
  KeyCode,
  KeyMod,
  Text,
  Spacer,
  useTheme,
  Image,
  Modal,
  useModal,
  Button,
  useMediaQuery
} from '@geist-ui/core'
import autosize from 'autosize'
import { useLocalStorage } from 'react-use'
import { Camera, Minimize2, Maximize2, Download } from '@geist-ui/icons'
import Form from '@/components/Form'
import getImageMeta from '@/utils/getImageMeta'
import './index.css'
import { useRecoilValue } from 'recoil'
import userConfigState from '@/recoil/config'
import { text2Image } from '@/api/generate'
import Preview from '@/components/Preview'
import Eraser from '@/components/Eraser'
import FadeTransition from '@/components/FadeTransition'

const maxInputLength = 1000

const Home = () => {
  const textareaRef: RefObject<HTMLTextAreaElement | null> = useRef(null)
  const [generate, setGenerate] = useState(false)
  const [mini, setMini] = useState(false)
  const [heightGreaterThanWidth, setHeightGreaterThanWidth] = useState(false)
  const [blurValue, setBlurValue] = useState(100)
  const [generatedImage, setGeneratedImage] = useState('')
  const { setVisible: setImageModalVisible, bindings: imageModalVisible } = useModal(false)
  const upSM = useMediaQuery('sm', { match: 'up' })
  const upLg = useMediaQuery('lg', { match: 'up' })
  const [homePageStyle, setHomePageStyle] = useState<CSSProperties>({})
  const userConfig = useRecoilValue(userConfigState)
  //   const [value, setValue] = useState<string>('')
  const [value, setValue] = useLocalStorage<string>(
    'content',
    `这是一款可将文字转换成图片的应用，你可以尝试调整左边配置进行实时预览

你可以将生成的图片应用于朋友圈、小红书、抖音、甚至你可以用它来写简历

你看到的图片中的任意元素都是可以进行调整的，如字体大小、颜色、布局、背景色等

{除了这些常规的配置外，它支持了一些更加有意思和强大的功能，比如支持自定义字体、任意多渐变色背景、背景图案、下划线、网格桌布背景等，更多有意思的内容还需你自行探索}

更加有趣的事，这个应用是支持在终端中运行的，也能够运行在你的程序中。目前，该包仍未发布最新版，因为很多东西仍在调整中

后续会考虑集成很多模版，用户只用关心自己的输入即可得到符合预期的图片

{如果你觉得它对你有帮助，记得点赞支持下，为爱发电不易～}`,
    { raw: true }
  )

  useEffect(() => {
    if (upLg) {
      setHomePageStyle({})
    } else {
      setHomePageStyle({
        flexDirection: 'column',
        alignItems: 'stretch'
      })
    }
  }, [upLg])

  useEffect(() => {
    const textareaDom = textareaRef.current
    setTimeout(() => {
      textareaDom!.scrollTop = textareaDom!.scrollHeight
      textareaDom!.focus()
    }, 0)
    autosize(textareaDom!)
    return () => {
      autosize.destroy(textareaDom!)
    }
  }, [])

  const {
    palette: { background }
  } = useTheme()
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
      content: value!,
      options: {
        avatar,
        title
      },
      canvasSetting
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

  const onModalClose = () => {
    setImageModalVisible(false)
    setTimeout(() => {
      setMini(false)
      setBlurValue(100)
    }, 500)
  }
  return (
    <div className="home-page" style={homePageStyle}>
      <div className="action-area">
        <Form />
        <div style={{ position: 'relative' }}>
          <textarea
            {...bindings}
            maxLength={maxInputLength}
            placeholder="输入任何你想记录的文案，右侧会实时展示效果图，用大括号{ }包裹住内容则可标记文本..."
            rows={10}
            ref={textareaRef as any}
            className="autosize"
            style={{
              width: '100%',
              maxHeight: upSM ? '40vh' : '50vh',
              transition: 'height 0.3s ease',
              fontSize: '14px',
              background,
              borderRadius: '6px',
              padding: '6px',
              resize: 'none'
            }}
            value={value}
            onChange={textChange}
          ></textarea>

          <Text
            my={0}
            style={{ position: 'absolute', bottom: '-30px', left: '4px' }}
            font={0.75}
            className={value!.length === maxInputLength ? 'shake' : ''}
          >
            {value!.length > maxInputLength ? maxInputLength : value!.length}/{maxInputLength}
          </Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '30px' }}>
          <FadeTransition visible={!!value}>
            <Eraser
              onClick={() => {
                textareaRef.current!.style.removeProperty('height')
                setValue('')
                setTimeout(() => {
                  textareaRef.current!.focus()
                }, 0)
              }}
            />
          </FadeTransition>

          <Spacer w={1} />
          <Button
            shadow
            type="secondary"
            placeholder="generate"
            loading={generate}
            auto
            icon={<Camera />}
            onClick={generateImage}
            disabled={!value}
          >
            生成图片
          </Button>
          {/* <Keyboard option mr="10px" scale={0.5}></Keyboard>
          <Keyboard mr="10px" scale={0.5}>
            Enter
          </Keyboard> */}
        </div>
        <Modal width="50rem" {...imageModalVisible} onClose={onModalClose}>
          <Modal.Title style={{ marginBottom: '21px', position: 'relative' }}>
            Image Title
            {heightGreaterThanWidth ? (
              <Button
                placeholder={mini ? 'Maximize' : 'Minimize'}
                iconRight={mini ? <Maximize2 /> : <Minimize2 />}
                auto
                px={0.6}
                style={{ position: 'absolute', right: '80px' }}
                onClick={() => setMini(mini ? false : true)}
              ></Button>
            ) : null}
            <Button
              placeholder="Download"
              style={{ position: 'absolute', right: 0 }}
              iconRight={<Download />}
              auto
              px={0.6}
              onClick={() => {
                const link = document.createElement('a')
                link.href = generatedImage
                link.download = generatedImage
                link.click()
                onModalClose()
              }}
            >
              下载
            </Button>
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
      <FadeTransition visible={!!value}>
        <Preview content={value!} upLg={upLg} />
      </FadeTransition>
    </div>
  )
}

export default Home
