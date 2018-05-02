<!--提前结清收款明细-->
<template>
  <section class="component gather-detail-early-pay">
    <i-card>

      <table border="1" width="100%" class="gather-type-table">
        <tr height="40">
          <td bgcolor="#F2F2F2" width="80">
            <span>操作</span>
          </td>
          <td bgcolor="#F2F2F2">
            <span>项目名称</span>
          </td>
          <td bgcolor="#F2F2F2">
            <span>金额</span>
          </td>
        </tr>
        <tr height="40" v-for="item in gatherItemList" :key="item.index">
          <td :width="40">
            <div @click="deleteGatherItem(item)" v-show="item.itemName!=='totalPayment'&&item.itemName!=='surplusPrincipal'&&item.itemName!=='surplusPenaltyFreeze'"
              style="cursor:pointer">
              <Icon type="trash-a" size="18"></Icon>
            </div>
          </td>
          <td width="60%">
            <span>{{item.itemLabel}}</span>
          </td>
          <td>
            <i-input-number v-if="item.itemName==='otherFee'" class="item-money" v-model="item.itemMoney" @on-change="changeOtherFee"
              :min="0" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"></i-input-number>
            <div v-else style="text-align:right;padding-right:40%">{{item.itemMoney | toThousands}}</div>
          </td>
        </tr>
      </table>
      <div>
        <Icon type="plus" class="add-icon"></Icon>
        <i-button type="text" class="add-button" @click="changeGatherItem">添加收款项</i-button>
      </div>
    </i-card>

    <!--<i-card title="账户信息">
      <bank-info :dataSet="accountInfo"></bank-info>
    </i-card>-->
    <div class="form-title">账户信息</div>
    <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
      <data-grid-item label="户名" :span="4">{{accountInfo.personalName}}</data-grid-item>
      <data-grid-item label="开户银行" :span="4">{{accountInfo.depositBank}}</data-grid-item>
      <data-grid-item label="银行卡号" :span="4">{{accountInfo.cardNumber}}</data-grid-item>
      <data-grid-item label="支行名称" :span="4">{{accountInfo.depositBranch}}</data-grid-item>
      <data-grid-item label="第三方客户号" :span="8">{{accountInfo.clientNumber}}</data-grid-item>
    </data-grid>
    <template>
      <i-modal v-model="addGatherItemModal" title="收款项目">
        <add-gather-item ref="add-gather-item" @change="changeItem" @close="addGatherItemModal=false"></add-gather-item>
        <div slot="footer">
          <i-button @click="addGatherItemModal=false">取消</i-button>
          <i-button class="blueButton" @click="confirmAddGatherItem">确定</i-button>
        </div>
      </i-modal>
    </template>

  </section>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {
    ApplyQueryService
  } from '~/services/business-service/apply-query.service'
  import {
    Dependencies
  } from '~/core/decorator'
  import SvgIcon from '~/components/common/svg-icon.vue'
  import DataBox from '~/components/common/data-box.vue'
  import {
    Prop
  } from 'vue-property-decorator'
  import ModifyGatherItem from '~/components/purchase-manage/modify-gather-item.vue'
  import AddGatherItem from '~/components/purchase-manage/add-gather-item.vue'
  import {
    DataGrid,
    DataGridItem
  } from "@zct1989/vue-component";

  @Component({
    components: {
      SvgIcon,
      DataBox,
      ModifyGatherItem,
      DataGrid,
      DataGridItem,
      AddGatherItem
    }
  })
  export default class GatherDetailEarlyPay extends Vue {
    @Prop() checkOrderId: Number
    @Prop() typeData: Boolean
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService
    private modifyGatherItemModal: Boolean = false
    private changeGatherItemModal: Boolean = false
    private addGatherItemModal: Boolean = false // 添加收款项
    private otherTotal: number = 0 // 除其他费用的合计
    private gatherItemList: Array < any > = []
    private gatherItemModel: any
    private otherFee: number = 0 // 输入框的其他费用
    private accountInfo: Array < any > = [] // 账户信息

    created() {
      this.gatherItemModel = {
        itemName: '',
        itemMoney: ''
      }
    }
    /**
     * 确定添加收款项
     */
    confirmAddGatherItem() {
      let _addGatherItem: any = this.$refs['add-gather-item']
      _addGatherItem.changeItem()
    }
    /**
     * 添加收款项change事件
     */
    changeItem(data, otherTotal) {
      this.otherTotal = otherTotal // 获取除其他费用的合计
      this.gatherItemList = data
      console.log(this.gatherItemList, '其他费')
      this.addGatherItemModal = false
    }
    modifyGatherItem() {
      this.modifyGatherItemModal = true
    }
    /**
     * 父组件传过来的列表数据
     */
    makeList(data) {
      if (data && data.payoffCollectMoneyItems) {
        this.gatherItemList = data.payoffCollectMoneyItems.filter(
          v => v.itemMoney
        )
        this.accountInfo
        if (data.personalBank) {
          this.accountInfo = data.personalBank
        } else {
          this.accountInfo = []
        }
      }
    }
    makeListdataSet(data) {
      if (data && data.advanceRevokeApplicationItems) {
        this.gatherItemList = data.advanceRevokeApplicationItems.filter(
          v => v.itemMoney
        )
        this.accountInfo
        if (data.personalBank) {
          this.accountInfo = data.personalBank
        } else {
          this.accountInfo = []
        }
      }
    }
    /**
     * 变更收款项
     */
    changeGatherItem() {
      if (this.typeData) {
        if (this.checkOrderId) {
          this.addGatherItemModal = true // 添加收款项
          let _addGatherItem: any = this.$refs['add-gather-item']
          _addGatherItem.getOrderSale(this.checkOrderId, this.gatherItemList)
        } else {
          this.$Message.info('请选择订单！')
        }
      } else {
        if (this.checkOrderId) {
          this.addGatherItemModal = true // 添加收款项
          let _addGatherItem: any = this.$refs['add-gather-item']
          _addGatherItem.getOrderSaleItem(this.checkOrderId, this.gatherItemList)
        } else {
          this.$Message.info('请选择订单！')
        }
      }
    }
    deleteGatherItem(item) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除吗？',
        onOk: () => {
          this.otherFee = 0 // 向父组件传的其他费用置空
          // 删除
          this.changeGatherItemModal = false
          this.gatherItemList = this.gatherItemList.filter(
            v => v.itemName !== item.itemName
          )
          // 重新计算合计
          console.log(this.gatherItemList, 'ddd')
          let oldTotalPayment = this.gatherItemList.find(
            v => v.itemName === 'totalPayment'
          ).itemMoney
          let deleteFee = item.itemMoney // 删除的金额
          this.gatherItemList.find(v => v.itemName === 'totalPayment').itemMoney =
            oldTotalPayment - deleteFee
        }
      })
    }
    resetTable() {
      this.gatherItemList = []
      this.accountInfo = []
    }
    /**
     * 修改其他费用重新计算合计
     */
    changeOtherFee(event) {
      console.log(this.gatherItemList, 'kkk')
      // 每次反显时获取不到this.otherTotal，当获取不到this.otherTotal时，通过gatherItemList获取合计保存在变量aaa中
      let aaa = this.gatherItemList
        .filter(v => v.itemName !== 'totalPayment' && v.itemName !== 'otherFee')
        .map(v => v.itemMoney)
        .reduce((x, y) => x + y)
      console.log(aaa, 'aaa')

      this.otherFee = parseFloat(event.target.value) // 获取输入框输入的其他费用
      if (this.otherFee) {
        this.gatherItemList.find(v => v.itemName === 'totalPayment').itemMoney =
          (this.otherTotal ? this.otherTotal : aaa) + this.otherFee
      } else {
        this.gatherItemList.find(
          v => v.itemName === 'totalPayment'
        ).itemMoney = this.otherTotal
      }
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
      console.log('otherFee', this.otherFee)
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
      .item-money {
        width: 10%;
      }
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

</style>
