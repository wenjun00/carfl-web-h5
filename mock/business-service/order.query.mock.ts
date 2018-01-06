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
          orderStatus: '面审',
          prdPeriod: '24',
          link: '待审批',
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
          processingTime: '2016-10-03',
          operator: '前端开发',
          link: '死亡',
          statusDescription: '0已删除（删除）',
          noteDescription: ''        
        }, {
          processingTime: '2016-10-03',
          operator: '前端开发',
          link: '死亡',
          statusDescription: '1.1面审拒绝  1.2复审拒绝  1.3终审拒绝  1.4合规拒绝',
          noteDescription: '进件材料不足'     
        }, {
          processingTime: '2016-10-03',
          operator: '前端开发',
          link: '待命',
          statusDescription: '2.1面审退回  2.2复审退回  2.3终审退回  2.4合规退回',
          noteDescription: '评分低，有风险'     
        }, {
          processingTime: '2016-10-03',
          operator: '前端开发',
          link: '待命',
          statusDescription: '3待提交（已保存）',
          noteDescription: ''     
        }, {
          processingTime: '2016-10-03',
          operator: '前端开发',
          link: '审批中',
          statusDescription: '4待领取（已提交）',
          noteDescription: ''     
        }, {
          processingTime: '2016-10-03',
          operator: '前端开发',
          link: '审批中',
          statusDescription: '4.1待面审（已领取）',
          noteDescription: ''     
        }, {
          processingTime: '2016-10-03',
          operator: '前端开发',
          link: '审批中',
          statusDescription: '4.2待复审（面审通过）',
          noteDescription: ''     
        }, {
          processingTime: '2016-10-03',
          operator: '前端开发',
          link: '审批中',
          statusDescription: '4.3待终审（复审通过）',
          noteDescription: ''     
        }, {
          processingTime: '2016-10-03',
          operator: '前端开发',
          link: '审批中',
          statusDescription: '4.4待合规（终审通过）',
          noteDescription: '首付比例：15%'     
        }, {
          processingTime: '2016-10-03',
          operator: '前端开发',
          link: '开户',
          statusDescription: '4.5待开户（合规通过）',
          noteDescription: ''     
        }, {
          processingTime: '2016-10-03',
          operator: '前端开发',
          link: '签约',
          statusDescription: '5待签约（已开户）',
          noteDescription: ''     
        }, {
          processingTime: '2016-10-03',
          operator: '前端开发',
          link: '财务',
          statusDescription: '6待付款（已签约）',
          noteDescription: ''     
        }, {
          processingTime: '2016-10-03',
          operator: '前端开发',
          link: '车务',
          statusDescription: '7待出库 (首付已付)',
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
          fileName: '20170901报价.jpg',       
        }
      ]
    }
  }
}