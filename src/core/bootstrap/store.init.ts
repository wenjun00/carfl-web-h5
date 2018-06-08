import Vue from 'vue'

const creatDataDictService = () => import('~/services/manage-service/data-dict.service')

export default async function ({ store, router }) {
  let { DataDictService } = await creatDataDictService()

  let dataDictService = new DataDictService()
  // 启动数据初始化
  let flag = await Promise.all([
    updateDictData()
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
  async function updateUserData() {
    return new Promise((reslove, reject) => {
      // 登录页面不更新用户数据
      if (!store.state.userToken && window.location.pathname == "/") {
        reslove()
        return
      }

      // 不存在token不更新用户数据
      if (!store.state.userToken && window.location.pathname != "/") {
        store.commit("updateTokenExpire", true)
        reject()
        return
      }

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
