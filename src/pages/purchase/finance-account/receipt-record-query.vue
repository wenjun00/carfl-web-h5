<!--收款记录查询-->
<template>
  <section class="page receipt-record-query">
    <span class="form-title">收款记录查询</span>
    <i-input placeholder="请录入订单编号\客户姓名\证件号码\联系号码查询" style="display:inline-block;width:10%;margin-left:10px;"></i-input>
    <i-select placeholder="全部申请类型" style="width:10%;margin-left:10px;">
      <i-option label="销售收款申请" value="销售收款申请" key="销售收款申请"></i-option>
      <i-option label="提前结清申请" value="提前结清申请" key="提前结清申请"></i-option>
      <i-option label="销售收回申请" value="销售收回申请" key="销售收回申请"></i-option>
    </i-select>
    <i-checkbox style="margin-left:10px;">包含已处理</i-checkbox>
    <i-button style="margin-left:10px" class="blueButton">搜索</i-button>
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
      <i-modal v-model="checkApplyModal" title="查看" width="800">
        <add-apply></add-apply>
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
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      SvgIcon,
      AddApply
    }
  })
  export default class ReceiptRecordQuery extends Page {
    private columns1: any;
    private columns2: any;
    private data1: Array < Object > = [];
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private checkApplyModal: Boolean = false;


    addNewApply() {
      this.$Modal.info({
        title: '新增申请',
        width: 800,
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
                }
              },
              style: {
                color: '#265EA2'
              }
            }, '查看')
          ])
        }
      }, {
        title: '收款类型',
        key: 'gatheringType',
        align: 'center'
      }, {
        title: '申请状态',
        key: 'applyStatus',
        align: 'center'
      }, {
        title: '收款账户名',
        key: 'gatheringAccountName',
        align: 'center'
      }, {
        title: '收款金额',
        key: 'gatheringMoney',
        align: 'center'
      }, {
        title: '申请时间',
        key: 'applyTime',
        align: 'center'
      }, {
        title: '申请人',
        key: 'applyPerson',
        align: 'center'
      }]
      this.data1 = [{
        gatheringType: '销售收款',
        applyStatus: '待审核',
        gatheringAccountName: '李兵强',
        gatheringMoney: '8000',
        applyTime: '2017-12-01 13:56:56',
        applyPerson: '李良琛'
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
