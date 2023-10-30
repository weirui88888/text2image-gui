const OSS = require('ali-oss')
const path = require('path')
const generate = require('anyphoto/src/cmd/generate')
const PhotoModel = require('../database/model/photo')

const generatePhoto = async (req, res) => {
  const client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: process.env.AccessKeyId,
    accessKeySecret: process.env.AccessKeySecret,
    bucket: 'anyphoto'
  })
  const { content, author, avatar, outputName } = req.body
  const photoSrc = await generate({
    content,
    options: {
      author,
      avatar,
      outputName
    }
  })
  try {
    const dirnamePath = path.dirname(photoSrc)
    const imageName = photoSrc.replace(`${dirnamePath}/`, '')
    const photoRes = await client.put(`myphotos/${imageName}`, photoSrc)

    const userGeneratedPhotoUrl = `https://anyphoto.newarray.vip/${photoRes.name}`
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
    console.log(error)
    res.send({
      code: 500,
      message: 'anyphoto server has some error'
    })
  }
}
const deletePhoto = async (req, res) => {
  res.send('photo delete route')
}

module.exports = {
  generatePhoto,
  deletePhoto
}
