import Home from "~/pages/home.vue";
import Subscribe from "~/pages/subscribe.vue";
import BuyCarList from "~/pages/buy-car-list.vue";
import MyOrder from "~/pages/my-order.vue"
const AddInformation = () => Promise.resolve(require('~/pages/add-information.vue'))
const AllVehicles = () => Promise.resolve(require('~/pages/all-vehicles.vue'))
const supportBank = () => Promise.resolve(require('~/pages/support-bank.vue'))
const hotLoading = () => Promise.resolve(require('~/pages/hot-loading.vue'))
// 路由信息配置
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '小旺估车'
    }
  }, {
    path: '/subscribe',
    name: 'Subscribe',
    component: Subscribe,
    meta: {
      requireAuth:true,
      title: '小旺估车'
    }
  },
  {
    path: '/buy-car-list',
    name: 'BuyCarList',
    component: BuyCarList,
    meta: {
      requireAuth:true,
      title: '小旺估车'
    },
  },
  {
    path: '/add-information',
    name: 'add-information',
    component: AddInformation,
    meta: {
      requireAuth:true,
      title: '返回车系'
    }
  },
  {
    path: '/my-order',
    name: 'MyOrder',
    meta: {
      title: '小旺估车'
    },
    component: MyOrder
  },
  {
    path: '/all-vehicles',
    name: 'AllVehicles',
    component: AllVehicles,
    meta: {
      requireAuth:true,
      title: '返回品牌'
    }
  },
  {
    path: '/support-bank',
    name: 'supportBank',
    component: supportBank,
    meta: {
      requireAuth:true,
      title: '小旺估车'
    }
  }, {
    path: '/hot-loading',
    name: 'hotLoading',
    component: hotLoading,
    meta: {
      requireAuth:true,
      title: '小旺估车'
    }
  }

]
export default routes;
