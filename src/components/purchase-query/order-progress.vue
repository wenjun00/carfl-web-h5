<template>
  <div class="component order-progress">
    <i-row style="margin-top:20px">
      <Steps :current="2" size="small">
        <Step title="用户进件"></Step>
        <Step title="风控引擎"></Step>
        <Step title="面审"></Step>
        <Step title="复审"></Step>
        <Step title="终审"></Step>
        <Step title="签约"></Step>
        <Step title="合规检查"></Step>
        <Step title="首付款"></Step>
        <Step title="放车"></Step>
        <Step title="还款"></Step>
      </Steps>
      <i-table :columns="progressColumns" :data="progressData" :page="pageService" @page-change="updateData(page)" style="margin-top:10px"></i-table>
    </i-row>

  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderQueryService
  } from "~/services/business-service/order-query.service";


  @Component({
    components: {
      DataBox
    }
  })
  export default class OrderProgress extends Vue {
    @Dependencies(PageService) private pageService: PageService;
    @Dependencies(OrderQueryService) private orderQueryService: OrderQueryService;

    private progressColumns: Array < Object > = [];
    private progressData: Array < Object > = [];
    private page: any;

    mounted() {
      this.progressColumns = [{
          title: '序号',
          type: 'index',
          align: 'center',
          width: 60
        }, {
          align: 'center',
          title: '订单操作时间',
          key: 'processingTime',
          width: 180
        },
        {
          align: 'center',
          title: '环节',
          key: 'link'
        },
        {
          align: 'center',
          title: '订单状态',
          key: 'statusDescription',
          width: 320
        },
        {
          align: 'center',
          title: '操作人',
          key: 'operator'
        },
        {
          align: 'center',
          title: '备注',
          key: 'noteDescription'
        }
      ]
      this.updateData()
    }
    updateData() {
      this.orderQueryService.getOrderProgress().subscribe(({
        val
      }) => {
        this.progressData = val;
      })
    }
  }

</script>

<style scoped>


</style>
