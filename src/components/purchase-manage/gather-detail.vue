<!--收款明细-->
<template>
  <section class="component gather-detail">
    <i-table :columns="columns1" :data="saleItemList" width="1100" stripe></i-table>
    <div>
      <Icon type="plus" style="position:relative;left:16px;top:5px;color:#265ea2"></Icon>
      <i-button type="text" style="margin-top:10px;color:#265ea2" @click="changeGatherItem">变更收款项</i-button>
    </div>
    <div class="form-title">账户信息</div>
    <!-- <i-table :columns="columns3" :data="data3" width="1100"></i-table> -->
    <!-- <data-grid style="width:1100px;margin-bottom:20px;" :labelWidth="90">
      <data-grid-item label="户名" :span="2">
        <template>
          <div>{{accountInfo.personalName}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="开户银行" :span="2">
        <template>
          <div>{{accountInfo.depositBank}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="银行卡号" :span="3">
        <template>
          <div>{{accountInfo.cardNumber}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="支行名称" :span="3">
        <template>
          <div>{{accountInfo.depositBranch}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="第三方客户号" :span="2">
        <template>
          <div>{{accountInfo.clientNumber}}</div>
        </template>
      </data-grid-item>
    </data-grid> -->
    <table border="1" width="1100" class="gather_type_table" style="margin-top:10px;text-align:center;border:1px solid #DDDEE1">
      <tr height="40">
        <td bgcolor="#F2F2F2">户名</td>
        <td bgcolor="#F2F2F2">开户银行</td>
        <td bgcolor="#F2F2F2">银行卡号</td>
        <td bgcolor="#F2F2F2">支行名称</td>
        <td bgcolor="#F2F2F2">第三方客户号</td>
      </tr>
      <tr height="40">
        <td>{{accountInfo.personalName}}</td>
        <td>{{accountInfo.depositBank}}</td>
        <td>{{accountInfo.cardNumber}}</td>
        <td>{{accountInfo.depositBranch}}</td>
        <td>{{accountInfo.clientNumber}}</td>
      </tr>
    </table>
    <!--编辑收款项-->
    <!-- <template>
      <i-modal v-model="modifyGatherItemModal" title="编辑收款项" width="300">
        <modify-gather-item></modify-gather-item>
      </i-modal>
    </template> -->

    <!--变更收款项-->
    <template>
      <i-modal v-model="changeGatherItemModal" title="变更收款项">
        <change-gather-item ref="change-item" @change="changeSaleItem"></change-gather-item>
        <div slot="footer">
          <i-button @click="changeGatherItemModal=false">取消</i-button>
          <i-button @click="confirmChangeItem" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>
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
import { DataGrid, DataGridItem } from "vue-fintech-component";
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
  private columns3: any;
  private data3: Array<Object> = [];
  // private modifyGatherItemModal: Boolean = false;
  private changeGatherItemModal: Boolean = false;
  private accountInfo: any = {}; // 账户信息
  created() {
    this.columns1 = [
      {
        key: "itemLabel",
        title: "项目名称",
        align: "center"
      },
      {
        key: "itemMoney",
        title: "金额",
        align: "center"
      }
    ];

    this.columns3 = [
      {
        key: "accountName",
        align: "center",
        title: "户名"
      },
      {
        key: "openAccountBank",
        align: "center",
        title: "开户银行"
      },
      {
        key: "bankCardId",
        align: "center",
        title: "银行卡号"
      },
      {
        key: "branchBankName",
        align: "center",
        title: "支行名称"
      },
      {
        key: "thirdCustomId",
        align: "center",
        title: "第三方客户号"
      }
    ];

    this.data3 = [
      {
        accountName: "李兵强",
        openAccountBank: "中国建设银行",
        bankCardId: "6227004171150315789",
        branchBankName: "丈八六路支行",
        thirdCustomId: "3456878774154"
      }
    ];
  }
  // modifyGatherItem() {
  //   this.modifyGatherItemModal = true;
  // }
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
      this.saleItemList = val.applicationCollectMoneyItems.filter(
        v => v.itemMoney
      );
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
    // console.log(val, "kjg");
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
