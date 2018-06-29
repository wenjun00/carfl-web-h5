import Vue from 'vue'
import { PolisService } from '~/utils/polis.service'

export default {
  install() {
    Vue.prototype.$filter = PolisService
  }
}
