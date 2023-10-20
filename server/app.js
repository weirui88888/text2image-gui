require('dotenv').config({ path: './.env.local' }) // set process.env
require('./database/db')

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const OSS = require('ali-oss')
const cookieParser = require('cookie-parser')
const errorHandler = require('errorhandler')
const morgan = require('morgan')
const cors = require('cors')
const axios = require('axios')
// TODO:导出默认
const generate = require('anyphoto/src/cmd/generate')
const { getCaptchaUrl } = require('./utils')
const userRouterApi = require('./routes/user')
const photRouterApi = require('./routes/photo')

const app = express()

app.set('port', process.env.PORT ?? 3001)
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/user', userRouterApi)
app.use('/api/photo', photRouterApi)

// app.get('/api', async (req, res) => {
//   const client = new OSS({
//     region: 'oss-cn-beijing',
//     accessKeyId: process.env.AccessKeyId,
//     accessKeySecret: process.env.AccessKeySecret,
//     bucket: 'anyphoto'
//   })
//   const { content, author, avatar, outputName } = req.query
//   const photoSrc = await generate({
//     content,
//     options: {
//       author,
//       avatar,
//       outputName
//     }
//   })

//   const dirnamePath = path.dirname(photoSrc)
//   const imageName = photoSrc.replace(`${dirnamePath}/`, '')
//   const photoRes = await client.put(`myphotos/${imageName}`, photoSrc)

//   const usedSrc = `https://anyphoto.newarray.vip/${photoRes.name}`
//   const newPhoto = new Photo({
//     content,
//     author,
//     avatar,
//     url: usedSrc
//   })
//   await newPhoto.save()
//   res.setHeader('Content-Type', 'text/html;charset=utf8')
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
//   res.end(
//     `<h1 align="center" style="margin-top:200px;color:red;">generate photo <a href="${usedSrc}">${usedSrc}</a> successful!</h1><img src="${usedSrc}" style="display:block;margin:30px auto;"/>`
//   )
// })

// Development only
if (app.get('env') === 'development') {
  app.use(errorHandler())
}
// app.post('/create', routes.create)
// app.get('/destroy/:id', routes.destroy)
// app.get('/edit/:id', routes.edit)
// app.post('/update/:id', routes.update)
module.exports = app
