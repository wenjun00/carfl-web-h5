

const unit = 25

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

    // 生成部门结构数据
    let fun = node => {
      // 递归对象子元素
      let children = sourece.filter(x => node.id === x.pid).map(fun);

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

      return !sourece.find(item => item.id === x.pid);
    });

    // 生成树形结构
    return rootList.map(fun)
  }

  static getColumnWidth(count) {
    return count * unit
  }

  static reset(target, options?) {
    let check = (item, key, value) => {
      switch (typeof value) {
        case 'number': {
          item[key] = 0
          break;
        }
        case 'string': {
          item[key] = ""
          break;
        }
        case 'object': {
          if (value instanceof Array) {
            clearArray(value)
          } else {
            clearObject(value)
          }
          break;
        }
      }
    }

    let clearObject = (object) => {
      Object.entries(object).forEach(([key, value]) => {
        check(object, key, value)
      })
    }

    let clearArray = (array) => {
      array.forEach((value, index) => {
        check(array, index, value)
      })
    }

    if (target instanceof Array) {
      clearArray(target)
    } else {
      clearObject(target)
    }
  }
}
