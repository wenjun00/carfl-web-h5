import Vue from 'vue'

import cityPlugin from './city.plugin'
import dictPlugin from './dict.plugin'
import filterPlugin from './filter.plugin'
import commonPlugin from './common.plugin'
import validatorPlugin from './validator.plugin'
import loadingPlugin from './loading.plugin'

export default ({ store }) => ({
  cityPlugin,
  dictPlugin,
  filterPlugin,
  commonPlugin,
  validatorPlugin,
  loadingPlugin,
})
