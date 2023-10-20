const express = require('express')
const router = express.Router()
const UserModel = require('../database/model/user')

router.use((req, res, next) => {
  console.log(`------user api------`)
  next()
})

router.get('/sign-up', (req, res) => {
  res.send('user sign-up route')
})

router.get('/login-in', async (req, res) => {
  const user = new UserModel({
    user_name: 'xdz1',
    user_email: 'xdz@520.com',
    user_pwd: 'xdz520'
  })
  const newUser = await user.save()
  res.send(newUser)
})

router.get('/login-out', (req, res) => {
  res.send('user login-out route')
})

module.exports = router

// anyphoto.space/api/user/sign-up
// anyphoto.space/api/user/login-in
// anyphoto.space/api/user/login-out
