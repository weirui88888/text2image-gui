const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PenSchema = new Schema({
  user_name: String,
  user_email: String,
  user_pen_content: String,
  date: { type: Date, default: Date.now }
})

const PenModel = mongoose.model('AnyPhotoPen', PenSchema, process.env.PenCollectionName)

module.exports = PenModel
