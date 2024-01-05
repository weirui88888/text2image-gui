import React, { useRef, useEffect, useState, RefObject, CSSProperties } from 'react'
import {
  Textarea,
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

const maxInputLength = 2000

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
    `先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。

宫中府中，俱为一体；陟罚臧否，不宜异同。若有作奸犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理；不宜偏私，使内外异法也。

侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下：愚以为宫中之事，事无大小，悉以咨之，然后施行，必能裨补阙漏，有所广益。

将军向宠，性行淑均，晓畅军事，试用于昔日，先帝称之曰能，是以众议举宠为督。愚以为营中之事，悉以咨之，必能使行阵和睦，优劣得所。

亲贤臣，远小人，此先汉所以兴隆也；亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未尝不叹息痛恨于桓、灵也。侍中、尚书、长史、参军，此悉贞良死节之臣，愿陛下亲之信之，则汉室之隆，可计日而待也。

臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中，咨臣以当世之事，由是感激，遂许先帝以驱驰。后值倾覆，受任于败军之际，奉命于危难之间，尔来二十有一年矣。

先帝知臣谨慎，故临崩寄臣以大事也。受命以来，夙夜忧叹，恐托付不效，以伤先帝之明；故五月渡泸，深入不毛。今南方已定，兵甲已足，当奖率三军，北定中原，庶竭驽钝，攘除奸凶，兴复汉室，还于旧都。此臣所以报先帝而忠陛下之职分也。至于斟酌损益，进尽忠言，则攸之、祎、允之任也。

愿陛下托臣以讨贼兴复之效，不效，则治臣之罪，以告先帝之灵。若无兴德之言，则责攸之、祎、允等之慢，以彰其咎；陛下亦宜自谋，以咨诹善道，察纳雅言，深追先帝遗诏。臣不胜受恩感激。

今当远离，临表涕零，不知所言。`,
    { raw: true }
  )
  setTimeout(() => {
    if (textareaRef.current!) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight
    }
    autosize.update(textareaRef.current!)
  }, 1000)

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
    textareaDom!.style.width = '100% !important'
    textareaDom!.focus()
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
          <Textarea
            {...bindings}
            width="100%"
            maxLength={maxInputLength}
            placeholder="输入任何你想记录的文案，右侧会实时展示效果图..."
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
                ;(textareaRef.current as any).style.removeProperty('height')
                setValue('')
              }}
            />
          </FadeTransition>

          <Spacer w={1} />
          <Button
            shadow
            type="secondary"
            placeholder="generate"
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
              onClick={() => {
                const link = document.createElement('a')
                link.href = generatedImage
                link.download = generatedImage
                link.click()
                onModalClose()
              }}
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
      <FadeTransition visible={!!value}>
        <Preview content={value!} upLg={upLg} />
      </FadeTransition>
    </div>
  )
}

export default Home
