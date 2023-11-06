const OSS = require('ali-oss')
const path = require('path')
const generate = require('anyphoto/src/cmd/generate')
const PhotoModel = require('../database/model/photo')
const { sleep } = require('../utils')

const generatePhoto = async (req, res) => {
  const client = new OSS({
    region: process.env.OssRegion,
    accessKeyId: process.env.AccessKeyId,
    accessKeySecret: process.env.AccessKeySecret,
    bucket: process.env.OssBucket
  })
  const { content, author, avatar } = req.body
  const photoSrc = await generate({
    content,
    options: {
      author,
      avatar
    }
  })
  try {
    await sleep(1)
    const dirnamePath = path.dirname(photoSrc)
    const imageName = photoSrc.replace(`${dirnamePath}/`, '')
    const photoRes = await client.put(`${process.env.OssBucketPhotoDirectory}/${imageName}`, photoSrc)

    const userGeneratedPhotoUrl = `${process.env.OssBucketCustomDomain}/${photoRes.name}`
    const newPhoto = new PhotoModel({
      content,
      author,
      avatar,
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
