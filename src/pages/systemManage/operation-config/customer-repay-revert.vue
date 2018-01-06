<!--客户还款撤销-->
<template>
  <section class="page customer-repay-revert">
    <span class="form-title">客户还款撤销</span>
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
    <data-box :columns="columns1" :data="data1" @rowClick="rowClick"></data-box>
    <!--Model-->
    <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <data-box :columns="columns2" :data="data2"></data-box>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue"
  import DeductRecord from "~/components/system-manage/deduct-record.vue"
  import PurchaseInformation from "~/components/purchase-query/purchase-information.vue";

  import {
    Dependencies
  } from "~/core/decorator";
 import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")

  @Component({
    
    components: {
      DataBox,
      DeductRecord,
      PurchaseInformation
    }
  })
  export default class CustomerRepayRevert extends Page {
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
                  this.$Modal.info({
                    title: '划扣记录',
                    width: '1600',
                    render: h => h(DeductRecord)
                  })
                }
              }
            }, '划扣记录')
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
          title: '订单编号',
          key: 'orderId',
          align: 'center',
          width: '180',
          render: (h, params) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.$Modal.info({
                    width: 900,
                    title: '订单查询',
                    render: h => h(PurchaseInformation)
                  })
                }
              }
            }, 'KB2017101001')
          }
        },
        {
          title: '客户结算号',
          key: 'customerSettleAccountId',
          align: 'center',
          width: '120'
        },
        {
          title: '合同生效日',
          key: 'compactEffectDate',
          align: 'center'
        },
        {
          title: '还款日',
          key: 'repayDate',
          align: 'center'
        },
        {
          title: '代还本金',
          key: 'expectMajorMoney',
          align: 'center',
          width: '90',
        },
        {
          title: '待还利息',
          key: 'expectInterest',
          width: '90',
          align: 'center'
        },
        {
          title: '待还罚息',
          key: 'expectPunishInterest',
          align: 'center'
        },
        {
          title: '利率（%/月）',
          key: 'interestRate',
          align: 'center'
        },
        {
          title: '结算通道',
          key: 'settleAccountChannel',
          align: 'center'
        },
        {
          title: '公司',
          key: 'firm',
          align: 'center'
        }
      ]

      // 获取数据
      this.data1 = [{
        customerName: '陈丽',
        idCard: '610101199411102415',
        phone: '13125653242',
        orderCreateTime: '2017-12-01',
        orderId: 'KB2017101001',
        customerSettleAccountId: '622820190001',
        compactEffectDate: '2017-12-01',
        repayDate: '2017-12-2',
        expectMajorMoney: '800',
        expectInterest: '200',
        expectPunishInterest: '0',
        interestRate: '3.45',
        settleAccountChannel: '汇付',
        firm: '群泰西安'
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
        columnsName: '客户结算号'
      }, {
        columnsName: '合同生效日'
      }, {
        columnsName: '还款日'
      }, {
        columnsName: '代还本金'
      }, {
        columnsName: '待还利息'
      }, {
        columnsName: '待还罚息'
      }, {
        columnsName: '利率（%/月）'
      }, {
        columnsName: '结算通道'
      }, {
        columnsName: '公司'
      }]

    }
    rowClick(row) {
      console.log(888, row)
    }
    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true
    }
  }
</script>

<style lang="less" scope>

</style>