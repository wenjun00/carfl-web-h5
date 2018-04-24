import validator from 'async-validator'
import { Form } from 'iview'
export class ValidatorService {
  /**
   * 自定义验证器
   * @param data 
   * @param descriptor 
   * @param callback 
   */
  static validate(data: any, descriptor: any) {
    let schema = new validator(descriptor);
    let process = new Promise((reslove, reject) => {
      schema.validate(data, (errors, fields) => {
        if (errors && errors.length) {
          let [error] = errors
          // 验证成功
          reslove(error.message)
        } else {
          reslove()
        }
      });
    })
    return process
  }

  // 验证正则列表
  static regex = {
    // 手机号
    phoneNumber: /^1(3|4|5|7|8)\d{9}$/,
    // 身份证18位
    idCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/,
    // 金额
    money: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/,
    // 邮编
    zipCode: /^[1-9]\d{5}(?!\d)$/
  }

  /**
   * 验证手机号
   */
  static phoneNumber(rule, value, callback) {
    if (ValidatorService.regex.phoneNumber.test(value) || !value) {
      callback();
    } else {
      callback(new Error("请输入正确的手机号"));
    }
  }

  /**
   * 验证身份证
   */
  static idCard(rule, value, callback) {
    if (ValidatorService.regex.idCard.test(value) || !value) {
      callback();
    } else {
      callback(new Error("请输入正确的身份证号码"));
    }
  }

  /**
   * 验证金额
   */
  static money(rule, value, callback) {
    if (ValidatorService.regex.money.test(value) || !value) {
      callback();
    } else {
      callback(new Error("请输入正确格式的金额"));
    }
  }

   /**
   * 验证金额
   */
  static zipCode(rule, value, callback) {
    if (ValidatorService.regex.zipCode.test(value) || !value) {
      callback();
    } else {
      callback(new Error("请输入正确的邮政编码"));
    }
  }

  /**
   * 表单验证
   * @param rule 
   * @param value 
   * @param callback 
   */
  static formValidate(rule, value, callback) {
    value.validate((valid) => {
      if (valid) {
        callback()
      } else {
        callback(new Error(rule.message || "输入项填写错误"));
      }
    })
  }
}
