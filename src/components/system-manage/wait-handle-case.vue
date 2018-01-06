<!--待办事项配置-->
<template>
  <section class="component wait-handle-case">
    <i-checkbox-group>
      <i-checkbox v-for="item in checkboxList" :key="item.index" :label="item.label" :value="item.value" style="width:180px;"></i-checkbox>
    </i-checkbox-group>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import DataBox from "~/components/common/data-box.vue";
  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";

  @Component({
    components: {
      DataBox
    }
  })
  export default class WaitHandleCase extends Vue {
    @Prop()
    row: Object;
    private columns1: any;
    private data1: Array < Object > = [];
    private checkboxList: Array < Object > = [];

    created() {
      this.checkboxList = [{
        index: 1,
        label: '待登记车架号的采购单',
        value: '待登记车架号的采购单ss'
      }, {
        index: 2,
        label: '待修改采购单',
        value: '待修改采购单'
      }, {
        index: 3,
        label: '待审核采购单',
        value: '待审核采购单'
      }, {
        index: 4,
        label: '待分配采购单',
        value: '待分配采购单'
      }, {
        index: 5,
        label: '待入库采购车辆',
        value: '待入库采购车辆'
      }, {
        index: 6,
        label: '待入库调拨车辆',
        value: '待入库调拨车辆'
      }, {
        index: 7,
        label: '待入库整备车',
        value: '待入库整备车'
      }, {
        index: 8,
        label: '待出库销售车辆',
        value: '待出库销售车辆'
      }, {
        index: 9,
        label: '待入库调拨车辆',
        value: '待入库调拨车辆'
      }, {
        index: 10,
        label: '退回销售申请',
        value: '退回销售申请'
      }]
    }
    cancel() {

    }
    confirm() {

    }
    moveOut(row) {

    }
  }
</script>