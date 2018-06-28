const polisData = require('~/assets/json/dict.json');
// import AreaData from "~/assets/area";

export class PolisService {
  private static citys

  /**
   * 获取城市信息
   * @param level
   * @param id
   */
  static getCityData() {
    if (PolisService.citys) {
      return PolisService.citys
    }

    let data = []

    polisData.forEach(city => {
      let province = data.find(x => x.value === city.province_code)

      if (!province) {
        province = {
          value: city.province_code,
          label: city.province_name,
          children: []
        }

        data.push(province)
      }

      province.children.push({
        value: city.city_code,
        label: city.city_name,
      })
    })

    PolisService.citys = data

    return data
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
