const OSS = require('ali-oss')
const path = require('path')
const generate = require('anyphoto')
const PhotoModel = require('../database/model/photo')
const { httpDebugger } = require('../debug')

const generatePhoto = async (req, res) => {
  const client = new OSS({
    region: process.env.OssRegion,
    accessKeyId: process.env.AccessKeyId,
    accessKeySecret: process.env.AccessKeySecret,
    bucket: process.env.OssBucket
  })
  const { content, options, canvasSetting } = req.body
  console.log('req.body',req.body)
  httpDebugger(req.body)
  const photoSrc = await generate({
    content,
    options: {
      ...options,
      clear: true,
      defaultOutputNameHandle() {
        function generateDate() {
          const date = new Date()
          const year = date.getFullYear()
          let month = date.getMonth() + 1
          let day = date.getDate()
          let hours = date.getHours()
          let minutes = date.getMinutes()
          let seconds = date.getSeconds()
          month = month < 10 ? '0' + month : month
          day = day < 10 ? '0' + day : day
          hours = hours < 10 ? '0' + hours : hours
          minutes = minutes < 10 ? '0' + minutes : minutes
          seconds = seconds < 10 ? '0' + seconds : seconds
          return year + '.' + month + '.' + day + '.' + hours + '.' + minutes + '.' + seconds
        }
        return `image-generated-by-text2image-at-${generateDate()}`
      }
    },
    canvasSetting
  })
  try {
    // await sleep(1)
    const dirnamePath = path.dirname(photoSrc)
    const imageName = photoSrc.replace(`${dirnamePath}/`, '')
    const photoRes = await client.put(`${process.env.OssBucketPhotoDirectory}/${imageName}`, photoSrc, {
      headers: {
        'Content-Disposition': 'attachment'
      }
    })

    const userGeneratedPhotoUrl = `${process.env.OssBucketCustomDomain}/${photoRes.name}`
    const newPhoto = new PhotoModel({
      content,
      config: {
        ...options,
        canvasSetting
      },
      url: userGeneratedPhotoUrl
    })
    await newPhoto.save()
    res.send({
      code: 200,
      message: 'success',
      data: {
        url: userGeneratedPhotoUrl
      }
    })
  } catch (error) {
    res.send({
      code: 500,
      message: 'anyphoto server has some error'
    })
  }
}
const deletePhoto = async (req, res) => {
  res.send(`photo delete route,you start port at :${process.env.PORT}，enjoy it`)
}

module.exports = {
  generatePhoto,
  deletePhoto
}
