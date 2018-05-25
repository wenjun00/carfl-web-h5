<!--提前结清收款明细-->
<template>
  <section class="component gather-detail-early-pay">
    <i-card>
      <table border="1" width="100%" class="gather-type-table">
        <tr height="40">
          <td bgcolor="#F2F2F2">
            <span>项目名称</span>
          </td>
          <td bgcolor="#F2F2F2">
            <span>金额</span>
          </td>
        </tr>
        <tr height="40" v-for="(item,index) in this.totalMoneyTwo.applicationCollectMoneyItems" :key="index">
          <td>{{item.itemLabel}}</td>
          <td>{{item.itemMoney}}</td>
        </tr>
        <tr height="40">
          <td>合计（元）</td>
          <td>{{this.totalMoneyTwo.totalPayment}}</td>
        </tr>
      </table>
    </i-card>
    <div class="form-title">账户信息</div>
    <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
      <data-grid-item label="户名" :span="4">{{!!totalMoneyTwo.personalBank?totalMoneyTwo.personalBank.personalName:''}}</data-grid-item>
      <data-grid-item label="开户银行" :span="4">{{!!totalMoneyTwo.personalBank?($dict.getDictName(Number(totalMoneyTwo.personalBank.depositBank))):''}}</data-grid-item>
      <data-grid-item label="银行卡号" :span="4">{{!!totalMoneyTwo.personalBank?totalMoneyTwo.personalBank.cardNumber:''}}</data-grid-item>
      <data-grid-item label="支行名称" :span="4">{{!!totalMoneyTwo.personalBank?totalMoneyTwo.personalBank.depositBranch:''}}</data-grid-item>
      <data-grid-item label="第三方客户号" :span="8">{{!!totalMoneyTwo.personalBank?totalMoneyTwo.personalBank.clientNumber:''}}</data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { ApplyQueryService } from '~/services/business-service/apply-query.service'
import { Dependencies } from '~/core/decorator'
import SvgIcon from '~/components/common/svg-icon.vue'
import DataBox from '~/components/common/data-box.vue'
import { Prop } from 'vue-property-decorator'
import BankInfo from "~/components/base-data/bank-info.vue"
import { DataGrid, DataGridItem } from "@zct1989/vue-component";

@Component({
  components: {
    SvgIcon,
    DataBox,
    DataGrid,
    DataGridItem,
    BankInfo
  }
})
export default class PayDetail extends Vue {
  // @Prop() checkOrderId: Number;
  @Prop() totalMoneyTwo;
  @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService
  private changeGatherItemModal: Boolean = false
  private otherTotal: number = 0 // 除其他费用的合计
  private gatherItemList: Array<any> = []
  private accountInfoList: any = {} // 账户信息
  private otherFee: number = 0 // 输入框的其他费用
  private checkOrderId: any = ''

  refresh(data) {
    this.checkOrderId = data.orderId
    if (data && data.itemList.length > 0) {
      this.gatherItemList = data.itemList
      let totalPayment: any = 0
      let sum: any = 0
      this.gatherItemList.forEach(v => {
        sum = sum + (Number(v.refundAmount) || 0)
      }) // 获取合计
      totalPayment = sum.toFixed()
      let total = {
        refundItem: '合计（元）',
        refundAmount: totalPayment,
        itemName: 'totalPayment'
      }
      if (!this.gatherItemList.map(v => v.itemName).includes('totalPayment')) {
        this.gatherItemList.push(total)
      }
    }
    this.accountInfoList = data.bankList
  }
  
  resetTable() {
    this.gatherItemList = []
  }
 
  /**
   * 获取列表数据
   */
  getItem() {
    return this.gatherItemList
  }
  /**
   * 向父组件返回其他费用
   */
  getOtherFee() {
    return this.otherFee
  }
}

</script>

<style lang="less" scoped>
.component.gather-detail-early-pay {
  .gather-type-table {
    margin-top: 10px;
    text-align: center;
    border: 1px solid #dddee1;
  }
  .add-icon {
    position: relative;
    left: 16px;
    top: 5px;
    color: #265ea2;
  }
  .add-button {
    margin-top: 10px;
    color: #265ea2;
  }
}
</style>
<style lang="less">
.component.gather-detail-early-pay {
  .choose-buy-materials {
    .ivu-select-selection {
      // width: 240%;
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }
  .calculate {
    .ivu-modal-footer {
      display: none !important;
    }
  }
}
</style>
