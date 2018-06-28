const polisData = require('~/assets/json/dict.json');
// import AreaData from "~/assets/area";
 
export class PolisService {
  /**
   * 获取城市信息
   * @param level
   * @param id
   */
  static getCityData({ level = 2, id = 1 } = {}) {
    let fun = (id, currentLevel = 1) => {
      let items = new Array()
      

      polisData
        // .map(x => x.pid === id)
        .forEach(x => {
          // 生成城市对象
          let item: any = {
            value: x.province_code,
            label: x.province_name
          }

          // 检测获取级别
          // if (currentLevel < level) {
          //   let children = fun(x.id, currentLevel + 1)
          //   if (children && children.length > 0) {
          //     item.children = children
          //   }
          // }

          items.push(item)
          
        })
        let bbb = Array.from(new Set(items))
        console.log(bbb,22222)

      // return items
    }

    return fun(id)
  }

  /**
   * 获取城市节点父元素
   * @param id
   */
  static getCityParent(id) {
    let result: Array<any> = []

    // 向根节点遍历
    let fun = (itemId) => {
      let item: any = polisData.find(x => x.id === itemId)
      if (item && item.pid !== 1) {
        result.unshift(item.pid)
        fun(item.pid)
      }
    }

    fun(id)

    return result
  }

  /**
   * 获取城市名称
   * @param id
   */
  static getCityName(...ids) {
    let results: Array<string> = []

    ids.forEach(id => {
      let item = polisData.find(c => c.id === id) || {}
      results.push(item.name)
    })

    return results.length < 1 ? results[0] : results
  }
}
