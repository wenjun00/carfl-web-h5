<!--个人订单详情-->
<template>
  <section class="component personal-order-details">
    <div style="font-size: 16px;font-weight: bolder;margin-left: 10px;">订单环节</div>
    <i-steps :current="5"  style="margin:20px 10px">
      <Step title="车辆评估"></Step>
      <Step title="贷款申请"></Step>
      <Step title="资料审核"></Step>
      <Step title="签约"></Step>
      <Step title="押品入库"></Step>
      <Step title="放款"></Step>
    </i-steps>
    <data-box :data="uploadDataSet" :columns="detailsColumns" :showConfigColumn="false" :page="pageService" height="400px;"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { Dependencies } from '~/core/decorator'
  import { PageService } from '~/utils/page.service'
  @Component({
    components: {}
  })
  export default class PersonalOrderDetails extends Vue {
    @Dependencies(PageService) private pageService: PageService
    private uploadDataSet:any = []
    private detailsColumns = [
      {
        title: "订单编号",
        type: "index",
        align: "center"
      },
      {
        title: "订单状态",
        key: "uploadName",
        align: "center"
      },
      {
        title: "创建时间",
        key: "materialTypeName",
        align: "center"
      },
      {
        title: "归属公司",
        key: "sdf",
        align: "center",
      },
      {
        title: "归属部门",
        key: "sdf",
        align: "center",
      },
      {
        title: "归属业务员",
        key: "sdf",
        align: "center",
      }
    ];

  }
</script>
<style lang="less" scoped>

</style>
