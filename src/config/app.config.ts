declare var __REGISTER_PAGE_LIST__: Array<any>

export default {
  name: '汽车金融-H5',
  version: '1.0.0',
  url: {
    server: process.env.URL_SERVER
  },
  mock: process.env.MOCK,
  timeout: 60000,
  debug: process.env.ENV === 'dev',
  registerPageList: __REGISTER_PAGE_LIST__
}