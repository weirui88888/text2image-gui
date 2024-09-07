const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  id: String,
  nickName: String,
  avatar: String,
  posts: [
    {
      postId: String,
      content: {
        type: Object
      },
      canvasSetting: {
        type: Object
      },
      options:{
        type: Object
      },
      url:String,
      favorite:Boolean,
      isTemplate:Boolean,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  create_date: { type: Date, default: Date.now }
})

const UserModel = mongoose.model('User', UserSchema, process.env.UserCollectionName)

module.exports = UserModel
