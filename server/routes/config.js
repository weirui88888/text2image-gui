const express = require('express')
const router = express.Router()
const { getValidFonts } = require('../controller/config')

router.use((req, res, next) => {
  console.log('------config api------')
  next()
})

router.get('/get-valid-fonts', getValidFonts)

module.exports = router
