<template>
  <div class="component order-progress">
    <i-row style="margin-top:20px">
      <Steps :current="currentStep" size="small" status="error" style="width:100%">
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
      <!--<div style="width:100%;height:40px;display:flex;justify-content:space-between">
        <div v-for="item in progressData" :key="item.id">{{item.orderStatus|getOrderStatus}}</div>
      </div>-->
      <i-table :columns="progressColumns" :data="progressData" :page="pageService" @page-change="updateData(page)" :height="400"
        style="margin-top:20px;"></i-table>
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
  import {
    ApprovalService
  } from "~/services/manage-service/approval.service";
  import {
    FilterService
  } from "~/utils/filter.service"
  @Component({
    components: {
      DataBox
    }
  })
  export default class OrderProgress extends Vue {
    @Dependencies(PageService) private pageService: PageService;
    @Dependencies(ApprovalService) private approvalService: ApprovalService;

    private progressColumns: Array < Object > = [];
    private progressData: Array < Object > = [];
    private page: any;
    private currentStep: number = 3;
    created() {
      this.progressColumns = [{
          title: '序号',
          type: 'index',
          align: 'center',
          width: 100
        }, {
          align: 'center',
          title: '订单操作时间',
          key: 'operateTime',
          width: 180,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.operateTime, 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          align: 'center',
          title: '环节',
          key: 'orderLink'
        },
        {
          align: 'center',
          title: '订单状态',
          key: 'orderStatus',
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
          key: 'remark'
        }
      ]
      this.updateData()
    }
    getOrderProgressInfo(row) {
      this.approvalService.findOrderApproveRecord({
        orderId: row.orderId
      }).subscribe(val => {
        this.progressData = val.object
      })

    }
    updateData() {
      // this.orderQueryService.getOrderProgress().subscribe(({
      //   val
      // }) => {
      //   this.progressData = val;
      // })
    }
  }

</script>

<style lang="less">
  .order-progress {
    .ivu-steps,
    .ivu-steps-horizontal,
    .ivu-steps-small {
      position: relative;
      left: 20px;
      overflow: hidden;
    }
    .ivu-steps-item {
      .ivu-steps-title {
        display: block;
        margin-top: 4px;
        width: 100px;
      }
    }
  }

</style>
