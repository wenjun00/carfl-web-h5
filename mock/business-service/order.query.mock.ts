import { businessService } from '~/config/server'

export default {
  /**
   * 获取订单信息
   */
  getOrderQueryData: {
    server: businessService.orderQueryController.getOrderQueryData,
    data: {
      val: [
        {
          orderId: '000001',
          orderDept: '前端开发',
          prdInterest: '0.9',
          orderCreateTime: '2016-10-03',
          customName: '王泽杰',
          IdCard: '610303199111142416',
          prdName: '梅赛德斯',
          prdPeriods: '1期',
          orderStatus: '拒绝',
          prdPeriod: '24',
          link: '面审',
          orderType: '借贷',
          totalFinancing: '13748',
          repaymentMethod: '等额本息'
        }, {
          orderId: '000002',
          orderDept: '前端开发',
          prdInterest: '0.8',
          orderType: '融资',
          orderCreateTime: '2016-10-03',
          customName: '王泽杰',
          IdCard: '610303199111142416',
          prdName: '梅赛德斯',
          prdPeriods: '1期',
          orderStatus: '面审',
          prdPeriod: '24',
          link: '待命',
          totalFinancing: '13748',
          repaymentMethod: '等额本息'
        }, {
          orderId: '000003',
          orderDept: '前端开发',
          prdInterest: '0.7',
          orderType: '融资',
          orderCreateTime: '2016-10-03',
          customName: '王泽杰',
          IdCard: '610303199111142416',
          prdName: '梅赛德斯',
          prdPeriods: '1期',
          orderStatus: '面审',
          prdPeriod: '24',
          link: '待审批',
          totalFinancing: '13748',
          repaymentMethod: '等额本息'
        }, {
          orderId: '000004',
          orderDept: '前端开发',
          orderType: '全额',
          prdInterest: '0.6',
          orderCreateTime: '2016-10-03',
          customName: '王泽杰',
          IdCard: '610303199111142416',
          prdName: '梅赛德斯',
          prdPeriods: '1期',
          orderStatus: '面审',
          prdPeriod: '24',
          link: '待审批',
          totalFinancing: '13748',
          repaymentMethod: '等额本息'
        }
      ]
    }
  },
  /**
   * 获取订单进度
   */
  getOrderProgress: {
    server: businessService.orderQueryController.getOrderProgress,
    data: {
      val: [
        {
          processingTime: '2016-10-03 13:56:56',
          operator: '韩冰',
          link: '面审',
          statusDescription: '拒绝',
          noteDescription: ''
        }, {
          processingTime: '2016-10-03 14:02:11',
          operator: '吴刚',
          link: '复审',
          statusDescription: '待复审',
          noteDescription: ''
        }
      ]
    }
  },
  /**
   * 产品包查询
   */
  getProductQuery: {
    server: businessService.orderQueryController.getProductQuery,
    data: {
      val: [
        {
          uploadTime: '2016-10-03',
          remark: '无',
          customName: '王泽杰',
          fileName: '20171003报价.jpg',
        }, {
          uploadTime: '2016-07-01',
          remark: '无',
          customName: '张三疯',
          fileName: '20170701报价.jpg',
        }, {
          uploadTime: '2016-10-03',
          remark: '无',
          customName: '李良琛',
          fileName: '20171003报价.jpg',
        }
      ]
    }
  }
}