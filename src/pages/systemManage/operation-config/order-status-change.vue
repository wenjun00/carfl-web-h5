<!--订单状态变更-->
<template>
  <section class="page order-status-change">
    <span class="form-title">订单状态变更</span>
    <i-row style="margin:6px;">
      <span>客户姓名：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入客户姓名"></i-input>
      <span style="margin-left:10px;">证件号码：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入证件号码"></i-input>
      <span style="margin-left:10px;">联系号码：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入联系号码"></i-input>
      <span style="margin-left:10px;">订单编号：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入订单编号"></i-input>
      <i-button class="blueButton" style="margin-left:10px;">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>
    <!--Model-->
    <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <data-box :columns="columns2" :data="data2"></data-box>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="changeStatusOpen" title="状态变更" width="300">
        <i-select placeholder="请选择状态">
          <i-option label="已删除" value="已删除" key="已删除"></i-option>
          <i-option label="待提交" value="待提交" key="待提交"></i-option>
          <i-option label="待面审" value="待面审" key="待面审"></i-option>
          <i-option label="待复审" value="待复审" key="待复审"></i-option>
          <i-option label="待终审" value="待终审" key="待终审"></i-option>
          <i-option label="待合规" value="待合规" key="待合规"></i-option>
        </i-select>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue"
  import {
    Dependencies
  } from "~/core/decorator";
 import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")

  @Component({
    
    components: {
      DataBox
    }
  })
  export default class OrderStatusChange extends Page {
    private changeStatusOpen: Boolean = false;
    private columns1: any;
    private data1: Array < Object > = [];
    private openColumnsConfig: Boolean = false;
    private columns2: any;
    private data2: Array < Object > ;

    created() {
      this.columns1 = [{
          align: 'center',
          type: 'index',
          width: '60',
          renderHeader: (h, {
            column,
            index
          }) => {
            return h('div', {
              on: {
                click: () => {
                  this.columnsConfig()
                }
              },
              style: {
                cursor: 'pointer'
              }
            }, [
              h('Icon', {
                props: {
                  type: 'gear-b',
                  size: '20'
                }
              })
            ])
          }
        }, {
          title: '操作',
          width: '120',
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              style: {
                color: 'blue'
              },
              on: {
                click: () => {
                  this.changeStatus(row)
                }
              }
            }, '更改状态')
          }
        },
        {
          title: '客户姓名',
          key: 'customerName',
          align: 'center'
        },
        {
          title: '证件号码',
          key: 'idCard',
          align: 'center',
          width: '160'
        },
        {
          title: '联系号码',
          key: 'phone',
          align: 'center'
        },
        {
          title: '订单创建时间',
          key: 'orderCreateTime',
          align: 'center'
        },
        {
          title: '订单编号',
          key: 'orderId',
          align: 'center'
        },
        {
          title: '订单类型',
          key: 'orderType',
          align: 'center'
        },
        {
          title: '产品名称',
          key: 'prdName',
          align: 'center'
        },
        {
          title: '产品期数',
          key: 'prdPeriods',
          align: 'center'
        },
        {
          title: '利率（月）',
          key: 'interestRate',
          align: 'center'
        },
        {
          title: '还款方式',
          key: 'repayWay',
          align: 'center'
        },
        {
          title: '融资总额',
          key: 'totalFinancing',
          align: 'center'
        },
        {
          title: '订单状态',
          key: 'orderStatus',
          align: 'center'
        }
      ]
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
        columnsName: '客户姓名'
      }, {
        columnsName: '证件号码'
      }, {
        columnsName: '联系号码'
      }, {
        columnsName: '订单创建时间'
      }, {
        columnsName: '订单编号'
      }, {
        columnsName: '订单类型'
      }, {
        columnsName: '产品名称'
      }, {
        columnsName: '产品期数'
      }, {
        columnsName: '利率（月）'
      }, {
        columnsName: '还款方式'
      }, {
        columnsName: '融资总额'
      }, {
        columnsName: '订单状态'
      }]
      // 获取数据
      this.data1 = [{
        customerName: '陈丽',
        idCard: '610101199411102415',
        phone: '13125653242',
        orderCreateTime: '2017-12-01',
        orderId: 'KB2017101001',
        orderType: '融资',
        prdName: '群泰融资',
        prdPeriods: '12期',
        interestRate: '3.45',
        repayWay: '等本等息',
        totalFinancing: '15000',
        orderStatus: '面审'
      }]
    }
    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true
    }
    /**
     * 更改状态
     */
    changeStatus(row) {
      this.changeStatusOpen = true
    }
  }
</script>

<style lang="less" scope>

</style>