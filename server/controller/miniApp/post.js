const OSS = require('ali-oss')
const path = require('path')
const generate = require('anyphoto')
const PostModel = require('../../database/model/post')
const UserModel = require('../../database/model/user')
const { v4: uuidv4 } = require('uuid')

const create = async (req, res) => {
  const client = new OSS({
    region: process.env.OssRegion,
    accessKeyId: process.env.AccessKeyId,
    accessKeySecret: process.env.AccessKeySecret,
    bucket: process.env.OssBucket
  })
  const { content, options, canvasSetting, id } = req.body
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
    const dirnamePath = path.dirname(photoSrc)
    const imageName = photoSrc.replace(`${dirnamePath}/`, '')
    // TODO 更换为动态地址
    const photoRes = await client.put(`mini-app/post/${id}/${imageName}`, photoSrc)
    const postId= uuidv4()
    const userGeneratedPhotoUrl = `${process.env.OssBucketCustomDomain}/${photoRes.name}`
    const newPost = new PostModel({
      content,
      options,
      canvasSetting,
      // 作品ID
      postId,
      // 用户id
      posterId:id,
      url: userGeneratedPhotoUrl
    })
    await newPost.save()
    const user = await UserModel.findOne({ id })
    user.posts = [{ postId,content,options,canvasSetting,url:userGeneratedPhotoUrl,favorite:false,isTemplate:false },...user.posts]
    await user.save()
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
      message: '服务出错了，请联系我'
    })
  }
}

const switchFavorite = async (req, res) => {
  const { id,postId,favorite } = req.body
  const user = await UserModel.findOne({ id })
  let posts = [...user.posts]
  const postIndex = posts.findIndex(post=>post.postId === postId)
  posts[postIndex].favorite = favorite
  user.posts = posts
  await user.save()
  res.send({
    code: 200,
    message: 'success',
    data: {
      message: favorite?'标记成功':'取消标记成功'
    }
  })
}



module.exports = {
  create,
  switchFavorite,
}
