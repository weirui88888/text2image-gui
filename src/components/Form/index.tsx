import { useEffect, useState } from 'react'
import { Grid, useTheme, useToasts, Button, useMediaQuery } from '@geist-ui/core'
import { useBatchSetUserConfig } from '@/hooks/useSetUserConfig'
import { Plus, Minus } from '@geist-ui/icons'
import { useLocalStorage } from 'react-use'
import axios from 'axios'
import LabelRadioGroup from './LabelRadioGroup'
import Upload from './Upload'
import Palette from './Palette'
import NumberInput from './NumberInput'
import StringInput from './StringInput'
import FadeTransition from '../FadeTransition'
import LabelSelect from './LabelSelect'
import getCustomFont from '@/api/getCustomFont'

import { useSetRecoilState, useRecoilValue } from 'recoil'
import SelectFontState from '@/recoil/selectFont'
import userConfigState from '@/recoil/config'

const linearGradientDirections = [
  {
    key: '左',
    value: 'to left'
  },
  {
    key: '右',
    value: 'to right'
  },
  {
    key: '上',
    value: 'to top'
  },
  {
    key: '下',
    value: 'to bottom'
  },
  {
    key: '左上',
    value: 'to left top'
  },
  {
    key: '左下',
    value: 'to left bottom'
  },
  {
    key: '右上',
    value: 'to right top'
  },
  {
    key: '右下',
    value: 'to right bottom'
  }
]

