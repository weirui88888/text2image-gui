const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
  //增加路径别名的处理
  addWebpackAlias({
    '@': path.resolve('./src')
  })
)
