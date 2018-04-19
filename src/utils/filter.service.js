import store from '~/store';
import * as enumData from '~/config/enum.config';
var FilterService = /** @class */ (function () {
    function FilterService() {
    }
    /**
     * 转换枚举数据
     * @param value
     * @param key
     */
    FilterService.enumConvert = function (value, key) {
        // 排除空字典或者空key
        if (!enumData || !key || !enumData[key]) {
            return '';
        }
        var data = enumData[key] instanceof Array ? enumData[key] : Object.values(enumData[key]);
        var target = data.find(function (x) { return x.value === value; });
        return target ? target.name : "";
    };
    /**
     * 转换字典数据
     * @param id
     */
    FilterService.dictConvert = function (id) {
        var dictData = store.state.dictData;
        var target;
        if (dictData) {
            target = dictData.find(function (x) { return x.id === id; });
        }
        return target ? target.name : "";
    };
    /**
     * 日期范围转换
     * @param dateRange
     * @param fmt
     */
    FilterService.dateRanageFormat = function (dateRange, fmt) {
        if (fmt === void 0) { fmt = "yyyy-MM-dd hh:mm:ss"; }
        var target = {
            start: '',
            end: ''
        };
        // 检测非法输入
        if (!dateRange || dateRange.length === 0 || !(dateRange instanceof Array)) {
            return target;
        }
        target.start = FilterService.dateFormat(dateRange[0], fmt);
        target.end = FilterService.dateFormat(dateRange[1], fmt);
        return target;
    };
    /**
     * 日期格式化
     * @param date
     * @param fmt
     */
    FilterService.dateFormat = function (date, fmt) {
        if (fmt === void 0) { fmt = "yyyy-MM-dd hh:mm:ss"; }
        // 空数据处理
        if (date === null || date === undefined || date === '') {
            return '';
        }
        // 如果是时间戳则转化为时间
        if (typeof date === 'number') {
            date = new Date(date);
        }
        var o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
        return fmt;
    };
    /**
     * 千分位转换
     * @param number
     */
    FilterService.toThousands = function (number) {
        var num = '';
        if (number === null || number === '') {
            num = number;
        }
        else {
            num = Number(number).toFixed(2);
            if (isNaN(num) || num === '' || num === undefined || num === null) {
                return '';
            }
            num = num + '';
            if (/^.*\..*$/.test(num)) {
                var pointIndex = num.lastIndexOf('.');
                var intPart = num.substring(0, pointIndex);
                var pointPart = num.substring(pointIndex + 1, num.length);
                intPart = intPart + '';
                var re = /(-?\d+)(\d{3})/;
                while (re.test(intPart)) {
                    intPart = intPart.replace(re, '$1,$2');
                }
                num = intPart + '.' + pointPart;
            }
            else {
                num = num + '';
                var re = /(-?\d+)(\d{3})/;
                while (re.test(num)) {
                    num = num.replace(re, '$1,$2');
                }
            }
        }
        return num;
    };
    /**
     * 手机号脱敏显示转换器
     */
    FilterService.encryptPhone = function (value) {
        if (!value || value === '') {
            return '';
        }
        return value.substr(0, 3) + '****' + value.substr(7);
    };
    /**
     * 身份证脱敏显示转换器(后四位脱敏)
     */
    FilterService.encryptIDCardFour = function (value) {
        if (!value || value === '') {
            return '';
        }
        // return value.substr(0, 3).padEnd(value.length - 4, '*') + value.substr(-4)
        return value.substr(0, 14) + '****';
    };
    return FilterService;
}());
export { FilterService };
