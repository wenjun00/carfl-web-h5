const ENV:any = process.env

export default {
  name: '催大人',
  version: '2.0.0',
  url: {
    server: ENV.URL.SERVER
  },
  timeout: 3000,
  debug: ENV.ENV === 'dev'
}
