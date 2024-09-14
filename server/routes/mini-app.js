const express = require('express')
const router = express.Router()
const rateLimit = require('express-rate-limit')

const { uploadImages, uploadImage, code2session } = require('../controller/mini-app')
const { register, userInfo, resetNickName, resetAvatar } = require('../controller/miniApp/user')
const { create,switchFavorite } = require('../controller/miniApp/post')
const { getTemplates,switchTemplate,useTemplate } = require('../controller/miniApp/template')
const { getThemes,addTheme,removeTheme } = require('../controller/miniApp/theme')
const { logDebugger } = require('../debug')
const { getTime } = require('../utils')

const multer = require('multer')

const upload = multer()

const create_limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10, 
  handler: (req, res) => {
    res.status(429).send({
        code: 429,
        message: '请求太多啦，让我喘口气～'
    });
  }
})

const register_limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10, 
  handler: (req, res) => {
    res.status(429).send({
        code: 429,
        message: '求求小主了，让我喘口气～'
    });
  }
})

router.use((req, res, next) => {
  logDebugger(`============================== req.url  =============================`)
  console.log(req.originalUrl)
  logDebugger('============================== req.body =============================')
  console.log(req.body)
  next()
})

router.get('/code2session', code2session)

router.post('/uploadAvatar', upload.any(), uploadImages)
router.post('/uploadImage', upload.any(), uploadImage)
router.post('/register',register_limiter, register)
router.post('/user-info', userInfo)
router.post('/resetNickName', resetNickName)
router.post('/resetAvatar', resetAvatar)
router.post('/create',create_limiter, create)
router.post('/switch-favorite', switchFavorite)
router.post('/switch-template', switchTemplate)
router.post('/use-template', useTemplate)

router.get('/get-template', getTemplates)

router.get('/get-theme', getThemes)
router.post('/add-theme', addTheme)
router.delete('/remove-theme/:id', removeTheme);



module.exports = router
