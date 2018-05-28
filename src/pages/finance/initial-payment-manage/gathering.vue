<!--收款确认-->
<template> 
  <section class="page gathering">
    <page-header title="收款确认"></page-header>
    <data-form data-prop="timeSearch" :model="gatherModel" :page="pageService" @on-search="getGatherListByCondition">
      <template slot="input">
        <i-form-item prop="accountName" label="收款账户名">
          <i-input v-model="gatherModel.accountName" class="form-input" placeholder="请录入收款账户名查询"></i-input>
        </i-form-item>
        <i-form-item prop="orderNumber" label="订单编号">
          <i-input v-model="gatherModel.orderNumber" class="form-input" placeholder="请录入收款账户名查询"></i-input>
        </i-form-item>
        <i-form-item prop="dateRange" label="处理日期">
          <i-date-picker v-model="gatherModel.dateRange" class="title-item" type="daterange" placeholder="请选择日期范围"></i-date-picker>
        </i-form-item>
      </template>
    </data-form>
    <data-box :id="399" :columns="columns1" :data="gatherList" @onPageChange="getGatherListByCondition" :page="pageService"></data-box>
    <template>
      <i-modal  v-model="confirmGatherModal" :title="check?'查看':'确认收款'" :width="900" class="confirmGather" :transfer="false">
        <confirm-gather :currentRow="currentRow" ref="confirm-gather" :check="check"></confirm-gather>
        <div slot="footer">
          <!--<i-button class="highDefaultButton" @click="saveDraft" v-if="!check">保存草稿</i-button>-->
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
      orderNumber:'',
      accountName: '',
      startTime: '',
      endTime: '',
      timeSearch: '',
      dateRange:[]
    }
    private currentRow:any =[]

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
      data.financeUploadResource = _repayment.fodderList
      data.collectMoneyDetails = _repayment.collectMoneyDetails
      data.orderId = _repayment.rowObj.orderId
      data.businessId = _repayment.rowObj.applicationId
      data.totalPayment = _repayment.paymentAmount
      data.withdrawApplicationId = _repayment.rowObj.applicationId
      data.collectMoneyChannel = _repayment.pipeSelect
      console.log(data)
      // this.collectMoneyHistoryService.saveCollectMoneyHistoryAsDraft(data).subscribe(data => {
      //   this.$Message.info('保存草稿成功！')
      //   this.confirmGatherModal = false
      // }, ({
      //   msg
      // }) => {
      //   this.$Message.error(msg)
      // })
    }
    /**
     * 确认还款
     */
    confirmRepayment() {
      let _repayment: any = this.$refs['confirm-gather']
      let data: any = {}
      // data.collectMoneyId = _repayment.collectMoneyId
      data.financeUploadResource = _repayment.fodderList
      // data.collectHistoryDetails = _repayment.collectMoneyDetails
      data.orderId = _repayment.rowObj.orderId
      data.businessId = _repayment.rowObj.applicationId
      data.totalPayment = _repayment.repaymentObj.totalPayment
      data.withdrawApplicationId = _repayment.rowObj.applicationId
      data.collectMoneyChannel = _repayment.pipeSelect
      console.log(data)
      // if(!_repayment.collectMoneyDetails.length || (_repayment.repaymentObj.totalPayment >_repayment.paymentAmount)){
      //   this.$Message.warning("总金额小于应收总金额，请检查后确定！")
      //   return
      // }else{
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
      // }
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
    activated() {
      this.getGatherListByCondition()
    }
    created() {
      this.getGatherListByCondition()
      this.columns1 = [{
          title: "操作",
          minWidth: this.$common.getColumnWidth(4),
          fixed: "left",
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            let obj: any = {}
            if (row.collectMoneyDealStatus === 126) {
              obj = h("i-button", {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.confirmGatherModal = true
                    this.$nextTick(()=>{
                      let _repayment: any = this.$refs['confirm-gather']
                      _repayment.refresh(row)
                    })
                    this.check = true
                    this.currentRow = row
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
                    this.confirmGatherModal = true
                    this.$nextTick(()=>{
                      let _repayment: any = this.$refs['confirm-gather']
                      _repayment.refresh(row)
                    })
                    this.check = false
                    this.currentRow = row
                  }
                }
              }, "确认收款")
            }
            return h("div", [obj]);
          }
        },
         {
          title: "订单编号",
          key: "orderNumber",
          align: "center",
          editable: true,
          minWidth: this.$common.getColumnWidth(4),
        },
        {
          title: "处理状态",
          key: "collectMoneyDealStatus",
          align: "center",
          editable: true,
          minWidth: this.$common.getColumnWidth(4),
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
          minWidth: this.$common.getColumnWidth(6),
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
          key: "dealerName",
          minWidth: this.$common.getColumnWidth(3),
        },
        {
          align: "center",
          title: "收款类型",
          editable: true,
          minWidth: this.$common.getColumnWidth(3),
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
          key: "totalPayment",
          minWidth: this.$common.getColumnWidth(4),
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  textAlign: "right"
                }
              },
              this.$filter.toThousands(row.totalPayment)
            );
          }

        },
        {
          align: "center",
          title: "收款账户名",
          editable: true,
          minWidth: this.$common.getColumnWidth(4),
          key: "accountName"
        },
        {
          align: "center",
          title: "申请日期",
          editable: true,
          key: "operatorTime",
          minWidth: this.$common.getColumnWidth(6),
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
          minWidth: this.$common.getColumnWidth(4),
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
      this.collectMoneyHistoryService.collectMoneyHistoryList(this.gatherModel, this.pageService).subscribe(
        val => this.gatherList = val,
        err => this.$Message.error(err)
      )
    }
  }

</script>

<style lang="less">
  .page.gathering {
    .data-form {
      margin-top: 10px;
    }
    .form-button {
      color: #265EA2
    }
    .importBtn {
      float: right;
      margin-right: 13px;
      margin-top: 10px;
      .importBtn-item {
        cursor: pointer;
        display: inline-block;
        margin-left: 10px;
        color: #3367A7;
        .importBtn-item-one {
          font-size: 18px;
        }
        .importBtn-item-two {
          font-size: 12px;
        }
      }
    }
    .second-data {
      margin: 6px;
      position: relative;
      right: 16px;
      .form-input {
        display: inline-block;
        width: 18%;
        margin-left: 20px;
      }
      .title {
        margin-left: 10px;
      }
      .title-item {
        display: inline-block;
        width: 10%
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
