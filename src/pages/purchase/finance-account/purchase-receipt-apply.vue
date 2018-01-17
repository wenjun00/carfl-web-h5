<!--进件收款申请-->
<template>
  <section class="page purchase-receipt-apply">
    <span class="form-title">进件收款申请</span>
    <i-input placeholder="请录入订单编号\客户姓名\证件号码\联系号码查询" style="display:inline-block;width:10%;margin-left:10px;"></i-input>
    <i-select placeholder="全部申请类型" style="width:10%;margin-left:10px;">
      <i-option label="销售收款申请" value="销售收款申请" key="销售收款申请"></i-option>
      <i-option label="提前结清申请" value="提前结清申请" key="提前结清申请"></i-option>
      <i-option label="销售收回申请" value="销售收回申请" key="销售收回申请"></i-option>
    </i-select>
    <i-checkbox style="margin-left:10px;">包含已处理</i-checkbox>
    <i-button style="margin-left:10px" class="blueButton">搜索</i-button>
    <i-button style="margin-left:10px" class="blueButton" @click="addNewApply">新增申请</i-button>
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
      <i-modal title="订单详情" width="1000" v-model="purchaseInfoModal" class="purchaseInformation">
        <purchase-information></purchase-information>
        <div slot="footer">
          <i-button style="background:#265ea2;color:#fff" @click="purchaseInfoModal=false">返回</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import PurchaseInformation from "~/components/purchase-query/purchase-information.vue";
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
  export default class PurchaseReceiptApply extends Page {
    private columns1: any;
    private columns2: any;
    private data1: Array < Object > = [];
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false
    private purchaseInfoModal: Boolean = false;

    addNewApply() {
      // this.$Modal.info({
      //   title: '新增申请',
      //   width: 800,
      //   render: h => h(AddApply)
      // })

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
              style: {
                color: '#265EA2'
              }
            }, '编辑'),
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
      }, {
        title: '申请类型',
        key: 'applyType',
        align: 'center',
        width: 160
      }, {
        title: '环节',
        key: 'step',
        align: 'center',
        width: 90
      }, {
        title: '状态',
        key: 'status',
        align: 'center',
        width: 90
      }, {
        title: '订单编号',
        key: 'orderId',
        align: 'center',
        render: (h, {
          row,
          columns,
          index
        }) => {
          return h('i-button', {
            props: {
              type: 'text'
            },
            on: {
              click: () => {
                this.purchaseInfoModal = true
              }
            }
          }, '07241700071512')
        }
      }, {
        title: '订单创建时间',
        key: 'orderCreateTime',
        align: 'center'
      }, {
        title: '收款金额',
        key: 'gatheringAmt',
        align: 'center',
        width: 120
      }, {
        title: '收款类型',
        key: 'gatheringType',
        align: 'center',
        width: 120
      }, {
        title: '产品名称',
        key: 'prdName',
        align: 'center',
        width: 120
      }, {
        title: '客户姓名',
        key: 'customerName',
        align: 'center',
        width: 120
      }, {
        title: '证件号码',
        key: 'idCard',
        align: 'center',
        width: 180
      }, {
        title: '联系号码',
        key: 'phone',
        align: 'center',
        width: 120
      }]
      this.data1 = [{
        applyType: '销售收款申请',
        step: '进件',
        status: '待提交',
        orderId: '07241700071512',
        orderCreateTime: '2017-12-01 13:56:56',
        gatheringAmt: '8000.00',
        gatheringType: '销售收款',
        prdName: '长租',
        customerName: '李兵强',
        idCard: '610303199812141546',
        phone: '150994568798'
      }, {
        applyType: '销售收款申请',
        step: '进件',
        status: '待提交',
        orderId: '07241700071512',
        orderCreateTime: '2017-12-01 13:56:56',
        gatheringAmt: '8000.00',
        gatheringType: '销售收款',
        prdName: '长租',
        customerName: '李兵强',
        idCard: '610303199812141546',
        phone: '150994568798'
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
