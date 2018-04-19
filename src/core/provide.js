var NetService = function () { return require('~/utils/net.service'); };
var PageService = function () { return require('~/utils/page.service'); };
var SortService = function () { return require('~/utils/sort.service'); };
// const DataDictSerivce = () => require('~/services/business-service/data-dict.service')
// const ResourceSerivce = () => require('~/services/business-service/resource.service')
// const LoginSerivce = () => require('~/services/business-service/login.service')
export default function () {
    return {
        'netService': [NetService, 'none'],
        'pageService': [PageService, 'none'],
        'sortService': [SortService, 'none'],
    };
}
