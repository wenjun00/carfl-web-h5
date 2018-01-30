<template>
  <section class="component historical-record">
    <data-box ref="databox" :columns="carColumns" :data="historicalDataset" border stripe></data-box>
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

  @Component({

    components: {
      DataBox
    }
  })
  export default class AddCar extends Vue {
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    @Dependencies(CarService) private carService: CarService;
    private isShown: Boolean = true;
    private carColumns: any;
    private carDataModel: Array < Object > = [];
    private dataList: any = [];
    private treeData: any = [];
    private treeId: any;
    private multipleSelection: any = [];

    @Emit('distributionData')
    distributionData(multipleSelection) {}
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
        type: 'selection',
        align: 'center',
        width: 100
      }, {
        title: '证件号码',
        key: 'idCard',
        align: 'center'
      }, {
        title: '客户姓名',
        key: 'personalName',
        align: 'center'
      }, {
        title: '客户电话',
        key: 'mobileMain',
        align: 'center'
      }, {
        title: '归属业务员',
        key: 'vehicleEmissions',
        align: 'center'
      }]
    }
    showCategory() {
      this.isShown = !this.isShown
    }
    /**
     * 选择并返回
     */
    chooseback() {
      this.multipleSelection = this.$refs['databox']
      this.multipleSelection = this.multipleSelection.getCurrentSelection()
      this.distributionData(this.multipleSelection)
      this.close()
    }
    /**
     * 获取历史记录信息列表
     */
    cartreeChange(data) {
      this.carService.findAllCarBySeries(this.treeId).subscribe(data => {
        this.carDataModel = data.object
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
