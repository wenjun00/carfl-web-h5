<!--变更收款项-->
<template>
  <section class="component change-gather-item">
    <i-table :columns="columns1" :data="saleItemList" ref="table" @on-selection-change="currentSelect"></i-table>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import DataBox from "~/components/common/data-box.vue";
import { WithdrawApplicationService } from "~/services/manage-service/withdraw-application.service";
import { Dependencies } from "~/core/decorator";

@Component({
  components: {
    DataBox
  }
})
export default class ChangeGatherItem extends Vue {
  @Dependencies(WithdrawApplicationService)
  private withdrawApplicationService: WithdrawApplicationService;
  private columns1: any;
  private saleItemList: Array<any> = [];
  private multipleSelection; // 多选数据

  created() {
    this.columns1 = [
      {
        align: "center",
        type: "selection",
        width: 60
      },
      {
        align: "center",
        title: "收款项",
        key: "itemLabel"
      },
      {
        align: "center",
        title: "金额",
        key: "itemMoney"
      }
    ];
  }
  /**
   * 获取所有收款项
   * orderId:已选中的订单号
   * checkSaleItem:要反显的收款项
   */
  getOrderSaleItem(orderId, checkSaleItem) {
    this.withdrawApplicationService
      .getSaleCollectMoneyItems({
        orderId: orderId
      })
      .subscribe(
        data => {
          data.map(item => {
            checkSaleItem.map(val => {
              if (item.itemLabel === val.itemLabel) {
                item._checked = true;
              }
              if (item.itemName === "initialPayment") {
                item._disabled = true;
              }
            });
          });
          this.saleItemList = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  currentSelect(selection) {
    this.multipleSelection = selection;
  }
  changeItem() {
    if (this.multipleSelection) {
    //   let moneyList = this.multipleSelection.map(v => v.itemMoney);
      let sum:any=0
      this.multipleSelection.forEach(v=>{
          sum=sum+(Number(v.itemMoney)||0)
      })
      let totalPayment:any=sum
    //   let totalPayment = moneyList.reduce((x, y) => x + y); // 获取合计
      let total = {
        itemMoney: totalPayment,
        itemLabel: "合计（元）",
        itemName: "totalPayment"
      };
      if (
        !this.multipleSelection.map(v => v.itemName).includes("totalPayment")
      ) {
        this.multipleSelection.push(total);
      }
      this.$emit("change", this.multipleSelection);
    } else {
      this.$emit("close");
    }
  }
}
</script>
