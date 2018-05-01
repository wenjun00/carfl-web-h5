<!--添加收款项-->
<template>
  <section class="component add-gather-item">
    <data-box :columns="columns1" :data="saleItemList" ref="table" @on-selection-change="currentSelect" :showConfigColumn="false" :height="400"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import DataBox from "~/components/common/data-box.vue";
import { WithdrawApplicationService } from "~/services/manage-service/withdraw-application.service";
import { RefundApplicationService } from "~/services/manage-service/refund-application.service";
import { Dependencies } from "~/core/decorator";
@Component({
  components: {
    DataBox
  }
})
export default class AddGatherItem extends Vue {
  @Dependencies(WithdrawApplicationService)
  private withdrawApplicationService: WithdrawApplicationService;
  @Dependencies(RefundApplicationService)
  private refundApplicationService: RefundApplicationService;
  private columns1: any;
  private saleItemList: Array<any> = [];
  private multipleSelection; // 多选数据

  created() {
    this.columns1 = [{
      align: "center",
      type: "selection",
      width: 60
    },
    {
      align: "center",
      title: "收款项",
      key: "itemLabel",
      render: (h, { row }) => h("span", {}, this.$dict.getDictName(row.itemLabel))
    },
    {
      align: "center",
      title: "金额",
      key: "itemMoney",
      render: (h, { row }) => h('div', {
        style: {
          textAlign: "right",
          paddingRight: "40%"
        },
      }, this.$filter.toThousands(row.itemMoney))
    }
    ];
  }
  getOrderSale(orderId, checkSaleItem) {
    this.withdrawApplicationService
      .getAdvanceRevokeItems({
        orderId: orderId
      })
      .subscribe(
      data => {
        data.map(item => {
          checkSaleItem.map(val => {
            item._checked = item.itemLabel === val.itemLabel
            item._disabled = item.itemName === "violateAmount"
          });
        });
        this.saleItemList = data;
      },
      err => this.$Message.error(err.msg));
  }
  /**
   * 获取所有收款项
   * orderId:已选中的订单号
   * checkSaleItem:要反显的收款项
   */
  getOrderSaleItem(orderId, checkSaleItem) {
    this.withdrawApplicationService
      .getAdvancePayoffItems({
        orderId: orderId
      })
      .subscribe(
      data => {
        data.map(item => {
          checkSaleItem.map(val => {
            if (item.itemLabel === val.itemLabel) {
              item._checked = true;
            }
            if (
              item.itemName === "surplusPrincipal" ||
              item.itemName === "surplusPenaltyFreeze"
            ) {
              item._checked = true;
              item._disabled = true;
            }
          });
        });
        this.saleItemList = data;
      },
      ({
            msg
          }) => {
        this.$Message.error(msg);
      }
      );
  }
  getOrderSaleItemData(orderId, checkSaleItem) {
    console.log(checkSaleItem, "checkSaleItem");
    this.refundApplicationService
      .getRefundItems({
        orderId: orderId
      })
      .subscribe(
      data => {
        data.map(v => {
          v.itemLabel = v.refundItem;
          v.itemMoney = v.refundAmount;
        });
        data.map(item => {
          checkSaleItem.map(val => {
            if (item.itemLabel === 1157) {
              item._checked = true;
            }
            if (item.itemLabel === 1157) {
              item._disabled = true;
            }
          });
        });
        this.saleItemList = data;
      },
      ({
            msg
          }) => {
        this.$Message.error(msg);
      }
      );
  }
  currentSelect(selection) {
    this.multipleSelection = selection;
  }
  changeItem() {
    console.log(this.multipleSelection, "multipleSelection");
    if (this.multipleSelection) {
      // let moneyList = this.multipleSelection.map(v => v.itemMoney);
      // let totalPayment = moneyList.reduce((x, y) => x + y); // 获取合计
      let sum: any = 0
      this.multipleSelection.forEach(v => {
        sum = sum + (Number(v.itemMoney))
      })
      let totalPayment: any = sum.toFixed()
      let total = {
        itemLabel: "合计（元）",
        itemMoney: totalPayment,
        itemName: "totalPayment"
      };
      if (!this.multipleSelection.map(v => v.itemName).includes("totalPayment")) {
        this.multipleSelection.push(total);
      }
      this.$emit("change", this.multipleSelection, totalPayment);
    } else {
      this.$emit("close");
    }
  }
  changeItemdata() {
    //   let moneyList = this.multipleSelection.map(v => v.itemMoney);
    //   let totalPayment = moneyList.reduce((x, y) => x + y); // 获取合计
    let sum: any = 0
    this.multipleSelection.forEach(v => {
      sum = sum + (Number(v.itemMoney))
    })
    let totalPayment: any = sum
    let total = {
      refundItem: "合计（元）",
      refundAmount: totalPayment,
      itemName: "totalPayment"
    };
    if (!this.multipleSelection.map(v => v.itemName).includes("totalPayment")) {
      this.multipleSelection.push(total);
    }
    this.$emit("change", this.multipleSelection, totalPayment);
  }
}

</script>
