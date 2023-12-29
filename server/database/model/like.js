const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LikeSchema = new Schema({
  user_name: String,
  user_email: String,
  date: { type: Date, default: Date.now }
})

const LikeModel = mongoose.model('AnyPhotoLike', LikeSchema, process.env.LikeCollectionName)

module.exports = LikeModel
