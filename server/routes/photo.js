const express = require('express')
const router = express.Router()
const { createPhoto, deletePhoto } = require('../controller/photo')

router.use((req, res, next) => {
  console.log('------photo api------')
  next()
})

router.get('/create', createPhoto)

router.get('/delete', deletePhoto)

module.exports = router
