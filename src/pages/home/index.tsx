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
    `小程序“文字图片创作鸭”已上线，丰富的预设模块和主题，支持上传自定义背景图、Logo、字体，扫码体验，感受一秒出图的乐趣。

你好，很高兴通过这种方式认识你！这是一款独特的文字图片生成器，旨在帮助你将生活中的所见所闻化为生动的视觉作品。

无论是记录日常的点滴、展示旅行的美景，还是表达心情的随笔，这款工具都能轻松将你的文字与图像相结合创造出个性化的艺术作品，让你的文字具备情怀。

使用这款生成器非常简单。你只需输入想表达的文字，选择自定义上传合适的图片或使用预设的主题背景及模板，点击生成，即可快速得到一幅精美的文字图片。

生成的作品不仅可以保存在设备中，还可以方便地分享给朋友或在社交媒体上展示，让更多人欣赏你的创意。

如果这款工具给你带来了收获，别忘记把它推荐给你的好友，让更多人一起享受创作的乐趣。`,
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
        <h2 style={{marginTop:'40px'}}>🎉：小程序已上线，截图如下👇，可微信扫码体验秒出图！</h2>
        <div style={{margin:'20px 0 20px'}}>
          <img src="https://text2image.xdzi8b.cn/mini-app/share/web-share-0.jpg" alt="" style={{width:'200px'}}/>
          <img src="https://text2image.xdzi8b.cn/mini-app/share/home.jpg" alt="" style={{width:'200px'}}/>
          <img src="https://text2image.xdzi8b.cn/mini-app/share/editor.jpg" alt="" style={{width:'200px'}}/>
          <img src="https://text2image.xdzi8b.cn/mini-app/share/editor1.jpg" alt="" style={{width:'200px'}}/>
          <img src="https://text2image.xdzi8b.cn/mini-app/share/editor2.jpg" alt="" style={{width:'200px'}}/>
          <img src="https://text2image.xdzi8b.cn/mini-app/share/template.jpg" alt="" style={{width:'200px'}}/>
          <img src="https://text2image.xdzi8b.cn/mini-app/share/web-share-1.jpg" alt="" style={{width:'200px'}}/>
          <img src="https://text2image.xdzi8b.cn/mini-app/share/web-share-2.jpg" alt="" style={{width:'200px'}}/>
          <img src="https://text2image.xdzi8b.cn/mini-app/share/web-share-6.jpg" alt="" style={{width:'200px'}}/>
          <img src="https://text2image.xdzi8b.cn/mini-app/share/web-share-3.jpg" alt="" style={{width:'200px'}}/>
          <img src="https://text2image.xdzi8b.cn/mini-app/share/web-share-7.jpg" alt="" style={{width:'200px'}}/>
          <img src="https://text2image.xdzi8b.cn/mini-app/share/channel-web.png" alt="" style={{width:'200px'}}/>
        </div>
        <Modal width="50rem" {...imageModalVisible} onClose={onModalClose}>
          <Modal.Title style={{ marginBottom: '21px', position: 'relative',textAlign:'left' }}>
            扫码体验小程序，百种模板、主题，一秒出图
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
