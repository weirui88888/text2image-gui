const express = require('express')
const router = express.Router()
const { signUp, loginIn, authCheck, loginOut } = require('../controller/user')

router.use((req, res, next) => {
  console.log('------user api------')
  next()
})

router.post('/sign-up', signUp)

router.post('/login-in', loginIn)

router.get('/auth-check', authCheck)

router.get('/login-out', loginOut)

module.exports = router
