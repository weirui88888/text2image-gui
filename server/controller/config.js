const path = require('path')
const fs = require('fs')
const fontsDir = path.join(process.cwd(), '..', 'anyphoto-web-font')

const getValidFonts = async (req, res, next) => {
  fs.readdir(fontsDir, (err, fonts) => {
    if (err) {
      console.error('Error reading fonts directory:', err)
      return
    }
    const fontNames = fonts.reduce((acc, cur) => {
      const fontFullName = cur
      const fontName = path.basename(cur, path.extname(cur))
      const [name, style] = fontName.split('-')
      return [...acc, { fontFullName, name, style, src: `https://static.anyphoto.space/fonts/${cur}` }]
    }, [])
    res.send({
      code: 200,
      message: 'success',
      data: fontNames
    })
  })
}

module.exports = {
  getValidFonts
}
