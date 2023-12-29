import AliOssUpload from '@/utils/aliOssUpload'

const bucketName = 'anyphoto'
const region = 'oss-cn-beijing'

const registerFonts = (fonts: { key: string; value: string; className: string }[]) => {
  let style = document.createElement('style')
  let fontStyles = ''
  fonts.forEach(font => {
    const { className: fontFamily, value: url } = font
    fontStyles += `@font-face {
      font-family: '${fontFamily}';
      src: url('${url}');
    }
    .${fontFamily} {
      font-family: ${fontFamily}, sans-serif;
    }
    `
  })
  style.textContent = fontStyles
  document.getElementsByTagName('head')[0].appendChild(style)
}

const languageMaps: Record<string, { prefix: string; suffix: string; order: number }> = {
  zh: {
    prefix: '中文',
    suffix: '美好的一天',
    order: 1
  },
  tr: {
    prefix: '繁體',
    suffix: '美好的一天',
    order: 2
  },
  en: {
    prefix: 'English',
    suffix: 'Have a wonderful day',
    order: 3
  },
  ko: {
    prefix: 'Korean',
    suffix: '행복한 하루 되세요',
    order: 4
  },
  ja: {
    prefix: 'Japanese',
    suffix: '素敵な一日を',
    order: 5
  }
}

const getCustomFont = async (): Promise<{ key: string; value: string; className: string }[] | undefined> => {
  const { initOssClient } = new AliOssUpload({
    bucket: bucketName,
    region,
    asyncGetStsToken: async () =>
      await Promise.resolve({
        accessKeyId: process.env.REACT_APP_ALI_ACCESS_KEY_ID!,
        accessKeySecret: process.env.REACT_APP_ALI_ACCESS_KEY_SECRET!
      })
  })
  const ossClient = await initOssClient()
  const result = await ossClient?.list(
    {
      prefix: 'fonts/origin',
      'max-keys': 100
    },
    { timeout: 3000 }
  )
  const validFonts = result?.objects.filter(
    (font: { size?: number; name?: string }) =>
      font.size &&
      (font.name?.includes('en-') ||
        font.name?.includes('zh-') ||
        font.name?.includes('tr-') ||
        font.name?.includes('ko-') ||
        font.name?.includes('ja-'))
  )
  const fonts = validFonts?.map(font => {
    const withPrefixName = font.name.split('fonts/origin/')[1]
    const fontPrefix = withPrefixName.split('-')[0]
    return {
      key: `${languageMaps[fontPrefix].prefix}-${languageMaps[fontPrefix].suffix}`,
      value: font.url,
      className: withPrefixName.split('.')[0],
      order: languageMaps[fontPrefix].order
    }
  })
  const orderFonts = fonts!.sort((a, b) => a.order - b.order)
  console.log('🌹 ~ file: getCustomFont.ts:90 ~ getCustomFont ~ orderFonts:', orderFonts)
  console.log(fonts)
  const compressFonts = fonts?.map(font => ({ ...font, value: font.value.replace('origin', 'compress') }))
  registerFonts(compressFonts!)
  return fonts
}

export default getCustomFont
