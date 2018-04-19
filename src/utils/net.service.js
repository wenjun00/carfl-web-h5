import { Observable } from "rxjs";
import axios from 'axios';
import Qs from 'qs';
import app from '~/config/app.config';
import { StorageService } from '~/utils/storage.service';
// import cookie from 'js-cookie'
var getType = ['GET', 'DELETE']; // 使用GET请求类型
var NetService = /** @class */ (function () {
    function NetService() {
        this.axiosInstance = axios.create({
            baseURL: app.url.server,
            timeout: app.timeout,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if (app.mock) {
            var MockAdapter = require('axios-mock-adapter');
            var mock = new MockAdapter(this.axiosInstance, { delayResponse: 300 });
            this.createMock(mock);
        }
    }
    /**
     * 创建mock服务
     * @param mock
     */
    NetService.prototype.createMock = function (mock) {
        var mockServices = require('../../mock');
        Object.values(mockServices).forEach(function (mockItem) {
            Object.values(mockItem).forEach(function (items) {
                Object.values(items).forEach(function (_a) {
                    var server = _a.server, data = _a.data;
                    var url = NetService.generateRequestUrl(server);
                    mock.onAny(url).reply(200, data);
                });
            });
        });
    };
    NetService.generateRequestUrl = function (_a, append, sort) {
        var service = _a.service, controller = _a.controller, action = _a.action, url = _a.url;
        if (append === void 0) { append = []; }
        // 自定义url优先级最高
        if (url)
            return url;
        // 进行url拼接
        if (controller) {
            var targetUrl = [
                service,
                controller,
                action
            ].concat(append).filter(function (x) { return x; }).join('/');
            if (sort) {
                console.log(sort);
                targetUrl += '?';
                targetUrl += Object.entries(sort).map(function (_a) {
                    var k = _a[0], v = _a[1];
                    return "sort=" + k + "," + v;
                }).join('&');
            }
            return targetUrl;
        }
        else {
            throw new Error('server配置异常,请检查对应server配置');
        }
    };
    /**
     * 生成头部信息
     */
    NetService.prototype.generateRequestHeader = function (headers) {
        var token = StorageService.getItem('userToken') || '';
        if (token) {
            return Object.assign({
                'authorization': token
            }, headers);
        }
        else {
            return headers || {};
        }
    };
    /**
     * 过滤空数据
     * @param data
     */
    NetService.prototype.filterEmptyData = function (data) {
        Object.entries(data)
            .filter(function (_a) {
            var key = _a[0], value = _a[1];
            // 过滤空字符串
            if (value === undefined || value === "") {
                return true;
            }
            // 过滤空数组
            if (value instanceof Array && (value.length === 0 || value.every(function (x) { return x === ''; }))) {
                return true;
            }
        })
            .forEach(function (_a) {
            var key = _a[0], value = _a[1];
            delete data[key];
        });
        return data;
    };
    /**
     * 发送网络请求信息
     * @param param0
     */
    NetService.prototype.send = function (options) {
        var _this = this;
        var data = Object.assign({}, options.data);
        var postData;
        var getData;
        var url = NetService.generateRequestUrl(options.server, options.append, options.sort);
        var method = options.server.type || 'GET';
        var headers = this.generateRequestHeader(options.headers);
        if (options.page) {
            data = Object.assign(data, options.page.getConfig());
        }
        // 判断参数类型
        getType.indexOf(method) > -1 ? (getData = this.filterEmptyData(data)) : (postData = data);
        // 创建待观察对象
        var observable = Observable.create(function (observer) {
            _this.axiosInstance.request({
                method: method,
                url: url,
                headers: headers,
                data: postData,
                params: getData,
                paramsSerializer: function (params) {
                    return Qs.stringify(params, {
                        arrayFormat: 'repeat',
                        skipNulls: true,
                        allowDots: true
                    });
                }
            }).then(function (_a) {
                var data = _a.data;
                if (options.loading && options.loading.state) {
                    options.loading.state = false;
                }
                if (data.status === "SUCCESS") {
                    var object = data.object;
                    if (options.page && object.list) {
                        options.page.update(object);
                        object = object.list;
                    }
                    observer.next(object);
                }
                else {
                    observer.error({
                        msg: data.msg
                    });
                }
            }).catch(function (ex) {
                console.log(ex, 4545);
                // 错误信息
                var error = {
                    msg: "",
                    params: ""
                };
                if (options.loading && options.loading.state) {
                    options.loading.state = false;
                }
                // 逻辑异常检测
                if (!ex.response && !ex.request) {
                    error.msg = ex.message;
                    error.params = ex.stack;
                    console.error(ex.stack);
                    return Observable.empty();
                }
                // 通讯状态检测
                if (!ex.response) {
                    var error_1 = {
                        msg: "服务端连接异常，请检查服务端状态.",
                    };
                    console.error(error_1.msg);
                    observer.error(error_1);
                    return;
                }
                // 错误类型检测
                switch (ex.response.status) {
                    case 403:
                        {
                            //
                        }
                        break;
                }
            });
        });
        return observable;
    };
    return NetService;
}());
export { NetService };
