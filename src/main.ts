// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from '~/App.vue'
import store from './store'
import router from './router'
import bootstrap from '~/core/bootstrap'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css";

bootstrap({ store })

Vue.use(ElementUI)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
