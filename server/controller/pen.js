const PenModel = require('../database/model/pen')

const pen = async (req, res, next) => {
  const { user_name = 'pener', user_email = 'pener@cao.com', user_pen_content } = req.body
  const pen = new PenModel({
    user_name,
    user_email,
    user_pen_content
  })
  await pen.save()
  res.send({
    code: 200,
    message: 'pen it success'
  })
}

module.exports = {
  pen
}
