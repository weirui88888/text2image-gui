const axios = require('axios')
const PhotoModel = require('../database/model/photo')

const createPhoto = async (req, res) => {
  res.send('photo create route')
}
const deletePhoto = async (req, res) => {
  res.send('photo delete route')
}

module.exports = {
  createPhoto,
  deletePhoto
}
