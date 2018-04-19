import validator from 'async-validator'
import { Modal } from 'iview'

export class dialogService {
  /**
   * 显示弹出框
   * @param type 
   * @param option 
   */
  static show(type: "info" | "confirm" = "info", option) {
    Modal[type](Object.assign({
      width: "70%"
    }), option)
  }
}
