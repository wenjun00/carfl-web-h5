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
          columnsName: '起亚智跑',
          color: 'red',
          price: '$999',
          amount: '1',
          carNumber: '陕AW1241'
        }, {
          columnsName: '本田思域',
          color: 'black',
          price: '$999',
          amount: '1',
          carNumber: '陕A289V1'
        }, {
          columnsName: '丰田卡罗拉',
          color: 'red',
          price: '$999',
          amount: '1',
          carNumber: '陕ARC341'
        }, {
          columnsName: '福特探险者',
          color: 'pink',
          price: '$999',
          amount: '1',
          carNumber: '陕C23757'
        }, {
          columnsName: '凯迪拉克SRX',
          color: 'red',
          price: '$999',
          amount: '1',
          carNumber: '陕A21241'
        }, {
          columnsName: '福特福克斯',
          color: 'red',
          price: '$999',
          amount: '1',
          carNumber: '陕A25441'
        }, {
          columnsName: '福特金牛座',
          color: 'red',
          price: '$999',
          amount: '1',
          carNumber: '陕A2LM41'
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
          color: '黑色',
          output: '1.8L',
          configuration: '高配',
          area: '上海',
          license: '上海',
          store: '群泰上海',
          isOutStore: '否',
          status: '入库初期'
        }, {
          brand: '大众',
          model: '辉腾',
          color: '黑色',
          output: '2.0T',
          configuration: '高配',
          area: '上海',
          license: '上海',
          store: '群泰上海',
          isOutStore: '否',
          status: '入库初期'
        }
      ]
    }
  }
}