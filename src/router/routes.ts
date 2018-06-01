import Home from "~/pages/home.vue";
import Subscribe from "~/pages/subscribe.vue";

// 路由信息配置
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  }, {
    path: '/subscribe',
    name: 'Subscribe',
    component: Subscribe
  }
]

export default routes;
