import Vue from 'vue'
import { CityService } from '~/utils/city.service'
import { DictService } from '~/utils/dict.service'

export default ({ store }) => ({
  cityPlugin: {
    install() {
      Vue.prototype.$city = CityService
    }
  },
  dictPlugin: {
    install() {
      Vue.prototype.$dict = DictService
    }
  },
})
