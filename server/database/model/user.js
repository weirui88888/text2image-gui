const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  user_pwd: String,
  user_name: String,
  user_email: String,
  user_id: String,
  date: { type: Date, default: Date.now }
})

const UserModel = mongoose.model('AnyPhotoUser', UserSchema, process.env.UserCollectionName)

module.exports = UserModel
