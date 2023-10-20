const express = require('express')
const router = express.Router()
const { signUp, loginIn, loginOut } = require('../controller/user')

router.use((req, res, next) => {
  console.log(`------user api------`)
  next()
})

// anyphoto.space/api/user/sign-up
router.post('/sign-up', signUp)

// anyphoto.space/api/user/login-in
router.get('/login-in', loginIn)

// anyphoto.space/api/user/login-out
router.get('/login-out', loginOut)

module.exports = router
