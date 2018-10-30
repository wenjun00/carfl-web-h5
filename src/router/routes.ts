import Home from "~/pages/home.vue";
import Subscribe from "~/pages/subscribe.vue";
import FAQ from "~/pages/faq.vue";
import BuyCarList from "~/pages/buy-car-list.vue";
import MyOrder from "~/pages/my-order.vue"
import PaymentRecord from "~/pages/payment-record.vue";
const CustomInformation = () => Promise.resolve(require('~/pages/custom-information.vue'))
const ContactInformation = () => Promise.resolve(require('~/pages/contact-information.vue'))
const UploadIdPhotoFirst = () => Promise.resolve(require('~/pages/upload-id-photo-first.vue'))
const UploadIdPhotoTwo = () => Promise.resolve(require('~/pages/upload-id-photo-two.vue'))
const UploadIdPhotoThree = () => Promise.resolve(require('~/pages/upload-id-photo-three.vue'))
const AddInformation = () => Promise.resolve(require('~/pages/add-information.vue'))
const Details = () => Promise.resolve(require('~/pages/details.vue'))
const AllVehicles = () => Promise.resolve(require('~/pages/all-vehicles.vue'))
const KnowOnionCar = () => Promise.resolve(require('~/pages/know-onion-car.vue'))
const supportBank = () => Promise.resolve(require('~/pages/support-bank.vue'))
const hotLoading = () => Promise.resolve(require('~/pages/hot-loading.vue'))
// const AddDocumentInfor = () => Promise.resolve(require('~/pages/add-document-infor.vue'))




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
  }, {
    path: '/FAQ',
    name: 'FAQ',
    component: FAQ
  }, {
    path: '/buy-car-list',
    name: 'BuyCarList',
    component: BuyCarList,
    meta: {
      requireAuth:true,
      title: '小旺估车'
    },
    props: (route) => ({
      brandId: route.query.b,
      transKeyWord: route.query.k
    })
  }, {
    path: '/custom-information',
    name: 'custom-information',
    component: CustomInformation
  },
  {
    path: '/contact-information',
    name: 'contact-information',
    component: ContactInformation
  },
  {
    path: '/upload-id-photo-first',
    name: 'upload-id-photo-first',
    component: UploadIdPhotoFirst
  },
  {
    path: '/upload-id-photo-two',
    name: 'upload-id-photo-two',
    component: UploadIdPhotoTwo
  },
  {
    path: '/upload-id-photo-three',
    name: 'upload-id-photo-three',
    component: UploadIdPhotoThree
  },
  {
    path: '/add-information',
    name: 'add-information',
    component: AddInformation
  },
  {
    path: '/my-order',
    name: 'MyOrder',
    meta: {
      title: '小旺估车'
    },
    component: MyOrder
  }, {
    path: '/payment-record',
    name: 'PaymentRecord',
    meta: {
      requireAuth:true,
      title: '还款明细'
    },
    component: PaymentRecord
  }, {
    path: '/details/:carId',
    name: 'details',
    component: Details,
    props: true
  }, {
    path: '/all-vehicles',
    name: 'AllVehicles',
    component: AllVehicles
  }, {
    path: '/know-onion-car',
    name: 'KnowOnionCar',
    component: KnowOnionCar
  }, {
    path: '/support-bank',
    name: 'supportBank',
    component: supportBank
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
