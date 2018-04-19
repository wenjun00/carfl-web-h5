/**
 * 公共服务类
 */
var CommonService = /** @class */ (function () {
    function CommonService() {
    }
    /**
     * 获取组件名称
     * @param path
     */
    CommonService.getComponentName = function (page) {
        var path = page.path;
        var pathArray = path.split('/');
        return ("-" + pathArray[pathArray.length - 1]).replace(/\-(\w)/g, function ($0, $1) { return $1.toUpperCase(); });
    };
    /**
     * 下载文件
     */
    CommonService.downloadFile = function (url, filename) {
        var a = document.createElement('a');
        a.href = url;
        a.download = filename || (+new Date());
        a.click();
    };
    return CommonService;
}());
export { CommonService };
