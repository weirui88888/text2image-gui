const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
  console.log(`------photo api------`)
  next()
})

router.get('/create', (req, res) => {
  res.send('photo create route')
})

router.get('/delete', (req, res) => {
  res.send('photo delete route')
})

module.exports = router
