export default {
  // 启动状态
  ready: false,
  // 布局名称
  layout: 'default',
  // 字典数据
  dictData: '',
  // 用户token
  userToken: '',
  // 用户订单信息
  orderInfo:'',
  // 用户数据
  userData: '',
  // token是否过期
  tokenExpire: false,
  // 页面列表
  pageList: [{
    path: 'home',
    resoname: '主页'
  }],
  // 当前打开的页面
  currentPage: '',
  // 默认主题
  theme: 'theme-default',
  // 主题列表
  themeList: [{
    name: 'theme-default',
    color: '#265EA2'
  }, {
    name: 'theme-theme1',
    color: '#18879B'
  }],
  companyList: [],
  intoA:{}, // 进件
  IntoACity:'',// 进件城市
  promptlyMake:false ,// 立即预约
  getOrderId:'',   // 订单id
  carData:'',   // 车辆详情数据
  carBrand:{},
  carSeries:{},
  carProduct:{},
  carCity:{},
  carInformation:{},
  carSubmit:{}
}
