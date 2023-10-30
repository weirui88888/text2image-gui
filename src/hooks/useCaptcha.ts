import { useEffect } from 'react'

interface CaptchaOptions {
  captchaVerifyCallback: (captchaVerifyParam: string) => Promise<any>
  onBizResultCallback: (bizResult: boolean) => any
  SceneId: string
  prefix: string
  element: string
  button: string
  language?: 'ch' | 'en'
}

const useCaptcha = (options: CaptchaOptions) => {
  const { captchaVerifyCallback, onBizResultCallback, SceneId, prefix, element, button, language = 'ch' } = options
  let captcha: any
  useEffect(() => {
    initAliyunCaptcha({
      SceneId, // 场景ID。根据步骤二新建验证场景后，您可以在验证码场景列表，获取该场景的场景ID
      prefix, // 身份标。开通阿里云验证码2.0后，您可以在控制台概览页面的实例基本信息卡片区域，获取身份标
      mode: 'popup', // 验证码模式。popup表示要集成的验证码模式为弹出式。无需修改
      element, // 页面上预留的渲染验证码的元素，与原代码中预留的页面元素保持一致。
      button, // 触发验证码弹窗的元素。button表示单击登录按钮后，触发captchaVerifyCallback函数。您可以根据实际使用的元素修改element的值
      captchaVerifyCallback, // 业务请求(带验证码校验)回调函数，无需修改
      onBizResultCallback, // 业务请求结果回调函数，无需修改
      getInstance(instance: any) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        captcha = instance
      }, // 绑定验证码实例函数，无需修改
      slideStyle: {
        width: 860,
        height: 140
      }, // 滑块验证码样式，支持自定义宽度和高度，单位为px。其中，width最小值为320 px
      language // 验证码语言类型，支持简体中文（cn）、繁体中文（tw）、英文（en）
    })
    return () => {
      console.log(captcha)
      captcha?.destroyCaptcha() // this is very important
    }
  }, [])
}

export default useCaptcha
