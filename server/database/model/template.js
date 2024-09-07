const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TemplateSchema = new Schema({
  // 作者id
  posterId:String,
  // 作品id
  postId:String,
  // 作品地址
  url: String,
  // 内容
  content: String,
  // 配置
  canvasSetting: {
    type: Object
  },
  usageCount:Number,
  beautyCount:Number,
  // avatar && title
  options:{
    type: Object
  },
  weight:Number,
  date: { type: Date, default: Date.now }
})

const TemplateModel = mongoose.model('template', TemplateSchema, 'template')

module.exports = TemplateModel
