export default function ({ store }): Object {
  return {
    /**
     * 日期格式化
     */
    dateFormat: (date, fmt): String => {
      if (date === null || date === undefined || date === '') {
        return ''
      }

      // 如果是时间戳则转化为时间
      if (typeof date === 'number') {
        date = new Date(date)
      }

      // console.log('date:', typeof date)
      let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }

      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))

      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }

      return fmt
    }
  }
}
