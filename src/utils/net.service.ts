import { Observable } from "rxjs";
import axios from 'axios'
import app from '~/config/app.config'
import { StorageService } from '~/utils/storage.service'
// import cookie from 'js-cookie'

const getType = ['GET', 'DELETE'] // 使用GET请求类型

export class NetService {
  // 使用GET请求类型
  private axiosInstance
  private userToken

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: app.url.server,
      timeout: app.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  private generateRequestUrl({ controller, action, url }): String {
    // 自定义url优先级最高
    if (url) return url

    // 进行url拼接
    if (controller) {
      return `api/${controller}${(action ? '/' + action : '')}`
    } else {
      throw new Error('server配置异常,请检查对应server配置')
    }
  }

  /**
   * 生成头部信息
   */
  private generateRequestHeader(headers): Object {
    let token = StorageService.getItem('userToken') || ''
    if (token) {
      return Object.assign({
        'X-userToken': token
      }, headers)
    } else {
      return headers || {}
    }
  }

  /**
   * 发送网络请求信息
   * @param param0
   */
  send(options: any): Observable<any> {
    let data
    let postData
    let getData

    let url = this.generateRequestUrl(options.server)
    let method = options.server.type || 'GET'
    let headers = this.generateRequestHeader(options.headers)

    if (options.page) {
      data = Object.assign({}, options.data || {}, options.page.getConfig())
    }

    // 判断参数类型
    getType.indexOf(method) > -1 ? (getData = data) : (postData = data)

    // 添加append参数
    if (options.append) {
      typeof options.append === 'object' ? Object.assign(getData, options.append || {}) : (url += options.append)
    }

    // 创建待观察对象
    var observable = Observable.create((observer) => {
      this.axiosInstance.request({
        method,
        url,
        headers,
        data: postData,
        params: getData
      }).then(({ data }) => {
        if (options.page && data.content) {
          options.page.update(data)
          data = data.content
        }

        observer.next(data)
      }).catch((ex, { response }) => {
        if (options.loading && options.loading.state) {
          options.loading.state = false
        }
        console.log(ex)

        // 通讯状态检测
        if (!response) {
          let error = {
            msg: "服务端连接异常，请检查服务端状态.",
          }
          console.error(error.msg)
          observer.error(error)
          return
        }

        // 错误类型检测
        switch (response.status) {
          case 400:
            {
              // 错误信息获取
              let error = {
                msg: decodeURIComponent(response.headers['x-alert']),
                params: response.headers['x-params']
              }

              console.error(error)
              observer.error(error)
              break;
            }
          case 403:
            {
              //
            }
            break;
        }
      })
    })

    return observable
  }
}
