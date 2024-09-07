const express = require('express')
const router = express.Router()
const { generatePhoto, deletePhoto } = require('../controller/photo')
const { logDebugger } = require('../debug')

router.use((req, res, next) => {
  logDebugger('req.url===============>',req.url)
  next()
})

router.post('/', generatePhoto)

router.get('/delete', deletePhoto)

module.exports = router
