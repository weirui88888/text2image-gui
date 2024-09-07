const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  posterId:String,
  postId:String,
  url: String,
  content: String,
  canvasSetting: {
    type: Object
  },
  options:{
    type: Object
  },
  date: { type: Date, default: Date.now }
})

const PostModel = mongoose.model('post', PostSchema, 'post')

module.exports = PostModel
