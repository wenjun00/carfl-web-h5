<template>
  <div class="component order-progress">
    <i-row class="item-margin-top20">
      <!--<Steps :current="currentLength" size="small" status="process" style="width:100%">-->
        <!--<Step v-for="item in stepList" :key="item.id" :title="item.processName" :content="$dict.getDictName(item.approvalStatus)"></Step>-->
      <!--</Steps>-->
      <i-table :columns="progressColumns" :data="progressData" :page="pageService" @page-change="updateData(page)" :height="400"
               class="item-margin-top20"></i-table>
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
    Prop
  } from "vue-property-decorator";
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
  } from "~/utils/filter.service";
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
    private currentLength:any=0;
    private stepList: Array < any > = [];
    private page: any;
    private orderId: any;
    private currentStep: number = 0;
    created() {
      this.progressColumns = [{
          title: "序号",
          type: "index",
          align: "center",
          width: 100
        },
        {
          align: "center",
          title: "订单操作时间",
          key: "operateTime",
          width: 180,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h(
              "span",
              FilterService.dateFormat(row.operateTime, "yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          align: "center",
          title: "环节",
          key: "orderLink",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.orderLink));
          }
        },
        {
          align: "center",
          title: "订单状态",
          key: "orderStatus",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.orderStatus));
          }
        },
        {
          align: "center",
          title: "操作人",
          key: "operatorName"
        },
        {
          align: "center",
          title: "备注",
          key: "remark"
        }
      ];
      this.updateData();
    }
    getOrderProgressInfo(row) {
      this.orderId = row.orderId
      this.approvalService
        .findOrderApproveRecord({
          orderId: this.orderId
        })
        .subscribe(
          data => {
            this.progressData = data;
            if(data[data.length-1].orderLink===332){
            this.currentLength=0
            }
            if(data[data.length-1].orderLink===333){
                this.currentLength=1
            }
            if(data[data.length-1].orderLink===334){
                this.currentLength=2
            }
            if(data[data.length-1].orderLink===337){
                this.currentLength=3
            }
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
      this.approvalService
        .getOrderProcess({
          orderId: this.orderId
        })
        .subscribe(data => {
          this.stepList = data;
        //   if(this.stepList[this.stepList.length-1].approvalStatus===310){
        //       this.status = process
        //   }
        });
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

<style lang="less" scoped>
  .item-margin-top20{
    margin-top:20px
  }
  .order-progress {
    .ivu-steps,
    .ivu-steps-horizontal,
    .ivu-steps-small {
      position: relative;
      left: 20px;
      overflow: hidden;
    }
    .ivu-steps-horizontal .ivu-steps-content {
      padding-left: 0px!important;
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
