import Home from "~/pages/home.vue";
import Subscribe from "~/pages/subscribe.vue";
import FAQ from "~/pages/faq.vue";
import BuyCarList from "~/pages/buy-car-list.vue";
const CustomInformation = () => Promise.resolve(require('~/pages/custom-information.vue'))
const ContactInformation = () => Promise.resolve(require('~/pages/contact-information.vue'))
const UploadIdPhotoFirst = () => Promise.resolve(require('~/pages/upload-id-photo-first.vue'))
const UploadIdPhotoTwo = () => Promise.resolve(require('~/pages/upload-id-photo-two.vue'))
const UploadIdPhotoThree = () => Promise.resolve(require('~/pages/upload-id-photo-three.vue'))
const AddInformation = () => Promise.resolve(require('~/pages/add-information.vue'))
const AddDocumentInfor = () => Promise.resolve(require('~/pages/add-document-infor.vue'))

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
        path: '/add-document-infor',
        name: 'add-document-infor',
        component: AddDocumentInfor
    }
]

export default routes;
