<!--收款-->
<template>
  <section class="page gathering">
    <span class="form-title">收款</span>
    <i-button type="text" @click="getTimeSearch(0)" v-auth="401">昨日</i-button>
    <i-button type="text" @click="getTimeSearch(1)" v-auth="401">今日</i-button>
    <i-button type="text" @click="getTimeSearch(2)" v-auth="401">本周</i-button>
    <i-button type="text" @click="getTimeSearch(3)" v-auth="401">本月</i-button>
    <i-button type="text" @click="getTimeSearch(4)" v-auth="401">上月</i-button>
    <i-button type="text" @click="getTimeSearch(5)" v-auth="401">最近三月</i-button>
    <i-button type="text" @click="getTimeSearch(6)" v-auth="401">本季度</i-button>
    <i-button type="text" @click="getTimeSearch(7)" v-auth="401">本年</i-button>
    <i-button @click="openSearch" class="form-button" v-auth="400">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>
      <span>高级搜索</span>
    </i-button>
    <div class="importBtn">
      <div class="importBtn-item" v-auth="402">
        <svg-icon iconClass="dayin" class="importBtn-item-one"></svg-icon>
        <span class="importBtn-item-two">打印</span>
      </div>
      <div class="importBtn-item" v-auth="403">
        <svg-icon iconClass="daochu" class="importBtn-item-one"></svg-icon>
        <span class="importBtn-item-two">导出</span>
      </div>
    </div>
    <i-row v-if="searchOptions" class="second-data">
      <i-input  v-model="gatherModel.accountName" class="form-input" placeholder="请录入收款账户名查询" ></i-input>
      <span class="title">日期：</span>
      <i-date-picker v-model="gatherModel.queryStartDate" class="title-item"></i-date-picker> ~
      <i-date-picker v-model="gatherModel.queryEndDate" class="title-item"></i-date-picker>
      <i-button class="blueButton" @click="getGatherListByCondition">搜索</i-button>
    </i-row>
    <data-box :id="399" :columns="columns1" :data="gatherList" @onPageChange="getGatherListByCondition" :page="pageService"></data-box>


    <template>
      <i-modal v-model="confirmGatherModal" :title="check?'查看':'确认收款'" width="900" class="confirmGather" :transfer="false">
        <confirm-gather ref="confirm-gather" :check="check"></confirm-gather>
        <div slot="footer">
          <i-button class="highDefaultButton" @click="saveDraft" v-if="!check">保存草稿</i-button>
          <i-button class="highButton" @click="sendBack" v-if="!check">退回</i-button>
          <i-button class="highButton" @click="confirmRepayment" v-if="!check">确认</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import ConfirmGather from "~/components/finance-manage/confirm-gather.vue"
  import SvgIcon from '~/components/common/svg-icon.vue';
  import { Tooltip } from 'iview'
  import { Dependencies } from "~/core/decorator";
  import { Layout } from "~/core/decorator";
  import { CollectMoneyHistoryService } from "~/services/manage-service/collect-money-history.service";
  import { PageService } from "~/utils/page.service";
  import { FilterService } from "~/utils/filter.service"
  @Layout("workspace")
  @Component({
    components: {
      SvgIcon,
      DataBox,
      ConfirmGather
    }
  })
  export default class Gathering extends Page {
    @Dependencies(CollectMoneyHistoryService) private collectMoneyHistoryService: CollectMoneyHistoryService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private gatherList: Array < Object > = [];
    private searchOptions: Boolean = false;
    private confirmGatherModal: Boolean = false;
    private check: Boolean = false;
    private gatherModel: any = {
      accountName: '',
      queryStartDate: '',
      queryEndDate: '',
      timeSearch: ''
    }
    getEarlyPayList() {

    }
    getTimeSearch(val) {
      this.gatherModel.settlementChannel = ''
      this.gatherModel.paymentStatus = ''
      this.gatherModel.dynamicParam = ''
      this.gatherModel.timeSearch = val
      this.getEarlyPayList()
      this.gatherModel.timeSearch = ''
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    saveDraft() {
      let _repayment: any = this.$refs['confirm-gather']
      let data: any = {}
      data.collectMoneyId = _repayment.collectMoneyId
      data.financeUploadResource = _repayment.financeUploadResources
      data.collectMoneyDetails = _repayment.collectMoneyDetails
      data.orderId = _repayment.rowObj.orderId
      data.businessId = _repayment.rowObj.applicationId
      data.totalPayment = _repayment.paymentAmount
      this.collectMoneyHistoryService.saveCollectMoneyHistoryAsDraft(data).subscribe(data => {
        this.$Message.info('保存草稿成功！')
        this.confirmGatherModal = false
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    /**
     * 确认还款
     */
    confirmRepayment() {
      let _repayment: any = this.$refs['confirm-gather']
      let data: any = {}
      data.collectMoneyId = _repayment.collectMoneyId
      data.financeUploadResource = _repayment.financeUploadResources
      data.collectMoneyDetails = _repayment.collectMoneyDetails
      data.orderId = _repayment.rowObj.orderId
      data.businessId = _repayment.rowObj.applicationId
      data.totalPayment = _repayment.paymentAmount
      this.collectMoneyHistoryService.saveCollectMoneyHistory(data).subscribe(data => {
        this.$Message.info('操作成功！')
        this.confirmGatherModal = false
        this.pageService.reset()
        this.getGatherListByCondition()
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    /**
     * 退回
     */
    sendBack() {
      let _repayment: any = this.$refs['confirm-gather']
      let data: any = {}
      data.withdrawId = _repayment.rowObj.applicationId
      data.isPass = 0
      this.collectMoneyHistoryService.sendBackWithdrawApplication(data).subscribe(data => {
        this.$Message.info('操作成功！')
        this.confirmGatherModal = false
        this.pageService.reset()
        this.getGatherListByCondition()
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    created() {
      this.getGatherListByCondition()
      this.columns1 = [
        {
          title: "操作",
          width: 120,
          fixed: "left",
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            let obj: any = {}
            if(row.collectMoneyDealStatus===126) {
              obj = h("i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      let _repayment: any = this.$refs['confirm-gather']
                      _repayment.refresh(row)
                      this.check = true
                      this.confirmGatherModal = true
                    }
                  }
                }, "查看")
            } else {
              obj = h("i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      let _repayment: any = this.$refs['confirm-gather']
                      _repayment.refresh(row)
                      this.check = false
                      this.confirmGatherModal = true
                    }
                  }
                }, "确认收款")
            }
            return h("div", [obj]);
          }
        },
        {
          title: "处理状态",
          key: "collectMoneyDealStatus",
          align: "center",
          editable: true,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.collectMoneyDealStatus));
          }
        },
        {
          align: "center",
          title: "处理时间",
          editable: true,
          key: "dealTime",
          width: 180,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.dealTime, 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          align: "center",
          title: "处理人",
          editable: true,
          key: "dealerName"
        },
        {
          align: "center",
          title: "收款类型",
          editable: true,
          key: "applicationType",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.applicationType));
          }
        },
        {
          align: "center",
          title: "收款总金额",
          editable: true,
          key: "totalPayment"
        },
        {
          align: "center",
          title: "收款账户名",
          editable: true,
          key: "accountName"
        },
        {
          align: "center",
          title: "申请日期",
          editable: true,
          key: "operatorTime",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.operatorTime, 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          align: "center",
          title: "申请人",
          editable: true,
          key: "operatorName"
        }
      ];
    }
    /**
     * 确定
     */
    confirm() {}
    /**
     * 获取收款列表
     */
    getGatherListByCondition() {
      this.collectMoneyHistoryService.collectMoneyHistoryList(this.gatherModel, this.pageService).subscribe(val => {
        this.gatherList = val
      })
    }
  }

</script>

<style lang="less">
  .page.gathering{
    .form-button{
      color:#265EA2
    }
    .importBtn {
      float: right;
      margin-right: 13px;
      margin-top: 10px;
      .importBtn-item{
        cursor:pointer;
        display:inline-block;
        margin-left:10px;
        color:#3367A7;
        .importBtn-item-one{
          font-size:18px;
        }
        .importBtn-item-two{
          font-size:12px;
        }
      }
    }
    .second-data{
      margin:6px;
      position:relative;
      right:16px;
      .form-input{
        display:inline-block;
        width:18%;
        margin-left:20px;
      }
      .title{
        margin-left:10px;
      }
      .title-item{
        display:inline-block;
        width:10%
      }
    }
  }
  .confirmGather {
    .ivu-modal-body {
      height: 600px;
      overflow: auto;
    }
  }
</style>
