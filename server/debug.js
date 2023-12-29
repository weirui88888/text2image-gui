const createDebug = require('debug')

createDebug.formatters.U = v => v.toUpperCase()
createDebug.formatters.S = v => v.split(' ')

const httpDebugger = createDebug('anyphoto:http')
const motorDebugger = createDebug('anyphoto:motor')
const dbDebugger = createDebug('anyphoto:database')
const authDebugger = createDebug('anyphoto:auth')
const logDebugger = createDebug('anyphoto:log')

module.exports = {
  httpDebugger,
  dbDebugger,
  motorDebugger,
  authDebugger,
  logDebugger
}
