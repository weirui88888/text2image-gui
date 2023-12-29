const express = require('express')
const router = express.Router()
const { comment, contact, like, getLikeCount } = require('../controller/interactive')

router.use((req, res, next) => {
  console.log('------interactive api------')
  next()
})

router.post('/comment', comment)
router.post('/contact', contact)
router.post('/like', like)
router.get('/get-liked-count', getLikeCount)

module.exports = router
