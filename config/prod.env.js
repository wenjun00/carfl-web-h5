const prodEnv = require('../environment/dev.env')

'use strict'
module.exports = merge({
  NODE_ENV: '"production"'
}, prodEnv)
