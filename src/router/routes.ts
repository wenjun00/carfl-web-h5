import Home from "~/pages/home.vue";
import Subscribe from "~/pages/subscribe.vue";
import FAQ from "~/pages/faq.vue";
import BuyCarList from "~/pages/buy-car-list.vue";
const CustomInformation = () => Promise.resolve(require('~/pages/customInformation.vue'))
const ContactInformation = () => Promise.resolve(require('~/pages/contactInformation.vue'))
const UploadIdPhotoFirst = () => Promise.resolve(require('~/pages/uploadIdPhotoFirst.vue'))
const UploadIdPhotoTwo = () => Promise.resolve(require('~/pages/uploadIdPhotoTwo.vue'))
const UploadIdPhotoThree = () => Promise.resolve(require('~/pages/uploadIdPhotoThree.vue'))
const AddInformation = () => Promise.resolve(require('~/pages/addInformation.vue'))
const AddDocumentInfor = () => Promise.resolve(require('~/pages/addDocumentInfor.vue'))
import MyOrder from "~/pages/my-order.vue"
import PaymentRecord from "~/pages/payment-record.vue";

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
    path: '/buy-car-list',
    name: 'BuyCarList',
    component: BuyCarList
  }, {
    path: '/customInformation',
    name: 'customInformation',
    component: CustomInformation
  },
  {
    path: '/contactInformation',
    name: 'contactInformation',
    component: ContactInformation
  },
  {
    path: '/uploadIdPhotoFirst',
    name: 'uploadIdPhotoFirst',
    component: UploadIdPhotoFirst
  },
  {
    path: '/uploadIdPhotoTwo',
    name: 'uploadIdPhotoTwo',
    component: UploadIdPhotoTwo
  },
  {
    path: '/uploadIdPhotoThree',
    name: 'uploadIdPhotoThree',
    component: UploadIdPhotoThree
  },
  {
    path: '/addInformation',
    name: 'addInformation',
    component: AddInformation
  },
  {
    path: '/addDocumentInfor',
    name: 'addDocumentInfor',
    component: AddDocumentInfor
  }, {
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
  }
]

export default routes;
