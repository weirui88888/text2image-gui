const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhotoSchema = new Schema({
  url: String,
  avatar: String,
  author: String,
  content: String,
  date: { type: Date, default: Date.now }
})

const PhotoModel = mongoose.model('AnyPhotoPhoto', PhotoSchema, process.env.PhotoCollectionName)

module.exports = PhotoModel
