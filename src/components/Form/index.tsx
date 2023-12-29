import { useEffect, useState } from 'react'
import { Grid, useTheme, useToasts, Button } from '@geist-ui/core'
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

const Form = () => {
  const {
    palette: { background }
  } = useTheme()

  const [integratedFonts, setIntegratedFonts] = useState<{ key: string; value: string; className: string }[]>()

  useEffect(() => {
    getCustomFont().then(fonts => {
      setIntegratedFonts(fonts)
    })
  }, [])
  const [showForm, setShowForm] = useLocalStorage<boolean>('show-form', false)
  const { setToast } = useToasts({
    placement: 'topRight',
    width: 'fit-content'
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
      <FadeTransition visible={showForm!}>
        <Grid.Container gap={2} justify="space-between" alignItems="center" style={{ width: '100% !important' }}>
          <Grid xs={12} md={6}>
            <StringInput
              label="标题"
              keyPath="defaultTitle"
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
              label="描述"
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
                      keyPath: 'canvasSetting.header.showHeaderDescription',
                      value: false
                    }
                  ])
                }
              }}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <StringInput
              label="来源"
              keyPath="canvasSetting.from.name"
              after={value => {
                if (value) {
                  batchSet([
                    {
                      keyPath: 'canvasSetting.from.showFrom',
                      value: true
                    }
                  ])
                } else {
                  batchSet([
                    {
                      keyPath: 'canvasSetting.from.showFrom',
                      value: false
                    }
                  ])
                }
              }}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <StringInput
              label="签名"
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
          <Grid xs={12} md={6} style={{ position: 'relative' }}>
            <Upload
              label="头像"
              bucketName="anyphoto"
              directoryName="avatars"
              onSuccess={url => {
                batchSet([
                  {
                    keyPath: 'defaultAvatar',
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
                if (!url) return
                try {
                  const response = await axios.head(url)
                  const imgExist = response.status === 200 && response.headers['content-type'].startsWith('image/')
                  if (!imgExist) {
                    batchSet([
                      {
                        keyPath: 'defaultAvatar',
                        value: ''
                      },
                      {
                        keyPath: 'canvasSetting.header.showHeaderAvatar',
                        value: false
                      }
                    ])
                    setToast({
                      text: '请输入正确的图片地址'
                    })
                  } else {
                    batchSet([
                      {
                        keyPath: 'defaultAvatar',
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
                      keyPath: 'defaultAvatar',
                      value: ''
                    },
                    {
                      keyPath: 'canvasSetting.header.showHeaderAvatar',
                      value: false
                    }
                  ])
                  setToast({
                    text: '请输入正确的图片地址',
                    type: 'error'
                  })
                }
              }}
              keyPath="defaultAvatar"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <NumberInput
              label="头像大小"
              min={60}
              max={100}
              step={10}
              keyPath="canvasSetting.header.headerAvatarSize"
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
            <NumberInput label="头像边框大小" min={0} max={5} keyPath="canvasSetting.header.headerAvatarBorderWidth" />
          </Grid>
          <Grid xs={12} md={6}>
            <NumberInput label="图片宽度" min={750} max={1500} step={10} keyPath="canvasSetting.width" />
          </Grid>
          <Grid xs={12} md={6}>
            <Palette label="背景颜色" fallbackValue="#cccccc55" keyPath="canvasSetting.backgroundColor" />
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
                      text: '请输入正确的图片地址'
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
                    text: '请输入正确的图片地址',
                    type: 'error'
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
            <LabelSelect keyPath="canvasSetting.customFontPath" label="字体" options={integratedFonts!} />
          </Grid>
          <Grid xs={12} md={6}>
            <NumberInput label="字体大小" min={12} max={50} keyPath="canvasSetting.fontSize" />
          </Grid>
          <Grid xs={12} md={6}>
            <Palette label="字体颜色" fallbackValue="#ffffff" keyPath="canvasSetting.color" />
          </Grid>
          <Grid xs={12} md={6}>
            <NumberInput label="字体行间距" min={10} max={30} keyPath="canvasSetting.lineGap" />
          </Grid>
          <Grid xs={12} md={6}>
            <LabelRadioGroup
              label="顶部布局"
              initialValue="center"
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
              initialValue="left"
              options={[
                { value: 'left', key: '左' },
                { value: 'right', key: '右' }
              ]}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Palette label="下划线颜色" fallbackValue="#ffffff" keyPath="canvasSetting.underline.color" />
          </Grid>
          <Grid xs={12} md={6}>
            <LabelRadioGroup
              label="下划线形状"
              initialValue="line"
              options={[
                { value: 'line', key: '直线' },
                { value: 'wave', key: '波浪' }
              ]}
            />
          </Grid>
        </Grid.Container>
      </FadeTransition>
      <div style={{ marginTop: '20px' }}>
        {showForm ? (
          <Button
            placeholder="Minus"
            auto
            icon={<Minus />}
            scale={1 / 3}
            px={0.5}
            title="收起配置项"
            onClick={() => setShowForm(false)}
          />
        ) : (
          <Button
            placeholder="Plus"
            auto
            icon={<Plus />}
            scale={1 / 3}
            px={0.5}
            title="展开配置项"
            onClick={() => setShowForm(true)}
          />
        )}
      </div>
    </div>
  )
}

export default Form
