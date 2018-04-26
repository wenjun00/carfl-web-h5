<!--收款明细-->
<template>
  <section class="component gather-detail">
    <i-table :height="400" :columns="columns1" :data="saleItemList" stripe></i-table>
    <!--<div>-->
      <!--<i-button type="text" class="item-shoukuan-button" @click="changeGatherItem">变更收款项</i-button>-->
    <!--</div>-->
    <div class="form-title">账户信息</div>
    <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
      <data-grid-item label="户名" :span="4">{{accountInfo.personalName}}</data-grid-item>
      <data-grid-item label="开户银行" :span="4">{{accountInfo.depositBank}}</data-grid-item>
      <data-grid-item label="银行卡号" :span="4">{{accountInfo.cardNumber}}</data-grid-item>
      <data-grid-item label="支行名称" :span="4">{{accountInfo.depositBranch}}</data-grid-item>
      <data-grid-item label="第三方客户号" :span="8">{{accountInfo.clientNumber}}</data-grid-item>
    </data-grid>

    <!--变更收款项-->
    <!--<template>-->
      <!--<i-modal v-model="changeGatherItemModal" title="变更收款项">-->
        <!--<change-gather-item ref="change-item" @change="changeSaleItem" @close="changeGatherItemModal=false"></change-gather-item>-->
        <!--<div slot="footer">-->
          <!--<i-button @click="changeGatherItemModal=false">取消</i-button>-->
          <!--<i-button @click="confirmChangeItem" class="blueButton">确定</i-button>-->
        <!--</div>-->
      <!--</i-modal>-->
    <!--</template>-->
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ApplyQueryService } from "~/services/business-service/apply-query.service";
import { Dependencies } from "~/core/decorator";
import SvgIcon from "~/components/common/svg-icon.vue";
import DataBox from "~/components/common/data-box.vue";
import { Prop } from "vue-property-decorator";
import ModifyGatherItem from "~/components/purchase-manage/modify-gather-item.vue";
import ChangeGatherItem from "~/components/purchase-manage/change-gather-item.vue";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
@Component({
  components: {
    SvgIcon,
    DataBox,
    ModifyGatherItem,
    ChangeGatherItem,
    DataGrid,
    DataGridItem
  }
})
export default class GatherDetail extends Vue {
  @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
  @Prop() checkOrderId: Number;
  @Prop() orderFodderInfo: any;
  private columns1: any;
  private saleItemList: Array<Object> = [];
  private changeGatherItemModal: Boolean = false;
  private accountInfo: any = {}; // 账户信息
  created() {
    this.columns1 = [
      {
        key: "itemLabel",
        title: "项目名称",
        align: "center",
        minWidth: 200
      },
      {
        key: "itemMoney",
        title: "金额",
        align: "center",
        minWidth: 200,
        render: (h, { row }) => {
          return h(
            "div",
            {
              style: {
                width: "100%",
                textAlign: "right",
                paddingRight: "48%"
              }
            },
            [h("p", this.$filter.toThousands(row.itemMoney))]
          );
        }
      }
    ];
  }
  /**
   * 变更收款项
   */
  changeGatherItem() {
    if (this.checkOrderId) {
      this.changeGatherItemModal = true;
      let _changeItemModal: any = this.$refs["change-item"];
      _changeItemModal.getOrderSaleItem(this.checkOrderId, this.saleItemList);
    } else {
      this.$Message.info("请选择订单！");
    }
  }
  /**
   * 确定变更收款项
   */
  confirmChangeItem() {
    let _changeItem: any = this.$refs["change-item"];
    _changeItem.changeItem();
  }
  makeList(val) {
    if (val.applicationCollectMoneyItems) {
      this.saleItemList = val.applicationCollectMoneyItems
    } else {
      this.saleItemList = [];
    }
    if (val.personalBank) {
      this.accountInfo = val.personalBank;
    } else {
      this.accountInfo = {};
    }
  }
  changeSaleItem(val) {
    this.saleItemList = val;
    this.changeGatherItemModal = false;
  }
  getItem() {
    return this.saleItemList;
  }
  /**
   * 重置表格
   */
  resetTable() {
    this.saleItemList = [];
    this.accountInfo.personalName = "";
    this.accountInfo.depositBank = "";
    this.accountInfo.cardNumber = "";
    this.accountInfo.depositBranch = "";
    this.accountInfo.clientNumber = "";
  }
}
</script>

<style lang="less" scoped>
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
.item-shoukuan-icon {
  position: relative;
  left: 16px;
  top: 5px;
  color: #265ea2;
}
.item-shoukuan-button {
  margin-top: 10px;
  color: #265ea2;
}
.item-shoukuan-table {
  margin-top: 10px;
  text-align: center;
  border: 1px solid #dddee1;
  margin-bottom: 60px;
}
</style>
