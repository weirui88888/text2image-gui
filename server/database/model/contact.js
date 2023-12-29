const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
  user_name: String,
  user_email: String,
  user_contact_detail: String,
  date: { type: Date, default: Date.now }
})

const ContactModel = mongoose.model('AnyPhotoContact', ContactSchema, process.env.ContactCollectionName)

module.exports = ContactModel
