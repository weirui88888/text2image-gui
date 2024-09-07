const OSS = require('ali-oss')
const axios = require('axios')


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

const uploadImage = async (req, res) => {
  // const files = req.files;
  // const formData = req.body;
  // console.log('Uploaded files:', files);
  // console.log('Form data:', formData);

  const file = req.files[0];

  const result = await client.put(`mini-app/background/${file.originalname}`,file.buffer)


  const src = `${process.env.OssBucketCustomDomain}/${result.name}`
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
      src
    }
  })
}

const code2session = async (req, res) => {
  const { code } = req.query
  const result = await axios.get('https://api.weixin.qq.com/sns/jscode2session ',{params:{js_code:code,appid:'wx884496f3af6aa6ab',secret:'2904ae50a4a28e71b87c193b87d6cc9d',grant_type:'authorization_code'}})
  res.send({
    code: 200,
    message: 'success',
    data: {
      uuid:result.data.openid
    }
  })
}




module.exports = {
  uploadImages,
  uploadImage,
  code2session,
}
