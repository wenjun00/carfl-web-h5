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
    }
]

export default routes;
