var PageService = /** @class */ (function () {
    function PageService() {
        this.total = 0;
        this.pageIndex = 1;
        this.pageSize = 30;
        this.loading = false;
        this.pageSizeOpts = [10, 30, 50];
        this.layout = 'total, sizes, prev, pager, next, jumper';
    }
    /**
     * 获取分页配置信息
     */
    PageService.prototype.getConfig = function () {
        return {
            page: this.pageIndex,
            size: this.pageSize
        };
    };
    /**
     * 更新分页配置信息
     * @param param
     */
    PageService.prototype.update = function (_a) {
        var total = _a.total, pages = _a.pages;
        this.total = parseInt(total);
        this.totalPage = parseInt(pages);
    };
    /**
     * 重置分页数据
     */
    PageService.prototype.reset = function () {
        this.total = 0;
        this.pageIndex = 1;
        this.loading = false;
    };
    return PageService;
}());
export { PageService };
