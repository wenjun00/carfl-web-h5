import Vue from 'vue'
import IView from 'iview'
// 扩展vue接口
declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    $layout: string
    $dict: any
    $city: any
    $filter: any
    $validate: any
    $Message: any
    $Modal: any
  }
}
