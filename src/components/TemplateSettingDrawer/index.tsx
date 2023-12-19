import { Dispatch, FC, SetStateAction } from 'react'

import { Divider, Drawer, Grid, Radio, Spacer, Text, useTheme } from '@geist-ui/core'
import { QuestionCircle } from '@geist-ui/icons'
import { X } from '@geist-ui/icons'
import './index.css'

import ButtonRound from '@/components/ButtonRound'

interface TemplateSettingDrawerProps {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const TemplateSettingDrawer: FC<TemplateSettingDrawerProps> = ({ isVisible, setIsVisible }) => {
  const { palette } = useTheme()
  return (
    <Drawer visible={isVisible} onClose={() => setIsVisible(false)} className="template-setting-drawer">
      <Drawer.Content pt={0}>
        <Grid.Container alignItems="center" justify="space-between">
          <Grid>
            <Grid.Container alignItems="center">
              <Text h1 font={1.75} margin={0}>
                template
              </Text>
            </Grid.Container>
          </Grid>
          <Grid>
            <ButtonRound
              auto
              aria-label="Close Settings"
              icon={<X />}
              onClick={() => {
                setIsVisible(false)
              }}
            />
          </Grid>
        </Grid.Container>
        <Text my={0} style={{ color: palette.accents_4 }}>
          Choose a preset template and configure it
        </Text>
        <Divider />
        <Grid.Container>
          <Radio.Group value="1" onChange={val => console.log(val)}>
            <Radio value="1">
              No Store
              <Radio.Description>缓存中不得存储任何关于客户端请求和服务端响应的内容。</Radio.Description>
            </Radio>
            <Radio value="2">
              No Cache
              <Radio.Desc>
                服务器端会验证 <Text b>请求中所描述的缓存</Text> 是否过期
              </Radio.Desc>
            </Radio>
          </Radio.Group>
        </Grid.Container>
      </Drawer.Content>
    </Drawer>
  )
}

export default TemplateSettingDrawer
