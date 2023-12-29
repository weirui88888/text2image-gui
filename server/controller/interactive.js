const CommentModel = require('../database/model/comment')
const ContactModel = require('../database/model/contact')
const LikeModel = require('../database/model/like')
const { sleep } = require('../utils')

const comment = async (req, res, next) => {
  const { user_name = 'unregistered', user_email = 'unregistered@gmail.com', user_comment_content } = req.body
  const comment_model = new CommentModel({
    user_name,
    user_email,
    user_comment_content
  })
  await comment_model.save()
  res.send({
    code: 200,
    message: 'success',
    data: {
      message: 'Thank you for your feedback ❤️'
    }
  })
}

const contact = async (req, res, next) => {
  const { user_name = 'unregistered', user_email = 'unregistered@gmail.com', user_contact_detail } = req.body
  const contact_model = new ContactModel({
    user_name,
    user_email,
    user_contact_detail
  })
  await contact_model.save()
  res.send({
    code: 200,
    message: 'success',
    data: {
      message: 'I will contact you as soon as I find it ❤️'
    }
  })
}

const like = async (req, res, next) => {
  const { user_name = 'unregistered', user_email = 'unregistered@gmail.com' } = req.body
  const like_model = new LikeModel({
    user_name,
    user_email
  })
  await like_model.save()
  res.send({
    code: 200,
    message: 'success',
    data: {
      message: 'Very happy to receive your likes ❤️'
    }
  })
}

const getLikeCount = async (req, res, next) => {
  const count = (await LikeModel.find()).length
  await sleep(1)
  res.send({
    code: 200,
    message: 'success',
    data: {
      count
    }
  })
}

module.exports = {
  comment,
  contact,
  like,
  getLikeCount
}
