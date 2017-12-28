'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const devEnv = require('../environment/dev.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
}, devEnv)
