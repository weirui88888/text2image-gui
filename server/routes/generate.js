const express = require('express')
const router = express.Router()
const { generatePhoto, deletePhoto } = require('../controller/photo')
const { logDebugger } = require('../debug')
const { getTime } = require('../utils')

router.use((req, res, next) => {
  logDebugger(`------start generate photo at ${getTime()}-----`)
  logDebugger('req.body===============>',req.body)
  next()
})

router.post('/', generatePhoto)

router.get('/delete', deletePhoto)

module.exports = router
