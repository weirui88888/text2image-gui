const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ThemeSchema = new Schema({
  type:{
    type: String,
    enum: ['light','dark','lightGradient','darkGradient'],
    required: true
  },
  backgroundColor: {
    type: Schema.Types.Mixed, 
    required: true
  },
  // 渐变停止值
  linearGradientStop: {
    type: [Number],
    default: undefined ,
    required: false
  },
  // 渐变方向
  linearGradientDirection: {
    type: String,
    enum: ['to left', 'to right', 'to top', 'to bottom', 'to left top', 'to right top', 'to right bottom', 'to left bottom'],
    required: false
  },
  // 字体颜色
  color: {
    type: String,
    required: true
  },
  // 唯一标识
  id: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now }
});

const ThemeModel = mongoose.model('theme', ThemeSchema, 'theme')

module.exports = ThemeModel
