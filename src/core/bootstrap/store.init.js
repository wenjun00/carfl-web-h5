var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var creatDataDictService = function () { return import('~/services/manage-service/data-dict.service'); };
var createLoginService = function () { return import('~/services/manage-service/login.service'); };
export default function (_a) {
    var store = _a.store, router = _a.router;
    return __awaiter(this, void 0, void 0, function () {
        /**
         * 检测用户数据
         */
        function updateUserData() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (reslove, reject) {
                            // 登录页面不更新用户数据
                            if (!store.state.userToken && window.location.pathname == "/") {
                                reslove();
                                return;
                            }
                            // 不存在token不更新用户数据
                            if (!store.state.userToken && window.location.pathname != "/") {
                                store.commit("updateTokenExpire", true);
                                reject();
                                return;
                            }
                            // 更新用户数据
                            loginService.getUserByToken().subscribe(function (data) {
                                // 更新用户控件资源
                                store.dispatch('updateUserLoginData', data);
                                reslove();
                            }, function () {
                                // 用户数据获取异常
                                store.commit("updateTokenExpire", true);
                                reject();
                            });
                        })];
                });
            });
        }
        /**
         * 检查数据字典
         * @param reslove
         */
        function updateDictData() {
            return new Promise(function (reslove, reject) {
                dataDictService.getAll().subscribe(function (data) {
                    store.commit('updateDictData', data);
                    reslove();
                }, function () {
                    reject();
                });
            });
        }
        /**
         * 全局业务数据
         */
        function updateBusinessData() {
            var _this = this;
            return new Promise(function (reslove, reject) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!store.state.userData || !store.state.userToken) {
                        reslove();
                        return [2 /*return*/];
                    }
                    // 全局业务数据 - 与用户无关
                    reslove();
                    return [2 /*return*/];
                });
            }); });
        }
        var DataDictService, LoginService, dataDictService, loginService, flag;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, creatDataDictService()];
                case 1:
                    DataDictService = (_b.sent()).DataDictService;
                    return [4 /*yield*/, createLoginService()];
                case 2:
                    LoginService = (_b.sent()).LoginService;
                    dataDictService = new DataDictService();
                    loginService = new LoginService();
                    return [4 /*yield*/, Promise.all([
                            updateDictData(),
                            updateUserData()
                        ]).then(function () {
                            return true;
                        }).catch(function (ex) {
                            // 基础数据初始化失败
                            return false;
                        })
                        // 初始化业务数据
                    ];
                case 3:
                    flag = _b.sent();
                    if (!flag) return [3 /*break*/, 5];
                    return [4 /*yield*/, updateBusinessData()];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    store.commit('ready', true);
                    return [2 /*return*/];
            }
        });
    });
}
