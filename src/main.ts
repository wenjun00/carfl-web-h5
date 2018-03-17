// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from '~/App.vue'
import store from './store'
import router from './router'
import bootstrap from '~/core/bootstrap'

import SvgIcon from "~/components/common/svg-icon.vue";
import {Checkbox} from 'iview'

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
  // console.log(i-checkbox)
  // 添加全局变量
  Vue.component('svg-icon', SvgIcon)
  Vue.component('i-checkbox',Checkbox)
}

// 打印版本发布信息
if (process.env.BUILD_TIME) {
  console.log('当前环境:' + process.env.BUILD_ENV)
  console.log('版本发布时间:' + process.env.BUILD_TIME)
}

// 应用程序启动
startUp()
