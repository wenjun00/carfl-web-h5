<!--提前结清收款明细-->
<template>
  <section class="component gather-detail-early-pay">
    <table border="1" width="1100" class="gather_type_table" style="margin-top:10px;text-align:center;border:1px solid #DDDEE1">
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
        <td width="40">
          <div @click="deleteGatherItem(item)" v-show="item.itemName!=='totalPayment'&&item.refundItem!==1157" style="cursor:pointer">
            <Icon type="trash-a" size="18"></Icon>
          </div>
        </td>
        <td>
          <span>{{item.refundItem}}</span>
        </td>
        <td>
          <i-input v-if="item.refundItem===1159" style="width:10%" :value="item.refundAmount" @on-change="changeOtherFee" :maxlength="7"></i-input>
          <span v-else>{{item.refundAmount}}</span>
        </td>
        <!--<tr height="40">
          <td></td>
          <td width="25%">合计（元）</td>
          <td colspan="2" style="font-weight:700;font-size:14px">{{}}</td>
        </tr>-->
      </tr>
    </table>
    <div>
      <Icon type="plus" style="position:relative;left:16px;top:5px;color:#265ea2"></Icon>
      <i-button type="text" style="margin-top:10px;color:#265ea2" @click="changeGatherItem">添加收款项</i-button>
    </div>
    <div class="form-title">账户信息</div>
    <table border="1" width="1100" class="gather_type_table" style="margin-top:10px;text-align:center;border:1px solid #DDDEE1;margin-bottom:60px;">
      <tr height="40">
        <td bgcolor="#F2F2F2">户名</td>
        <td bgcolor="#F2F2F2">开户银行</td>
        <td bgcolor="#F2F2F2">银行卡号</td>
        <td bgcolor="#F2F2F2">支行名称</td>
        <td bgcolor="#F2F2F2">第三方客户号</td>
      </tr>
      <tr height="40" v-for="accountInfo in accountInfoList" :key="accountInfo.index">
        <td>{{accountInfo.personalName}}</td>
        <td>{{accountInfo.depositBank}}</td>
        <td>{{accountInfo.cardNumber}}</td>
        <td>{{accountInfo.depositBranch}}</td>
        <td>{{accountInfo.clientNumber}}</td>
      </tr>
    </table>
    <template>
      <i-modal v-model="addGatherItemModal" title="收款项目">
        <add-gather-item ref="add-gather-item" @change="changeItemdata"></add-gather-item>
        <div slot="footer">
          <i-button @click="addGatherItemModal=false">取消</i-button>
          <i-button class="blueButton" @click="confirmAddGatherItem">确定</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    ApplyQueryService
  } from "~/services/business-service/apply-query.service";
  import {
    Dependencies
  } from "~/core/decorator";
  import SvgIcon from "~/components/common/svg-icon.vue";
  import DataBox from "~/components/common/data-box.vue";
  import {
    Prop
  } from "vue-property-decorator";
  import ModifyGatherItem from "~/components/purchase-manage/modify-gather-item.vue";
  import AddGatherItem from "~/components/purchase-manage/add-gather-item.vue";

  @Component({
    components: {
      SvgIcon,
      DataBox,
      ModifyGatherItem,
      AddGatherItem
    }
  })
  export default class PayDetail extends Vue {
    // @Prop() checkOrderId: Number;
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    private modifyGatherItemModal: Boolean = false;
    private changeGatherItemModal: Boolean = false;
    private addGatherItemModal: Boolean = false; // 添加收款项
    private otherTotal: number = 0; // 除其他费用的合计
    private gatherItemList: Array < any > = [];
    private gatherItemModel: any;
    private accountInfoList: any = {}; // 账户信息
    private otherFee: number = 0; // 输入框的其他费用
    private checkOrderId: any = '';
    created() {
      this.gatherItemModel = {
        itemName: "",
        refundAmount: ""
      };
    }
    /**
     * 确定添加收款项
     */
    confirmAddGatherItem() {
      let _addGatherItem: any = this.$refs["add-gather-item"];
      _addGatherItem.changeItem();
    }
    /**
     * 添加收款项change事件
     */
    changeItemdata(data, otherTotal) {
      this.otherTotal = otherTotal; // 获取除其他费用的合计
      //   data.refundItem = data.itemLabel;
      //   data.refundAmount = data.itemMoney;
      data.map(v => {
        v.refundItem = v.itemLabel;
        v.refundAmount = v.itemMoney
      })
      this.gatherItemList = data;
      this.addGatherItemModal = false;
    }
    modifyGatherItem() {
      this.modifyGatherItemModal = true;
    }
    refresh(data) {
      this.checkOrderId = data.orderId
      if (data && data.itemList.length > 0) {
        this.gatherItemList = data.itemList
      }
      if (data && data.bankList.length > 0)
        console.log(data.bankList, 'bankList')
      this.accountInfoList = data.bankList
    }
    /**
     * 变更收款项
     */
    changeGatherItem() {
      if (this.checkOrderId) {
        this.addGatherItemModal = true; // 添加收款项
        let _addGatherItem: any = this.$refs["add-gather-item"];
        _addGatherItem.getOrderSaleItemData(this.checkOrderId, this.gatherItemList);
      } else {
        this.$Message.info("请选择订单！");
      }
    }
    deleteGatherItem(item) {
      console.log(item, 'item')
      this.$Modal.confirm({
        title: "提示",
        content: "确定删除吗？",
        onOk: () => {
          // 删除
          this.changeGatherItemModal = false;
          console.log(this.gatherItemList, 'gatherItemList')
          this.gatherItemList = this.gatherItemList.filter(
            v => v.refundItem !== item.refundItem
          );
          // 重新计算合计
          console.log(this.gatherItemList, "ddd");
          let oldTotalPayment = this.gatherItemList.find(
            v => v.itemName === "totalPayment"
          ).refundAmount;
          let deleteFee = item.refundAmount; // 删除的金额
          this.gatherItemList.find(v => v.itemName === "totalPayment").refundAmount =
            oldTotalPayment - deleteFee;
        }
      });
    }
    resetTable() {
      this.gatherItemList = [];
      //   this.accountInfo.personalName = "";
      //   this.accountInfo.depositBank = "";
      //   this.accountInfo.cardNumber = "";
      //   this.accountInfo.depositBranch = "";
      //   this.accountInfo.clientNumber = "";
      this.accountInfoList = [];
    }
    /**
     * 修改其他费用重新计算合计
     */
    changeOtherFee(event) {
      this.otherFee = parseFloat(event.target.value); // 获取输入框输入的其他费用
      if (this.otherFee) {
        this.gatherItemList.find(v => v.itemName === "totalPayment").refundAmount =
          this.otherTotal + this.otherFee;
      } else {
        this.gatherItemList.find(
          v => v.itemName === "totalPayment"
        ).refundAmount = this.otherTotal;
      }
    }
    /**
     * 获取列表数据
     */
    getItem() {
      return this.gatherItemList;
    }
    /**
     * 向父组件返回其他费用
     */
    getOtherFee() {
      return this.otherFee;
    }
  }

</script>

<style lang="less" scope>
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
