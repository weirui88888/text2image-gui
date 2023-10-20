const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  url: String,
  avatar: String,
  author: String,
  content: String,
  date: { type: Date, default: Date.now }
})

const UserModel = mongoose.model('AnyPhotoUser', UserSchema, process.env.PhotoCollectionName)

module.exports = UserModel
