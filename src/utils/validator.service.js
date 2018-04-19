import validator from 'async-validator';
var ValidatorService = /** @class */ (function () {
    function ValidatorService() {
    }
    /**
     * 自定义验证器
     * @param data
     * @param descriptor
     * @param callback
     */
    ValidatorService.validate = function (data, descriptor) {
        var schema = new validator(descriptor);
        var process = new Promise(function (reslove, reject) {
            schema.validate(data, function (errors, fields) {
                // 验证失败
                if (errors) {
                    return reject({
                        errors: errors,
                        fields: fields
                    });
                }
                // 验证成功
                reslove();
            });
        });
        return process;
    };
    /**
     * 验证手机号
     */
    ValidatorService.phoneNumber = function (rule, value, callback) {
        if (ValidatorService.regex.phoneNumber.test(value) || !value) {
            callback();
        }
        else {
            callback(new Error("请输入正确的手机号"));
        }
    };
    /**
     * 验证身份证
     */
    ValidatorService.idCard = function (rule, value, callback) {
        if (ValidatorService.regex.idCard.test(value) || !value) {
            callback();
        }
        else {
            callback(new Error("请输入正确的身份证号码"));
        }
    };
    // 验证正则列表
    ValidatorService.regex = {
        // 手机号
        phoneNumber: /^1(3|4|5|7|8)\d{9}$/,
        // 身份证
        idCard: /(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)|(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)/
    };
    return ValidatorService;
}());
export { ValidatorService };
