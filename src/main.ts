// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from '~/App.vue'
import store from './store'
import router from './router'
import bootstrap from '~/core/bootstrap'


async function startUp() {
  // 启动主体业务逻辑
  await bootstrap({ store, router })

  // 生成提示信息
  Vue.config.productionTip = false

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
}

// 应用程序启动
startUp()