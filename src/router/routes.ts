import Home from "~/pages/home.vue";
import Subscribe from "~/pages/subscribe.vue";
import FAQ from "~/pages/faq.vue";

// 路由信息配置
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '洋葱汽车'
    }
  }, {
    path: '/subscribe',
    name: 'Subscribe',
    component: Subscribe,
    meta: {
      title: '帮我买车'
    }
  }, {
    path: '/FAQ',
    name: 'FAQ',
    component: FAQ
  }
]

export default routes;
