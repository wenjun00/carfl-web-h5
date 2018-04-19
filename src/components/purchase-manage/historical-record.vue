<template>
  <section class="component historical-record">
    <i-table height="500" highlight-row @on-current-change="onCurrentChange" ref="databox" :columns="orderColumns" :data="orderDataSet"></i-table>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { Emit } from "vue-property-decorator";
import { FilterService } from "~/utils/filter.service";
import { ProductOrderService } from "~/services/manage-service/product-order.service";

@Component({
  components: {
    DataBox
  }
})
export default class AddCar extends Vue {
  // @Dependencies(ProductOrderService)
  // private productOrderService: ProductOrderService;
  @Prop() data: any;

  private currentRow: any;
  private orderDataSet: Array<any> = [];

  private orderColumns: any = [
    {
      title: "订单号",
      key: "orderNumber",
      align: "center"
    },
    {
      title: "订单类型",
      key: "orderType",
      align: "center",
      render: (h, { row, column, index }) => {
        return h("span", {}, this.$dict.getDictName(row.orderType));
      }
    },
    {
      title: "订单环节",
      key: "orderLink",
      align: "center",
      render: (h, { row, column, index }) => {
        return h("span", {}, this.$dict.getDictName(row.orderLink));
      }
    },
    {
      title: "订单状态",
      key: "orderStatus",
      align: "center",
      render: (h, { row, column, index }) => {
        return h("span", {}, this.$dict.getDictName(row.orderStatus));
      }
    },
    {
      title: "订单创建时间",
      key: "createTime",
      align: "center",
      render: (h, { row, column, index }) => {
        return h(
          "span",
          FilterService.dateFormat(row.createTime, "yyyy-MM-dd hh:mm:ss")
        );
      }
    }
  ];

  /**
   * 当前选中行变化处理
   */
  onCurrentChange(currentRow) {
    this.currentRow = currentRow;
  }

  /**
   * 获取当前选中项
   */
  getCurrentRow() {
    if (!this.currentRow) {
      this.$Message.error("未选中任何数据。");
    } else {
      return this.currentRow;
    }
  }

  // /**
  //  * 选择并返回
  //  */
  // chooseback() {
  //   this.productOrderService
  //     .findOrderInfoByOrderNumber({
  //       orderNumber: this.currentRow.orderNumber
  //     })
  //     .subscribe(data => {
  //       this.closeProduct();
  //       this.distributionData(data, this.currentRow.orderStatus);
  //     });
  //   this.close();
  // }

  mounted() {
    this.orderDataSet = this.data;
  }
}
</script>
<style lang="less" scope>
.open {
  max-width: auto;
  overflow: hidden;
}

.close {
  max-width: 0;
  min-width: 0;
  overflow: hidden;
}

.arrowUp {
  transform: rotate(0deg); // transition: transform ease-in 0.2s;
  cursor: pointer;
}

.arrowDown {
  transform: rotate(180deg); // transition: transform ease-in 0.2s;
  cursor: pointer;
}

.arrowButton {
  line-height: 570px;
  height: 100%;
  background: #265ea2;
  text-align: center;
  width: 20px;
}
</style>
