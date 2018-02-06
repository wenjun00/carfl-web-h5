<!--收款审批-->
<template>
  <section class="page receipt-approve">
    <span class="form-title">收款审批</span>
    <i-input placeholder="请录入订单编号\客户姓名\证件号码\联系号码查询" style="display:inline-block;width:10%;margin-left:10px;"></i-input>
    <i-select placeholder="全部申请类型" style="width:10%;margin-left:10px;">
      <i-option label="销售收款申请" value="销售收款申请" key="销售收款申请"></i-option>
      <i-option label="提前结清申请" value="提前结清申请" key="提前结清申请"></i-option>
      <i-option label="销售收回申请" value="销售收回申请" key="销售收回申请"></i-option>
    </i-select>
    <i-checkbox style="margin-left:10px;">包含已处理</i-checkbox>
    <i-button style="margin-left:10px" class="blueButton">搜索</i-button>
    <div style="font-size:16px;cursor:pointer;display:inline-block;color:#3367A7;float:right;margin-right:10px;margin-top:10px;">
      <svg-icon iconClass="daochu"></svg-icon>
      <span style="font-size: 12px;">导出</span>
    </div>
    <data-box :columns="columns1" :data="data1"></data-box>
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
      <i-modal title="审批" width="500" v-model="approvalModal">
        <approval :addAttachmentShow="addAttachmentShow"></approval>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="checkApplyModal" class="addApply" title="销售收款申请" width="800">
        <add-apply></add-apply>
        <div slot="footer">
          <i-button class="highDefaultButton" style="width:80px" @click="checkApplyModal=false">退回</i-button>
          <i-button class="highButton" style="width:80px" @click="checkApplyModal=false">通过</i-button>
        </div>
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
  import Approval from "~/components/common/approval.vue"
  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      SvgIcon,
      AddApply,
      Approval
    }
  })
  export default class ReceiptApprove extends Page {
    private columns1: any;
    private columns2: any;
    private data1: Array < Object > = [];
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false
    private approvalModal: Boolean = false
    private checkApplyModal: Boolean = false;
    private addAttachmentShow: Boolean = false;

    addNewApply() {
      this.$Modal.info({
        title: '新增申请',
        render: h => h(AddApply)
      })
    }
    created() {
      this.columns1 = [{
        align: 'center',
        width: 90,
        type: 'index',
        renderHeader: (h, {
          column,
          index
        }) => {
          return h(
            "div", {
              on: {
                click: () => {
                  this.columnsConfig();
                }
              },
              style: {
                cursor: "pointer"
              }
            }, [
              h("Icon", {
                props: {
                  type: "gear-b",
                  size: "20"
                }
              })
            ]
          );
        }
      }, {
        title: '操作',
        align: 'center',
        width: 100,
        render: (h, {
          row,
          columns,
          index
        }) => {
          if (row.handleStatus === '未处理') {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                },
                on: {
                  click: () => {
                    this.checkApplyModal = true
                  }
                }
              }, '审批')
            ])
          } else if (row.handleStatus === '已处理') {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                }
              }, '查看')
            ])
          }
        }
      }, {
        title: '处理状态',
        key: 'handleStatus',
        align: 'center'
      }, {
        title: '处理时间',
        key: 'handleTime',
        align: 'center'
      }, {
        title: '处理人',
        key: 'handlePerson',
        align: 'center'
      }, {
        title: '收款类型',
        key: 'gatheringType',
        align: 'center'
      }, {
        title: '收款金额',
        key: 'gatheringAmt',
        align: 'center'
      }, {
        title: '收款账户名',
        key: 'gatheringAccountName',
        align: 'center'
      }, {
        title: '申请日期',
        key: 'applyDate',
        align: 'center'
      }, {
        title: '申请人',
        key: 'applyPerson',
        align: 'center'
      }]
      this.data1 = [{
        handleStatus: '已处理',
        handleTime: '2017-12-01 13:56:56',
        handlePerson: '李健',
        gatheringAmt: '8000.00',
        gatheringType: '销售收款',
        gatheringAccountName: '中国人寿',
        applyDate: '2017-12-01 13:56:45',
        applyPerson: '大壮'
      }, {
        handleStatus: '未处理',
        handleTime: '2017-12-01 13:56:56',
        handlePerson: '李群',
        gatheringAmt: '8000.00',
        gatheringType: '销售收款',
        gatheringAccountName: '中国人寿',
        applyDate: '2017-12-01 13:56:45',
        applyPerson: '大壮'
      }]
      this.columns2 = [{
        title: '序号',
        type: 'index',
        width: '80',
        align: 'center'
      }, {
        title: '列名',
        key: 'columnsName',
        align: 'center'
      }, {
        type: 'selection',
        width: '80',
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

<style lang="less">
  .addApply {
    .ivu-modal-body {
      height: 600px;
      overflow: auto;
    }
  }

</style>
