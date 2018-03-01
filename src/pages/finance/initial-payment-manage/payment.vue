<!--付款-->
<template>
  <section class="page payment">
    <span class="form-title">付款</span>
    <i-button type="text" @click="getTimeSearch(0)" v-auth="407">昨日</i-button>
    <i-button type="text" @click="getTimeSearch(1)" v-auth="407">今日</i-button>
    <i-button type="text" @click="getTimeSearch(2)" v-auth="407">本周</i-button>
    <i-button type="text" @click="getTimeSearch(3)" v-auth="407">本月</i-button>
    <i-button type="text" @click="getTimeSearch(4)" v-auth="407">上月</i-button>
    <i-button type="text" @click="getTimeSearch(5)" v-auth="407">最近三月</i-button>
    <i-button type="text" @click="getTimeSearch(6)" v-auth="407">本季度</i-button>
    <i-button type="text" @click="getTimeSearch(7)" v-auth="407">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2" v-auth="406">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>
      <span>高级搜索</span>
    </i-button>
    <div class="importBtn">
      <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7" v-auth="408">
        <svg-icon style="font-size:18px;" iconClass="dayin"></svg-icon>
        <span style="font-size:12px;">打印</span>
      </div>
      <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7" v-auth="409">
        <svg-icon iconClass="daochu"></svg-icon>
        <span style="font-size:12px;">导出</span>
      </div>
    </div>
    <i-row v-if="searchOptions" style="margin:6px;position:relative;right:16px;">
      <i-input style="display:inline-block;width:18%;margin-left:20px;" v-model="approvalModel.refundName" placeholder="请录入付款账户名查询"></i-input>
      <span style="margin-left:10px">日期：</span>
      <i-date-picker type="date" style="display:inline-block;width:10%" v-model="approvalModel.startTime"></i-date-picker>~
      <i-date-picker type="date" style="display:inline-block;width:10%" v-model="approvalModel.endTime"></i-date-picker>
      <i-button style="margin-left:10px" @click="getOrderQuery" class="blueButton">搜索</i-button>
    </i-row>
    <data-box :id="405" :columns="columns1" :data="paymentData"></data-box>

    <template>
      <i-modal v-model="confirmGatherModal" title="确认付款" width="900" class="confirmGather" :transfer="false">
        <confirm-gather ref="confirm-gather"></confirm-gather>
        <div slot="footer">
          <i-button class="highDefaultButton" @click="saveDraft">保存草稿</i-button>
          <i-button class="highButton" @click="confirmGatherModal=false">退回</i-button>
          <i-button class="highButton" @click="confirmGatherModal=false">确认</i-button>
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
  import {
    Tooltip
  } from 'iview'
  import {
    FilterService
  } from "~/utils/filter.service";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    RefundApplicationService
  } from "~/services/manage-service/refund-application.service";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({

    components: {
      SvgIcon,
      DataBox,
      ConfirmGather
    }
  })
  export default class Payment extends Page {
    @Dependencies(RefundApplicationService) private refundApplicationService: RefundApplicationService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private paymentData: Array < Object > = [];
    private searchOptions: Boolean = false;
    private refundName: String = '';
    private confirmGatherModal: Boolean = false;
    private startTime: any;
    private endTime: any;
    private approvalModel: any = {
      refundName: '',
      timeSearch: '',
      startTime: '',
      endTime: '',
      approvalStatus: 1127
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    saveDraft() {
      this.$Message.success('保存草稿成功！')
      this.confirmGatherModal = false
    }
    getOrderQuery() {
      this.refundApplicationService.getApprovalRecord(this.approvalModel, this.pageService).subscribe(val => {
        this.paymentData = val
      })
    }
    getTimeSearch(val) {
      this.approvalModel.startTime = "";
      this.approvalModel.endTime = "";
      this.approvalModel.timeSearch = val;
      this.getOrderQuery();
      this.approvalModel.timeSearch = "";
    }
    getApproval() {
      this.refundApplicationService.getApprovalRecord(this.approvalModel, this.pageService).subscribe(val => {
        this.paymentData = val
      })
    }
    created() {
      this.getApproval()
      this.columns1 = [
        {
          title: "操作",
          width: 120,
          align: "center",
          fixed: "left",
          render: (h, {
            row,
            column,
            index
          }) => {
            if (row.processStatus === 1130) {
              return h("div", [
                h(
                  "i-button", {
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
                        this.confirmGatherModal = true
                      }
                    }
                  },
                  "确认付款"
                )
              ]);
            } else if (row.processStatus === 1131) {
              return h("div", [
                h(
                  "i-button", {
                    props: {
                      type: "text"
                    },
                    style: {
                      color: "#265EA2"
                    },
                    on: {
                      click: () => {
                        this.confirmGatherModal = true
                      }
                    }
                  },
                  "查看"
                )
              ]);
            }
          }
        },
        {
          title: '处理状态',
          key: 'processStatus',
          editable: true,
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.processStatus));
          }
        }, {
          title: '处理时间',
          key: 'processTime',
          editable: true,          
          width: 180,
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.processTime, 'yyyy-MM-dd hh:mm:ss'))
          }
        }, {
          title: '处理人',
          editable: true,          
          width: 120,
          key: 'processName',
          align: 'center'
        }, {
          title: '付款类型',
          key: 'refundType',
          editable: true,          
          align: 'center'
        }, {
          title: '付款总金额',
          key: 'refundTotalAmount',
          editable: true,          
          align: 'center'
        }, {
          title: '付款账户名',
          key: 'customerName',
          editable: true,          
          align: 'center'
        }, {
          title: '申请日期',
          key: 'operateTime',
          editable: true,          
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.operateTime, 'yyyy-MM-dd hh:mm:ss'))
          }
        }, {
          title: '制单人',
          key: 'operator',
          editable: true,          
          align: 'center'
        }
      ]
    }
    /**
     * 确定
     */
    confirm() {}
  }

</script>

<style lang="less">
  .confirmGather {
    .ivu-modal-body {
      height: 600px;
      overflow: auto;
    }
  }
.payment .importBtn {
	float: right;
	margin-right: 13px;
	margin-top: 10px;
}
</style>