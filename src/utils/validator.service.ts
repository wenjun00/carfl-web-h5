import validator from 'async-validator'

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
        // 验证失败
        if (errors) {
          return reject({
            errors,
            fields
          });
        }
        // 验证成功
        reslove()
      });
    })
    return process
  }

  // 验证正则列表
  static regex = {
    // 手机号
    phoneNumber: /^1(3|4|5|7|8)\d{9}$/,
    // 身份证
    idCard: /(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)|(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)/
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
}
