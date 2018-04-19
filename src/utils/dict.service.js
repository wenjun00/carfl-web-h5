import store from '~/store';
var DictService = /** @class */ (function () {
    function DictService() {
    }
    /**
     * 获取字典数据
     * @param codes
     */
    DictService.getDictData = function () {
        var codes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            codes[_i] = arguments[_i];
        }
        var results = [];
        // 获取字典项
        codes.forEach(function (code) {
            var items = store.state.dictData
                .filter(function (x) { return x.typeCode === code; })
                .map(function (x) { return ({
                value: x.id,
                label: x.name
            }); });
            results.push.apply(results, items);
        });
        return results;
    };
    DictService.getDictName = function (value) {
        var data = store.state.dictData.find(function (x) { return value === x.id; });
        if (data) {
            return data.name;
        }
        else {
            return value;
        }
    };
    return DictService;
}());
export { DictService };
