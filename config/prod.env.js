'use strict'

const prodEnv = require('../environment/dev.env')
const merge = require('webpack-merge')

module.exports = merge({
  NODE_ENV: '"production"'
}, prodEnv)
