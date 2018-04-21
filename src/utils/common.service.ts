
/**
 * 公共服务类
 */
export class CommonService {
  /**
   * 获取组件名称
   * @param path
   */
  public static getComponentName(page): string {
    let path = page.path
    let pathArray = path.split('/')
    return `-${pathArray[pathArray.length - 1]}`.replace(/\-(\w)/g, ($0, $1) => $1.toUpperCase())
  }

  /**
   * 下载文件
   */
  static downloadFile(url, filename) {
    let a = document.createElement('a')
    a.href = url
    a.download = filename || (+new Date())
    a.click()
  }


  /**
  * 用户部门数据
  * @param sourece
  */
  static departmentData(sourece) {
    if (!sourece) {
      return
    }

    // 重组部门数据，以适应联级选择器
    sourece = sourece.map(v => {
      return {
        id: v.id,
        deptPid: v.deptPid,
        value: v.id,
        label: v.deptName
      }
    })

    // 生成部门结构数据
    let fun = node => {
      // 递归对象子元素
      let children = sourece.filter(x => node.id === x.deptPid).map(fun);

      if (children && children.length) {
        return Object.assign({}, node, { children })
      } else {
        return node
      }
    };

    // 过滤父节点
    let rootList = sourece.filter(x => {
      if (!x.deptPid) {
        return true;
      }

      return !sourece.find(item => item.id === x.deptPid);
    });

    // 生成树形结构
    return rootList.map(fun)
  }
}
