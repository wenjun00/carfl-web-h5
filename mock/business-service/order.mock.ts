import { businessService } from '~/config/server'

export default {
  /**
   * 获取订单信息
   */
  getOrderConnect: {
    server: businessService.orderController.getOrderConnect,
    data: {
      val: [
        {
          orderId: '000001',
          orderOwner: '刘佳',
          orderDept: '前端开发',
          orderTransferPerson: '刘琛',
          orderCreateTime: '2016-10-03',
          customName: '王泽杰',
          IdCard: '610303199111142416',
          phone: '15091146267',
          prdName: '梅赛德斯',
          prdPeriods: '1期',
          stage: '出仓',
          approvalStatus: '待审批'
        }, {
          orderId: '000002',
          orderOwner: '刘佳',
          orderDept: '前端开发',
          orderTransferPerson: '刘琛',
          orderCreateTime: '2016-10-03',
          customName: '王泽杰',
          IdCard: '610303199111142416',
          phone: '15091146267',
          prdName: '梅赛德斯',
          prdPeriods: '1期',
          stage: '出仓',
          approvalStatus: '待审批'
        }, {
          orderId: '000003',
          orderOwner: '刘佳',
          orderDept: '前端开发',
          orderTransferPerson: '刘琛',
          orderCreateTime: '2016-10-03',
          customName: '王泽杰',
          IdCard: '610303199111142416',
          phone: '15091146267',
          prdName: '梅赛德斯',
          prdPeriods: '1期',
          stage: '出仓',
          approvalStatus: '待审批'
        }, {
          orderId: '000004',
          orderOwner: '刘佳',
          orderDept: '前端开发',
          orderTransferPerson: '刘琛',
          orderCreateTime: '2016-10-03',
          customName: '王泽杰',
          IdCard: '610303199111142416',
          phone: '15091146267',
          prdName: '梅赛德斯',
          prdPeriods: '1期',
          stage: '出仓',
          approvalStatus: '待审批'
        }, {
          orderId: '000005',
          orderOwner: '刘佳',
          orderDept: '前端开发',
          orderTransferPerson: '刘琛',
          orderCreateTime: '2016-10-03',
          customName: '王泽杰',
          IdCard: '610303199111142416',
          phone: '15091146267',
          prdName: '梅赛德斯',
          prdPeriods: '1期',
          stage: '出仓',
          approvalStatus: '待审批'
        }
      ]
    }
  },
  /**
   * 获取客户签约信息
   */
  getClientSign: {
    server: businessService.orderController.getClientSign,
    data: {
      val: [
        {
          orderId: '000001',
          orderCreateTime: '2016-10-03',
          orderType: '网订',
          prdName: 'BMW',
          customName: '驴拉狗',
          IdCard: '610303199111142416',
          phone: '15091146267',
          latelyCompactTime: '2017-11-01'
        }, {
          orderId: '000002',
          orderCreateTime: '2016-10-03',
          orderType: '网订',
          prdName: 'BMW',
          customName: '驴拉狗',
          IdCard: '610303199111142416',
          phone: '15091146267',
          latelyCompactTime: '2017-11-01'
        }, {
          orderId: '000003',
          orderCreateTime: '2016-10-03',
          orderType: '网订',
          prdName: 'BMW',
          customName: '驴拉狗',
          IdCard: '610303199111142416',
          phone: '15091146267',
          latelyCompactTime: '2017-11-01'
        }, {
          orderId: '000004',
          orderCreateTime: '2016-10-03',
          orderType: '网订',
          prdName: 'BMW',
          customName: '驴拉狗',
          IdCard: '610303199111142416',
          phone: '15091146267',
          latelyCompactTime: '2017-11-01'
        }, {
          orderId: '000005',
          orderCreateTime: '2016-10-03',
          orderType: '网订',
          prdName: 'BMW',
          customName: '驴拉狗',
          IdCard: '610303199111142416',
          phone: '15091146267',
          latelyCompactTime: '2017-11-01'
        }, {
          orderId: '000006',
          orderCreateTime: '2016-10-03',
          orderType: '网订',
          prdName: 'BMW',
          customName: '驴拉狗',
          IdCard: '610303199111142416',
          phone: '15091146267',
          latelyCompactTime: '2017-11-01'
        }
      ]
    }
  },
  getClientAccount: {
    server: businessService.orderController.getClientAccount,
    data: {
      val: [
        {
          customName: '王泽杰',
          IdCard: '610303199111141564',
          phone: '15091146267',
          isOpenAccount: '是',
          bindCardBank: '中国农业银行',
          bankCardId: '6227004171150136350',
          customId: '0056',
          prdName: '不明原因'
        }, {
          customName: '陈丽',
          IdCard: '610303199111141564',
          phone: '15091146267',
          isOpenAccount: '否',
          bindCardBank: '中国工商银行',
          bankCardId: '6227004171150136350',
          customId: '0016',
          prdName: '不明原因'
        }, {
          customName: '刘琛',
          IdCard: '610303199111141564',
          phone: '15091146267',
          isOpenAccount: '是',
          bindCardBank: '中国建设银行',
          bankCardId: '6227004171630133550',
          customId: '0026',
          prdName: '不明原因'
        }, {
          customName: '刘佳',
          IdCard: '610303199111141564',
          phone: '15091146267',
          isOpenAccount: '否',
          bindCardBank: '光大银行',
          bankCardId: '6227004171150136350',
          customId: '0046',
          prdName: '不明原因'
        }, {
          customName: '魏晓悦',
          IdCard: '610303199111141564',
          phone: '15091146267',
          isOpenAccount: '是',
          bindCardBank: '中国农业银行',
          bankCardId: '6227004171150136350',
          customId: '0056',
          prdName: '不明原因'
        }, {
          customName: '朱晨通',
          IdCard: '610303199111141564',
          phone: '15091146267',
          isOpenAccount: '否',
          bindCardBank: '中国农业银行',
          bankCardId: '6227004171150136350',
          customId: '0056',
          prdName: '不明原因'
        }
      ]
    }
  },
  getCheckCardReasonInfo: {
    server: businessService.orderController.getCheckCardReasonInfo,
    data: {
      val: [
        {
          bankName: '工行',
          checkCardFailReason: '请您到银行柜面，提供手机号进行柜面认证，将手机号设置为柜面预留。需开通e支付业务。',
          bankPhone: '95588'
        },
        {
          bankName: '农行',
          checkCardFailReason: '请您到银行柜面或者网银在“个人客户基本信息”中登记预留手机号。',
          bankPhone: '95599'
        },
        {
          bankName: '中行',
          checkCardFailReason: '请您到银行柜面、中银自助终端、网银开通银联无卡支付业务，并在个人客户基本资料中预留手机号码。',
          bankPhone: '95566'
        },
        {
          bankName: '建行',
          checkCardFailReason: '请您到银行柜面，在客户基本资料中留存的手机号，且用该手机号办理网银业务、手机银行业务。',
          bankPhone: '95533'
        },
        {
          bankName: '交行',
          checkCardFailReason: '注意：批量卡或2000/04/01之前开立的卡，需要先至银行柜台开通电子银行；儿童卡或联名账户借记卡，不支持。',
          bankPhone: ''
        },
        {
          bankName: '中信银行',
          checkCardFailReason: '请您到银行柜面或网银，签约开通短信通业务，并且预留手机号。',
          bankPhone: '95588'
        },
        {
          bankName: '光大',
          checkCardFailReason: '请您到银行柜面或网银开通了电子支付功能，并且预留手机号。',
          bankPhone: '95595'
        }
      ]
    }
  },
  getTreeDatabox: {
    server: businessService.orderController.getTreeDatabox,
    data: {
      val: [{
        workId: 'zzl00001',
        personalName: '习近平'
      }, {
        workId: 'zzl00002',
        personalName: '李克强'
      }, {
        workId: 'zzl00003',
        personalName: '温家宝'
      }, {
        workId: 'zzl00004',
        personalName: '刘琛'
      }, {
        workId: 'zzl00005',
        personalName: '刘佳'
      }, {
        workId: 'zzl00006',
        personalName: '王泽杰'
      }, {
        workId: 'zzl00007',
        personalName: '张三'
      }]
    }
  },
  getClientInfo: {
    server: businessService.orderController.getClientInfo,
    data: {
      val: [{
        uploadStatus: '已上传',
        orderId: '0001',
        orderCreateTime: '2017-11-25 15:36:46',
        orderType: '全款',
        prdName: '长租',
        customerName: '王泽杰',
        idCard: '610303199465485465',
        phone: '15094565485'
      },{
        uploadStatus: '已上传',
        orderId: '0002',
        orderCreateTime: '2017-11-25 15:36:46',
        orderType: '融资租赁',
        prdName: '长租',
        customerName: '张飞飞',
        idCard: '610303199465485465',
        phone: '15094565485'
      },{
        uploadStatus: '已上传',
        orderId: '0003',
        orderCreateTime: '2017-11-25 15:36:46',
        orderType: '全款',
        prdName: '长租',
        customerName: '张飞飞',
        idCard: '610303199465485465',
        phone: '15094565485'
      },{
        uploadStatus: '已上传',
        orderId: '0004',
        orderCreateTime: '2017-11-25 15:36:46',
        orderType: '融资租赁',
        prdName: '长租',
        customerName: '王泽杰',
        idCard: '610303199465485465',
        phone: '15094565485'
      },{
        uploadStatus: '已上传',
        orderId: '0005',
        orderCreateTime: '2017-11-25 15:36:46',
        orderType: '全款',
        prdName: '长租',
        customerName: '王泽杰',
        idCard: '610303199465485465',
        phone: '15094565485'
      },{
        uploadStatus: '已上传',
        orderId: '0006',
        orderCreateTime: '2017-11-25 15:36:46',
        orderType: '融资租赁',
        prdName: '长租',
        customerName: '张飞飞',
        idCard: '610303199465485465',
        phone: '15094565485'
      },{
        uploadStatus: '已上传',
        orderId: '0007',
        orderCreateTime: '2017-11-25 15:36:46',
        orderType: '全款',
        prdName: '长租',
        customerName: '王泽杰',
        idCard: '610303199465485465',
        phone: '15094565485'
      }]
    }
  },
  getContactsInfo:{
    server: businessService.orderController.getContactsInfo,
    data:{
      val:[{
        relation:'配偶',
        relationName:'李兵强',
        phone:'18898253654',
        firmName:'西安市长安区政府',
        address:'南窑头'
      },{
        relation:'子女',
        relationName:'刘陇刚',
        phone:'18898253654',
        firmName:'西安市长安区政府',
        address:'南窑头'
      },{
        relation:'父母',
        relationName:'李楠',
        phone:'18898253654',
        firmName:'西安市长安区政府',
        address:'东窑头'
      }]
    }    
  },
  getContactsRelationInfo:{
    server: businessService.orderController.getContactsRelationInfo,
    data:{
      val:[{
        relation:'朋友',
        relationName:'李兵强',
        phone:'18898253654',
        firmName:'西安市长安区政府',
        address:'南窑头'
      },{
        relation:'同事',
        relationName:'刘陇刚',
        phone:'18898253654',
        firmName:'西安市长安区政府',
        address:'南窑头'
      },{
        relation:'老师',
        relationName:'李楠',
        phone:'18898253654',
        firmName:'西安市长安区政府',
        address:'东窑头'
      }]
    }    
  },
  getRoleList:{
    server: businessService.orderController.getRoleList,
    data:{
      val:[{
        roleName:'采购专员',
        belongSystem:'进销存',
        operator:'胡艳敏',
        createTime:'2017-12-01 09:10:50',
        updateTime:'2017-12-06 09:10:50',
        desc:'管理进销存'
      },{
        roleName:'采购专员',
        belongSystem:'进销存',
        operator:'胡艳敏',
        createTime:'2017-12-01 09:10:50',
        updateTime:'2017-12-06 09:10:50',
        desc:'管理进销存'
      },{
        roleName:'采购专员',
        belongSystem:'进销存',
        operator:'胡艳敏',
        createTime:'2017-12-01 09:10:50',
        updateTime:'2017-12-06 09:10:50',
        desc:'管理进销存'
      },{
        roleName:'采购专员',
        belongSystem:'进销存',
        operator:'胡艳敏',
        createTime:'2017-12-01 09:10:50',
        updateTime:'2017-12-06 09:10:50',
        desc:'管理进销存'
      },{
        roleName:'采购专员',
        belongSystem:'进销存',
        operator:'胡艳敏',
        createTime:'2017-12-01 09:10:50',
        updateTime:'2017-12-06 09:10:50',
        desc:'管理进销存'
      },{
        roleName:'采购专员',
        belongSystem:'进销存',
        operator:'胡艳敏',
        createTime:'2017-12-01 09:10:50',
        updateTime:'2017-12-06 09:10:50',
        desc:'管理进销存'
      }]
    }
  }
}

