import { businessService } from '~/config/server'

export default {
  /**
   * 获取订单信息
   */
  getOrderQueryData: {
    server: businessService.applyQueryController.getFullQueryData,
    data: {
      val: [
        {
          columnsName: '订单编号',
          color: 'red',
          price: '$999',
          amount: '1',
          carNumber: '8823344'
        }, {
          columnsName: '订单所属人',
          color: 'black',
          price: '$999',
          amount: '1',
          carNumber: '8823344'
        }, {
          columnsName: '所属部门',
          color: 'red',
          price: '$999',
          amount: '1',
          carNumber: '8823344'
        }, {
          columnsName: '转交人',
          color: 'pink',
          price: '$999',
          amount: '1',
          carNumber: '8823344'
        }, {
          columnsName: '订单创建时间',
          color: 'red',
          price: '$999',
          amount: '1',
          carNumber: '8823344'
        }, {
          columnsName: '客户姓名',
          color: 'red',
          price: '$999',
          amount: '1',
          carNumber: '8823344'
        }, {
          columnsName: '证件号码',
          color: 'red',
          price: '$999',
          amount: '1',
          carNumber: '8823344'
        }
      ]
    }
  },
  addCarQueryData: {
    server: businessService.applyQueryController.addCarQueryData,
    data: {
      val: [
        {
          brand: '大众',
          model: '帕萨特',
          color: 'red',
          output: '5',
          configuration: '88',
          area: '上海',
          license: '上海',
          store: 'xxxx',
          status: '入库初期'
        }, {
          brand: '大众',
          model: '帕萨特',
          color: 'red',
          output: '5',
          configuration: 777777,
          area: '上海',
          license: '上海',
          store: 'xxxx',
          status: '入库初期'
        }
      ]
    }
  }
}