<template>
  <section class="component historical-record">
    <i-table height="500" highlight-row @on-current-change="getCurrentSelectionData" ref="databox" :columns="carColumns" :data="historicalDataset"></i-table>
    <i-row style="margin-top:20px;">
      <i-button class="blueButton" style="float:right" @click="chooseback">选择并返回</i-button>
    </i-row>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    ApplyQueryService
  } from "~/services/business-service/apply-query.service";
  import {
    CarService
  } from "~/services/manage-service/car.service";
  import {
    Emit
  } from "vue-property-decorator";
  import {
    FilterService
  } from "~/utils/filter.service";
  import {
    ProductOrderService
  } from "~/services/manage-service/product-order.service";

  @Component({

    components: {
      DataBox
    }
  })
  export default class AddCar extends Vue {
    @Dependencies(ProductOrderService) private productOrderService: ProductOrderService;
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    @Dependencies(CarService) private carService: CarService;
    private isShown: Boolean = true;
    private carColumns: any;
    private carDataModel: Array < Object > = [];
    private dataList: any = [];
    private treeData: any = [];
    private treeId: any;
    private multipleSelection: any = [];
    private currentRow: any = {};

    @Emit('distributionData')
    distributionData(multipleSelection) {}
    @Emit('closeProduct')
    closeProduct(){}
    @Emit('close')
    close() {}
    @Prop() rowData: any;
    @Emit('update:rowData')
    updateRowData(row) {}
    @Prop() addcarData: any;
    @Prop() historicalDataset: any;


    @Prop() row: Object;
    created() {
      this.carColumns = [{
        title: '订单号',
        key: 'orderNumber',
        align: 'center'
      }, {
        title: '订单类型',
        key: 'orderType',
        align: 'center',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h("span", {}, this.$dict.getDictName(row.orderType));
        }
      },{
        title: '订单环节',
        key: 'orderLink',
        align: 'center',
         render: (h, {
          row,
          column,
          index
        }) => {
          return h("span", {}, this.$dict.getDictName(row.orderLink));
        }
      },{
        title: '订单状态',
        key: 'orderStatus',
        align: 'center',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h("span", {}, this.$dict.getDictName(row.orderStatus));
        }
      },{
        title: '订单创建时间',
        key: 'createTime',
        align: 'center',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h('span', FilterService.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss'))
        }
      }]
    }
    showCategory() {
      this.isShown = !this.isShown
    }
    getCurrentSelectionData(currentRow) {
      this.currentRow = currentRow
    }
    /**
     * 选择并返回
     */
    chooseback() {
      this.productOrderService.findOrderInfoByOrderNumber({
        orderNumber: this.currentRow.orderNumber
      }).subscribe(data => {
        this.closeProduct()
        this.distributionData(data)
      })
      this.close()
    }
    /**
     * 获取历史记录信息列表
     */
    cartreeChange(data) {
      this.carService.findAllCarBySeries(this.treeId).subscribe(data => {
        this.carDataModel = data
        console.log(this.carDataModel, 988)
      }, ({
        msg
      }) => {
        this.$Message.error(msg);
      });
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
    background: #265EA2;
    text-align: center;
    width: 20px;
  }

</style>
