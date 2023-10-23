const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  user_name: String,
  user_id: String,
  user_email: String,
  user_pwd: String,
  token: String,
  date: { type: Date, default: Date.now }
})

const UserModel = mongoose.model('AnyPhotoUser', UserSchema, process.env.UserCollectionName)

module.exports = UserModel
