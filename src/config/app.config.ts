export default {
  name: '催大人',
  version: '2.0.0',
  url: {
    server: process.env.URL_SERVER
  },
  mock: process.env.MOCK,
  timeout: 60000,
  debug: process.env.ENV === 'dev'
}
