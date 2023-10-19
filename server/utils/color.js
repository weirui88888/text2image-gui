const c = require('ansi-colors')

const colorTip = (msg, ...args) => {
  if (args.length === 0) {
    console.log(msg)
  }
  const nextStyle = args[0]
  return colorTip(c[nextStyle](msg), ...args.slice(1))
}

const color = (msg, ...args) => {
  if (args.length === 0) {
    return msg
  }
  const nextStyle = args[0]
  return color(c[nextStyle](msg), ...args.slice(1))
}

exports.colorTip = colorTip
exports.color = color
