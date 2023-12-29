const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  user_name: String,
  user_email: String,
  user_comment_content: String,
  date: { type: Date, default: Date.now }
})

const CommentModel = mongoose.model('AnyPhotoComment', CommentSchema, process.env.CommentCollectionName)

module.exports = CommentModel
