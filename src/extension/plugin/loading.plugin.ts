import Vue from 'vue'
import { LoadingService } from '~/utils/loading.service'
export default {
  install() {
    Vue.prototype.$loading = LoadingService
  }
}
