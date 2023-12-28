import AliOssUpload from '@/utils/aliOssUpload'
const bucketName = 'anyphoto'
const region = 'oss-cn-beijing'

// TODO 捕捉错误
const getCustomFont = async () => {
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
  // @ts-ignore
  const result = await ossClient?.list({
    prefix:'fonts'
  })
  const validFonts = result?.objects.filter(font => font.size && (font.name.includes('en-') || font.name.includes('zh-')))
  return validFonts?.reduce((acc, { name, url }) => {
    const [language, fontName] = name.split('/')[1].split('-')
      // @ts-ignore
    if (!acc[language]) {
      // @ts-ignore
      acc[language] = [{key:fontName,value:url}]
    } else {
      // @ts-ignore
      acc[language] = [...acc[language],{key:fontName,value:url}]
    }
    return acc
  },{})
}

export default getCustomFont
