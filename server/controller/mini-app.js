const LikeModel = require('../database/model/like')
const OSS = require('ali-oss')

const client = new OSS({
  region: process.env.OssRegion,
  accessKeyId: process.env.AccessKeyId,
  accessKeySecret: process.env.AccessKeySecret,
  bucket: process.env.OssBucket
})

const uploadImages = async (req, res) => {
  // const files = req.files;
  // const formData = req.body;
  // console.log('Uploaded files:', files);
  // console.log('Form data:', formData);

  const avatarFile = req.files[0];

  const avatarRes = await client.put(`mini-app/avatar/${avatarFile.originalname}`,avatarFile.buffer)


  const avatarUrl = `${process.env.OssBucketCustomDomain}/${avatarRes.name}`
  // const { user_name = 'unregistered', user_email = 'unregistered@gmail.com' } = req.body
  // const like_model = new LikeModel({
  //   user_name,
  //   user_email
  // })
  // await like_model.save()
  res.send({
    code: 200,
    message: 'success',
    data: {
      avatar: avatarUrl
    }
  })
}

const uploadBackground = async (req, res) => {
  // const files = req.files;
  // const formData = req.body;
  // console.log('Uploaded files:', files);
  // console.log('Form data:', formData);

  const avatarFile = req.files[0];

  const avatarRes = await client.put(`mini-app/background/${avatarFile.originalname}`,avatarFile.buffer)


  const avatarUrl = `${process.env.OssBucketCustomDomain}/${avatarRes.name}`
  // const { user_name = 'unregistered', user_email = 'unregistered@gmail.com' } = req.body
  // const like_model = new LikeModel({
  //   user_name,
  //   user_email
  // })
  // await like_model.save()
  res.send({
    code: 200,
    message: 'success',
    data: {
      background: avatarUrl
    }
  })
}


module.exports = {
  uploadImages,
  uploadBackground
}
