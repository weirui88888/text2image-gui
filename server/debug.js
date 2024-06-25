const createDebug = require('debug')

createDebug.formatters.U = v => v.toUpperCase()
createDebug.formatters.S = v => v.split(' ')

const httpDebugger = createDebug('text2image:http')
const motorDebugger = createDebug('text2image:motor')
const dbDebugger = createDebug('text2image:database')
const authDebugger = createDebug('text2image:auth')
const logDebugger = createDebug('text2image:log')

module.exports = {
  httpDebugger,
  dbDebugger,
  motorDebugger,
  authDebugger,
  logDebugger
}
