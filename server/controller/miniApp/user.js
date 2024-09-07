const UserModel = require('../../database/model/user')

const register = async (req, res) => {
  const { id, avatar, nickName } = req.body
  const user_model = new UserModel({
    id,
    avatar,
    nickName
  })
  await user_model.save()
  res.send({
    code: 200,
    message: 'success'
  })
}

const userInfo = async (req, res) => {
  const { id } = req.body
  const user = await UserModel.findOne({ id });
  res.send({
    code: 200,
    message: 'success',
    user
  })
}

const resetNickName = async (req, res) => {
  const { id, nickName } = req.body
  const user = await UserModel.findOne({ id });
  user.nickName = nickName
  await user.save()
  res.send({
    code: 200,
    message: 'success'
  })
}

const resetAvatar = async (req, res) => {
  const { id, avatar } = req.body
  const user = await UserModel.findOne({ id });
  user.avatar = avatar
  await user.save()
  res.send({
    code: 200,
    message: 'success'
  })
}




module.exports = {
  register,
  userInfo,
  resetNickName,
  resetAvatar,
}
