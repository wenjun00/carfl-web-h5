<template>
  <section class="component historical-record">
    <div class="order-type-radio row center-span middle-span">
      <RadioGroup v-model="orderType" type="button" size="large" @on-change="onOrderTypeChange">
        <Radio :label="0">历史订单</Radio>
        <Radio :label="1">退件订单</Radio>
        <Radio :label="2">草稿订单</Radio>
      </RadioGroup>
    </div>
    <i-table :height="500" highlight-row @on-current-change="onCurrentChange" ref="databox" :columns="orderColumns" :data="orderDataSet"></i-table>
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
//TODO
@Component({
  components: {
    DataBox
  }
})
export default class HistoricalRecord extends Vue {
  @Prop() data: any;

  private currentRow: any;
  private orderDataSet: Array<any> = [];
  private orderType = 302;

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

  private typeFilter = {
    0:x=>x!==303&&x!==311,
    1:x=>x==303,
    2:x=>x==311
  }

  onOrderTypeChange(value) {
    this.currentRow = null;
    this.orderDataSet = this.data.filter(x => x.orderStatus).filter(this.typeFilter[value]);
  }

  /**
   * 获取当前选中项
   */
  getCurrentRow() {
    return this.currentRow;
  }

  mounted() {
    this.orderDataSet = this.data.filter(x => x.orderType === this.orderType);
  }
}
</script>
<style lang="less" scoped>
.component.historical-record {
  .order-type-radio {
    margin-bottom: 10px;
  }
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
}
</style>
