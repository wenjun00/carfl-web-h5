const cityData = require('~/assets/json/city.json');

export class CityService {
  static instance

  /**
   * 城市输入
   * @param level
   * @param id
   */
  static getCityJson({ level = 3, id = 1 }) {
    let currentLevel = 0

    let fun = (id, currentLevel = 0) => {
      let items = new Array()

      cityData
        .filter(x => x.pid === id)
        .forEach(x => {
          let item: any = {
            value: x.id,
            label: x.name
          }

          if (currentLevel < level) {
            let children = fun(x.id, currentLevel + 1)
            if (children && children.length > 0) {
              item.children = children
            }
          }

          items.push(item)
        })

      return items
    }
    console.log(fun(1))
    return fun(1)
  }

  /**
   * 获取城市节点父元素
   * @param id
   */
  static getCityParent(id) {
    let result: Array<any> = []

    // 向根节点遍历
    let fun = (itemId) => {
      let item: any = cityData.find(x => x.id === itemId)
      if (item && item.pid !== 1) {
        result.unshift(item.pid)
        fun(item.pid)
      }
    }

    fun(id)

    return result
  }
}
