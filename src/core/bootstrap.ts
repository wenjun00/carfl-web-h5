import Vue from 'vue'
import injector from 'vue-inject';
// import createFilter from '~/core/filter'
// import createDirectives from '../core/directive'
import createProvide from '~/core/provide'

export default function ({ store }) {
  // 安装过滤器
  // if (createFilter) {
  //   Object.entries(createFilter({ store })).forEach(([key, fun]) => {
  //     Vue.filter(key, fun)
  //   })
  // }

  // // 安装指令
  // if (createDirectives) {
  //   Object.entries(createDirectives({ store })).forEach(([key, fun]) => {
  //     Vue.directive(key, fun)
  //   })
  // }

  // 创建提供器
  if (createProvide) {
    Vue.use(injector)
    Object.entries(createProvide()).forEach(([key, value]) => {
      let lifecycle: any = "class"
      let provide: any

      if (value instanceof Array) {
        lifecycle = value[1]
        provide = value[0]
      } else {
        provide = value
      }

      let [target] = Object.values(provide())
      injector.service(key, target);
    })
  }
}
