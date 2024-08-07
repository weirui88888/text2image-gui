const express = require('express')
const router = express.Router()
const { uploadImages,uploadBackground } = require('../controller/mini-app')
const { logDebugger } = require('../debug')
const { getTime } = require('../utils')
const multer = require('multer');

const upload = multer();


router.use((req, res, next) => {
  logDebugger(`------start mini-app request at ${getTime()}-----`)
  logDebugger('req.body===============>',req.body)
  next()
})

router.post('/uploadAvatar', upload.any(),uploadImages)
router.post('/uploadBackground', upload.any(),uploadBackground)


module.exports = router
