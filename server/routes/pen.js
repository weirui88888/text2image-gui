const express = require('express')
const router = express.Router()
const { pen } = require('../controller/pen')

router.use((req, res, next) => {
  console.log('------pen api------')
  next()
})

router.post('/', pen)

module.exports = router
