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
const AllVehicles = () => Promise.resolve(require('~/pages/allVehicles.vue'))
const KnowOnionCar = () => Promise.resolve(require('~/pages/KnowOnionCar.vue'))
// const AddDocumentInfor = () => Promise.resolve(require('~/pages/add-document-infor.vue'))




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
  }, {
    path: '/buy-car-list/:brandId/:transKeyWord',
    name: 'BuyCarList',
    component: BuyCarList,
    props: true
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
      title: '我的订单'
    },
    component: MyOrder
  }, {
    path: '/payment-record',
    name: 'PaymentRecord',
    meta: {
      title: '还款明细'
    },
    component: PaymentRecord
  }, {
    path: '/details/:carId',
    name: 'details',
    component: Details,
    props: true
  }, {
    path: '/allVehicles',
    name: 'allVehicles',
    component: AllVehicles
  },{
    path: '/knowOnionCar',
    name: 'knowOnionCar',
    component: KnowOnionCar
  }

]

export default routes;
