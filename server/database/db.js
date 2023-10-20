const mongoose = require('mongoose')
const { dbDebugger } = require('../debug')
const { color } = require('../utils')
// const Schema = mongoose.Schema

// const UserModel = require('./model/user')
// const PhotoModel = require('./model/photo')

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

// const PhotoSchema = new Schema({
//   url: String,
//   avatar: String,
//   author: String,
//   content: String,
//   date: { type: Date, default: Date.now }
// })

// const UserSchema = new Schema({
//   user_pwd: String,
//   user_name: String,
//   user_email: String,
//   date: { type: Date, default: Date.now }
// })

// const Photo = mongoose.model('AnyPhoto', PhotoSchema, process.env.PhotoCollectionName)
// const User = mongoose.model('AnyPhotoUser', UserSchema, 'users')

// exports.Photo = Photo
// exports.User = User
