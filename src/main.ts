// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from '~/App.vue'
import store from './store'
import router from './router'
import bootstrap from '~/core/bootstrap'
import iView from 'iview'

bootstrap({ store })

Vue.use(iView)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
