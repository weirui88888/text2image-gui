const mongoose = require('mongoose')
const { dbDebugger } = require('./debug')
const { color } = require('./utils')
const Schema = mongoose.Schema

if (process.env.MongodbAltasAddress) {
  mongoose.connect(
    `mongodb+srv://${process.env.DBUserName}:${process.env.DBUserPassword}@${process.env.MongodbAltasAddress}/${process.env.DBName}?retryWrites=true&w=majority`
  )
} else {
  mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBName}`)
}

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connect error:'))
db.once('open', function () {
  dbDebugger(
    `Connect ${process.env.MongodbAltasAddress ? 'remote' : 'local'} database ${color('successful', 'green')}!`
  )
})

const PhotoSchema = new Schema({
  url: String,
  avatar: String,
  author: String,
  content: String,
  date: { type: Date, default: Date.now }
})
const Photo = mongoose.model('AnyPhoto', PhotoSchema, process.env.PhotoCollectionName)

exports.Photo = Photo
