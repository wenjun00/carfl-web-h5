<!--收款记录查询-->
<template>
  <section class="page receipt-record-query">
    <span class="form-title">收款记录查询</span>
    <span style="margin-left:10px">申请日期：</span>
    <i-date-picker v-model="receiptModel.queryStartDate" type="date" placeholder="yyy/mm/dd" style="width: 200px"></i-date-picker>
    <i-date-picker v-model="receiptModel.queryEndDate" type="date" placeholder="yyy/mm/dd" style="width: 200px"></i-date-picker>
    <i-input placeholder="请录入订单编号" style="display:inline-block;width:10%;margin-left:10px;" v-model="receiptModel.orderNumber"></i-input>
    <i-select placeholder="全部收款类型" style="width:10%;margin-left:10px;" v-model="receiptModel.applicationType" clearable>
      <i-option v-for="{value,label} in $dict.getDictData('0101')" :key="value" :label="label" :value="value"></i-option>
    </i-select>
    <i-select placeholder="申请状态" style="width:10%;margin-left:10px;" v-model="receiptModel.approvalStatus" clearable>
      <i-option v-for="{value,label} in $dict.getDictData('0103')" :key="value" :label="label" :value="value"></i-option>
    </i-select>
    <i-checkbox style="margin-left:10px;" v-model="status">包含已归档订单</i-checkbox>
    <i-button style="margin-left:10px" class="blueButton" @click="receiptRecordSearch">搜索</i-button>
    <data-box :columns="columns1" :data="receiptDataSet" :page="pageService"></data-box>
    <!--Model-->
    <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <i-table :columns="columns2" :data="data2"></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="checkApplyModal" title="查看" width="800">
        <!--<add-apply></add-apply>-->
        <apply-detail ref="applyDetail"></apply-detail>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
  import SvgIcon from '~/components/common/svg-icon.vue'
  // 添加新申请
  import AddApply from "~/components/purchase-manage/add-apply.vue";
  import {
    WithdrawApplicationService
  } from "~/services/manage-service/withdraw-application.service";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    Layout
  } from "~/core/decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    FilterService
  } from "~/utils/filter.service";
  // 添加新申请
  import ApplyDetail from "~/components/purchase-manage/apply-detail.vue";

  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      SvgIcon,
      AddApply,
      ApplyDetail
    }
  })
  export default class ReceiptRecordQuery extends Page {
    @Dependencies(WithdrawApplicationService) private withdrawApplicationService: WithdrawApplicationService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private columns2: any;
    private receiptDataSet: Array < Object > = [];
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private checkApplyModal: Boolean = false;
    private status: Boolean = false;
    private receiptModel: any = {
      queryStartDate: '',
      queryEndDate: '',
      applicationType: '', // 收款类型
      approvalStatus: '', // 申请状态
      orderNumber: '' // 订单编号
    }

    addNewApply() {
      this.$Modal.info({
        title: '新增申请',
        width: 800,
        render: h => h(AddApply)
      })
    }
    created() {
      this.receiptRecordSearch()
      this.columns1 = [{
        title: '操作',
        align: 'center',
        width: 180,
        render: (h, {
          row,
          columns,
          index
        }) => {
          return h('div', [
            h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.checkApplyModal = true
                  this.withdrawApplicationService.viewApplicationDetail({
                    applicationId: row.applicationId
                  }).subscribe(val => {
                    let _applyInfo: any = this.$refs['applyDetail']
                    _applyInfo.getparentreceipt(val)
                  })
                }
              },
              style: {
                color: '#265EA2'
              }
            }, '查看')
          ])
        }
      }, {
        title: '订单编号',
        key: 'orderNumber',
        align: 'center'
      }, {
        title: '收款类型',
        key: 'applicationType',
        align: 'center',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h("span", {}, this.$dict.getDictName(row.applicationType));
        }
      }, {
        title: '申请状态',
        key: 'approvalStatus',
        align: 'center',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h("span", {}, this.$dict.getDictName(row.approvalStatus));
        }
      }, {
        title: '收款客户名',
        key: 'accountName',
        align: 'center'
      }, {
        title: '收款金额',
        key: 'totalPayment',
        align: 'center'
      }, {
        title: '申请时间',
        key: 'operatorTime',
        align: 'center',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h('span', FilterService.dateFormat(row.operatorTime, 'yyyy-MM-dd hh:mm:ss'))
        }
      }, {
        title: '制单人',
        key: 'userUserName',
        align: 'center'
      }]
      this.columns2 = [{
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
      }, {
        title: '列名',
        key: 'columnsName',
        align: 'center'
      }, {
        type: 'selection',
        width: 80,
        align: 'center'
      }]
      this.data2 = [{
        columnsName: '申请类型'
      }, {
        columnsName: '环节'
      }, {
        columnsName: '状态'
      }, {
        columnsName: '订单编号'
      }, {
        columnsName: '订单创建时间'
      }, {
        columnsName: '收款金额'
      }, {
        columnsName: '收款类型'
      }, {
        columnsName: '产品名称'
      }, {
        columnsName: '客户姓名'
      }, {
        columnsName: '证件号码'
      }, {
        columnsName: '联系号码'
      }]
    }
    /**
     * 搜索
     */
    receiptRecordSearch() {
      if (this.status) {
        this.receiptModel.isInclude = 1
      } else {
        this.receiptModel.isInclude = 0
      }
      this.receiptModel.queryStartDate = FilterService.dateFormat(
        this.receiptModel.queryStartDate
      );
      this.receiptModel.queryEndDate = FilterService.dateFormat(
        this.receiptModel.queryEndDate
      );
      this.withdrawApplicationService
        .getGatheringApprovalList(this.receiptModel, this.pageService)
        .subscribe(
          data => {
            this.receiptDataSet = data
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions
    }
    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true
    }
    /**
     * 多选
     */
    multipleSelect(selection) {}
    /**
     * 确定
     */
    confirm() {

    }
  }

</script>
