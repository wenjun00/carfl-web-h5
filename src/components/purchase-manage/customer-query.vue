<!--解绑银行卡-->
<template>
  <section class="component customer-query">
    <data-grid :labelWidth="100" labelAlign="left" contentAlign="left" style="margin-top: 15px;">
      <data-grid-item label="客户姓名" :span="6">{{row.personalName}}</data-grid-item>
      <data-grid-item label="订单数" :span="6">{{row.orderNumber}}</data-grid-item>

      <data-grid-item label="创建时间" :span="6">{{row.createTime}}</data-grid-item>
      <data-grid-item label="归属公司" :span="6">{{row.companyName}}</data-grid-item>

      <data-grid-item label="证件号码" :span="6">{{row.certificateNumber}}</data-grid-item>
      <data-grid-item label="归属部门" :span="6">{{row.deptName}}</data-grid-item>

      <data-grid-item label="联系号码" :span="6">{{row.mobileNumber}}</data-grid-item>
      <data-grid-item label="归属人" :span="6">{{row.orderMaker}}</data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    DataGrid,
    DataGridItem
  } from "vue-fintech-component";
  @Component({
    components: {
      DataGrid,
      DataGridItem
    }
  })
  export default class CustomerQuery extends Vue {
    private customerQuery: Object = {}
    @Prop() row: Object;
    created() {
      
    }
  }

</script>
<style lang="less" scope>


</style>