const Form = () => {
  const {
    palette: { background },
    layout: { gapHalf, gapQuarter }
  } = useTheme()
  const [integratedFonts, setIntegratedFonts] = useState<{ key: string; value: string; className: string }[]>()
  const setSelectFontClassName = useSetRecoilState(SelectFontState)
  const userConfig = useRecoilValue(userConfigState)
  const upSM = useMediaQuery('sm', { match: 'up' })
  useEffect(() => {
    getCustomFont().then(fonts => {
      const { className } = fonts!.find(font => font.value === userConfig.canvasSetting.customFontPath) as any
      setSelectFontClassName(className)
      setIntegratedFonts(fonts)
    })
  }, [userConfig.canvasSetting.customFontPath, setSelectFontClassName]) // why this?
  const [showForm, setShowForm] = useLocalStorage<boolean>('show-form', false)
  const { setToast } = useToasts({
    placement: 'topRight'
  })

  const { batchSet } = useBatchSetUserConfig()
  return (
    <div
      style={{
        padding: '24px 0',
        background,
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Grid.Container
        gap={upSM ? 2 : 1}
        justify="space-between"
        alignItems="center"
        style={{ width: '100% !important', marginBottom: `${upSM ? gapHalf : gapQuarter}` }}
      >
        <Grid xs={12} md={6}>
          <StringInput
            placeholder="非必填"
            label="标题"
            keyPath="title"
            after={value => {
              if (value) {
                batchSet([
                  {
                    keyPath: 'canvasSetting.header.showHeader',
                    value: true
                  },
                  {
                    keyPath: 'canvasSetting.header.showHeaderTitle',
                    value: true
                  }
                ])
              } else {
                batchSet([
                  {
                    keyPath: 'canvasSetting.header.showHeader',
                    value: false
                  },
                  {
                    keyPath: 'canvasSetting.header.showHeaderTitle',
                    value: false
                  }
                ])
              }
            }}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <StringInput
            label="副标题"
            placeholder="非必填"
            keyPath="canvasSetting.header.headerDescriptionPrefix"
            after={value => {
              if (value) {
                batchSet([
                  {
                    keyPath: 'canvasSetting.header.showHeader',
                    value: true
                  },
                  {
                    keyPath: 'canvasSetting.header.showHeaderDescription',
                    value: true
                  }
                ])
              } else {
                batchSet([
                  {
                    keyPath: 'canvasSetting.header.showHeader',
                    value: false
                  },
                  {
                    keyPath: 'canvasSetting.header.showHeaderDescription',
                    value: false
                  }
                ])
              }
            }}
          />
        </Grid>
        <Grid xs={12} md={6}>
        <Upload
              label="Logo"
              cropper={false}
              bucketName="anyphoto"
              directoryName="avatars"
              onSuccess={url => {
                batchSet([
                  {
                    keyPath: 'canvasSetting.footer.sloganIcon',
                    value: url
                  }
                ])
              }}
              onCheck={async url => {
                console.log('url',url)
                if (!url) return
                try {
                  const response = await axios.head(url)
                  const imgExist = response.status === 200 && response.headers['content-type'].startsWith('image/')
                  if (!imgExist) {
                    batchSet([
                      {
                        keyPath: 'canvasSetting.footer.sloganIcon',
                        value: ''
                      }
                    ])
                    setToast({
                      text: '请提供正确的Logo地址'
                    })
                  } else {
                    batchSet([
                      {
                        keyPath: 'canvasSetting.footer.sloganIcon',
                        value: url
                      }
                    ])
                  }
                } catch (error) {
                  batchSet([
                    {
                      keyPath: 'canvasSetting.footer.sloganIcon',
                      value: ''
                    }
                  ])
                  setToast({
                    text: '请提供正确的Logo地址',
                    type: 'secondary'
                  })
                }
              }}
              keyPath="canvasSetting.footer.sloganIcon"
            />
        </Grid>
        <Grid xs={12} md={6}>
          <StringInput
            label="来源"
            placeholder="非必填"
            keyPath="canvasSetting.footer.slogan"
            after={value => {
              if (value) {
                batchSet([
                  {
                    keyPath: 'canvasSetting.footer.showFooter',
                    value: true
                  }
                ])
              } else {
                batchSet([
                  {
                    keyPath: 'canvasSetting.footer.showFooter',
                    value: false
                  }
                ])
              }
            }}
          />
        </Grid>
      </Grid.Container>
      <FadeTransition visible={showForm!}>
        <Grid.Container
          gap={upSM ? 2 : 1}
          justify="space-between"
          alignItems="center"
          style={{ width: '100% !important' }}
        >
          <Grid xs={12} md={6}>
            <Palette label="标题颜色" fallbackValue="#ffffff" keyPath="canvasSetting.header.headerTitleFontColor" />
          </Grid>
          <Grid xs={12} md={6}>
            <Palette
              label="副标题颜色"
              fallbackValue="#ffffff"
              keyPath="canvasSetting.header.headerDescriptionFontColor"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Palette label="摘自颜色" fallbackValue="#ffffff" keyPath="canvasSetting.from.fromFontColor" />
          </Grid>
          <Grid xs={12} md={6}>
            <Palette label="署名颜色" fallbackValue="#ffffff" keyPath="canvasSetting.footer.sloganFontColor" />
          </Grid>
          <Grid xs={12} md={6}>
            <Palette
              label="背景颜色"
              fallbackValue="#000000"
              keyPath="canvasSetting.backgroundColor"
              linearGradientDirectionKeyPath="canvasSetting.linearGradientDirection"
              multiple
              paletteModalSubtitle="支持添加更多颜色以使用渐变背景"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <LabelSelect
              keyPath="canvasSetting.linearGradientDirection"
              label="背景渐变方向"
              options={linearGradientDirections}
            />
          </Grid>
          <Grid xs={12} md={6} style={{ position: 'relative' }}>
            <Upload
              label="背景图像"
              cropper={false}
              bucketName="anyphoto"
              directoryName="background"
              onSuccess={url => {
                batchSet([
                  {
                    keyPath: 'canvasSetting.backgroundImage',
                    value: url
                  }
                ])
              }}
              onCheck={async url => {
                if (!url) return
                try {
                  const response = await axios.head(url)
                  const imgExist = response.status === 200 && response.headers['content-type'].startsWith('image/')
                  if (!imgExist) {
                    batchSet([
                      {
                        keyPath: 'canvasSetting.backgroundImage',
                        value: ''
                      }
                    ])
                    setToast({
                      text: '请提供正确的背景图片地址'
                    })
                  } else {
                    batchSet([
                      {
                        keyPath: 'canvasSetting.backgroundImage',
                        value: url
                      }
                    ])
                  }
                } catch (error) {
                  batchSet([
                    {
                      keyPath: 'canvasSetting.backgroundImage',
                      value: ''
                    }
                  ])
                  setToast({
                    text: '请提供正确的背景图片地址',
                    type: 'secondary'
                  })
                }
              }}
              keyPath="canvasSetting.backgroundImage"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Palette label="背景网格颜色" fallbackValue="#cccccc55" keyPath="canvasSetting.backgroundLineColor" />
          </Grid>
          <Grid xs={12} md={6}>
            <NumberInput
              label="背景网格大小"
              min={0}
              max={100}
              step={10}
              keyPath="canvasSetting.backgroundLineSpacing"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <NumberInput
              label="行间距"
              min={15}
              max={30}
              step={5}
              keyPath="canvasSetting.lineGap"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <NumberInput label="图片宽度" min={750} max={1500} step={10} keyPath="canvasSetting.width" />
          </Grid>
          <Grid xs={12} md={6} style={{ position: 'relative' }}>
            <Upload
              label="头像"
              bucketName="anyphoto"
              directoryName="avatars"
              previewRadius
              onSuccess={url => {
                batchSet([
                  {
                    keyPath: 'avatar',
                    value: url
                  },
                  {
                    keyPath: 'canvasSetting.header.showHeader',
                    value: true
                  },
                  {
                    keyPath: 'canvasSetting.header.showHeaderAvatar',
                    value: true
                  }
                ])
              }}
              onCheck={async url => {
                if (!url) {
                  batchSet([
                    {
                      keyPath: 'avatar',
                      value: ''
                    },
                    {
                      keyPath: 'canvasSetting.header.showHeader',
                      value: false
                    },
                    {
                      keyPath: 'canvasSetting.header.showHeaderAvatar',
                      value: false
                    }
                  ])
                  return
                }
                try {
                  const response = await axios.head(url)
                  const imgExist = response.status === 200 && response.headers['content-type'].startsWith('image/')
                  if (!imgExist) {
                    batchSet([
                      {
                        keyPath: 'avatar',
                        value: ''
                      },
                      {
                        keyPath: 'canvasSetting.header.showHeader',
                        value: false
                      },
                      {
                        keyPath: 'canvasSetting.header.showHeaderAvatar',
                        value: false
                      }
                    ])
                    setToast({
                      text: '请提供正确的头像图片地址',
                      type: 'secondary'
                    })
                  } else {
                    batchSet([
                      {
                        keyPath: 'avatar',
                        value: url
                      },
                      {
                        keyPath: 'canvasSetting.header.showHeader',
                        value: true
                      },
                      {
                        keyPath: 'canvasSetting.header.showHeaderAvatar',
                        value: true
                      }
                    ])
                  }
                } catch (error) {
                  batchSet([
                    {
                      keyPath: 'avatar',
                      value: ''
                    },
                    {
                      keyPath: 'canvasSetting.header.showHeader',
                      value: false
                    },
                    {
                      keyPath: 'canvasSetting.header.showHeaderAvatar',
                      value: false
                    }
                  ])
                  setToast({
                    text: '请提供正确的头像图片地址',
                    type: 'secondary'
                  })
                }
              }}
              keyPath="avatar"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Palette
              label="头像边框颜色"
              fallbackValue="#ffcc00"
              keyPath="canvasSetting.header.headerAvatarBorderColor"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <LabelSelect keyPath="canvasSetting.customFontPath" isFontSelect label="字体" options={integratedFonts!} />
          </Grid>
          <Grid xs={12} md={6}>
            <Palette label="内容字体颜色" fallbackValue="#ffffff" keyPath="canvasSetting.color" />
          </Grid>
          <Grid xs={24} md={6}>
            <LabelRadioGroup
              label="顶部布局"
              keyPath="canvasSetting.header.headerAlign"
              options={[
                { value: 'left', key: '左' },
                { value: 'center', key: '中' },
                { value: 'right', key: '右' }
              ]}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <LabelRadioGroup
              label="底部布局"
              keyPath="canvasSetting.footer.sloganPosition"
              options={[
                { value: 'left', key: '左' },
                { value: 'right', key: '右' }
              ]}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <NumberInput label="横向边距" min={10} max={100} step={1} keyPath="canvasSetting.x" />
          </Grid>
          <Grid xs={12} md={6}>
            <NumberInput label="纵向边距" min={10} max={100} step={1} keyPath="canvasSetting.y" />
          </Grid>
          <Grid xs={12} md={6}>
            <Palette label="下划线颜色" fallbackValue="#ffffff" keyPath="canvasSetting.underline.color" />
          </Grid>
          <Grid xs={24} md={6}>
            <LabelRadioGroup
              label="下划线形状"
              keyPath="canvasSetting.underline.shape"
              options={[
                { value: 'line', key: '直线' },
                { value: 'wave', key: '波浪' }
              ]}
            />
          </Grid>
        </Grid.Container>
      </FadeTransition>
      <div style={{ marginTop: `${showForm ? '20px' : 0}` }}>
        {showForm ? (
          <Button
            placeholder="Minus"
            auto
            icon={<Minus />}
            scale={1 / 3}
            px={0.5}
            title="收起配置项"
            onClick={() => {
              setShowForm(false)
            }}
          />
        ) : (
          <Button
            placeholder="Plus"
            auto
            icon={<Plus />}
            scale={1 / 3}
            px={0.5}
            title="展开配置项"
            onClick={() => {
              setShowForm(true)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Form
