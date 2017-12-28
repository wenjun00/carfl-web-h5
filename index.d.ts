import Vue from 'vue'

// 扩展vue接口
declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    $router: any  // 路由属性
    $layout: String
    $message: any
  }
}

declare module '*.vue' {
  export default Vue
}
