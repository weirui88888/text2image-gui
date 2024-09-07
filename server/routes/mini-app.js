const express = require('express')
const router = express.Router()
const { uploadImages, uploadImage, code2session } = require('../controller/mini-app')
const { register, userInfo, resetNickName, resetAvatar } = require('../controller/miniApp/user')
const { create,switchFavorite } = require('../controller/miniApp/post')
const { getTemplates,switchTemplate,useTemplate } = require('../controller/miniApp/template')
const { getThemes,addTheme,removeTheme } = require('../controller/miniApp/theme')
const { logDebugger } = require('../debug')
const { getTime } = require('../utils')

const multer = require('multer')

const upload = multer()

router.use((req, res, next) => {
  logDebugger(`------start mini-app request at ${getTime()}-----`)
  logDebugger('req.body===============>', req.body)
  next()
})

router.get('/code2session', code2session)

router.post('/uploadAvatar', upload.any(), uploadImages)
router.post('/uploadImage', upload.any(), uploadImage)
router.post('/register', register)
router.post('/user-info', userInfo)
router.post('/resetNickName', resetNickName)
router.post('/resetAvatar', resetAvatar)
router.post('/create', create)
router.post('/switch-favorite', switchFavorite)
router.post('/switch-template', switchTemplate)
router.post('/use-template', useTemplate)

router.get('/get-template', getTemplates)

router.get('/get-theme', getThemes)
router.post('/add-theme', addTheme)
router.delete('/remove-theme/:id', removeTheme);



module.exports = router
