import Vue from 'vue'

const creatDataDictService = () => import('~/services/manage-service/data-dict.service')
const createLoginService = () => import('~/services/manage-service/applogin.service')

export default async function ({ store, router }) {
  let { DataDictService } = await creatDataDictService()
  let { LoginService } = await createLoginService()

  let dataDictService = new DataDictService()
  let loginService = new LoginService()
  // 启动数据初始化
  let flag = await Promise.all([
    updateDictData(),
    updateUserData()
  ]).then(() => {
    return true
  }).catch(ex => {
    // 基础数据初始化失败
    return false
  })

  store.commit('ready', true)

  /**
   * 检测用户数据
   */
  function updateUserData() {
    console.log(111)
    return new Promise((reslove, reject) => {
      let token = localStorage.getItem("userToken");
      // 如果检测到localStorage 有token存在，并且token没有过期，就根据token获取用户数据
      if (token && !store.state.tokenExpire) {
        loginService.checkBackToken(token).subscribe(
          data => {
            let resultData = {
              token: data.token,
              personalId: data.personalId,
              personalName: data.personalName,
              userPhone: data.phone,
            }
            store.commit('updateUserOrder', data.orderNo)
            store.dispatch('updateUserLoginData', resultData)
            reslove()
          },
          err => {
            // 登录失败，设置用户token过期
            store.dispatch('clearUserLoginData')
            reslove()
          }
        )
      }
      reslove()
    })
  }

  /**
   * 检查数据字典
   * @param reslove
   */
  function updateDictData() {
    return new Promise((reslove, reject) => {
      dataDictService.getAll().subscribe((data) => {
        store.commit('updateDictData', data)
        reslove()
      }, () => {
        reject()
      })
    })
  }
}
