// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from '~/App.vue'
import store from './store'
import router from './router'
import bootstrap from '~/core/bootstrap'
import iView from 'iview'
import AMap from 'vue-amap';

bootstrap({ store })

Vue.use(iView)
Vue.use(AMap);

AMap.initAMapApiLoader({
  key: '0240ff10dd31d192c04ae9e0d4c76561',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
