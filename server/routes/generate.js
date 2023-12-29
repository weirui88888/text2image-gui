const express = require('express')
const router = express.Router()
const { generatePhoto, deletePhoto } = require('../controller/photo')

router.use((req, res, next) => {
  console.log('------photo api------')
  next()
})

router.post('/', generatePhoto)

router.get('/delete', deletePhoto)

module.exports = router
