<!--企业意向客户-->
<template>
    <section class="page enterprise-formal-customer">
        <page-header title="企业意向客户" hidden-print>
            <i-button type="text">新增客户</i-button>
        </page-header>
        <data-form :model="formalCustomerModel">
            <template slot="input">
                <i-form-item prop="brandModel" label="企业名称">
                    <i-input placeholder="请输入企业名称" v-model="formalCustomerModel.brandModel"></i-input>
                </i-form-item>
                <i-form-item prop="busNumber" label="证件号码">
                    <i-input placeholder="请输入证件号" v-model="formalCustomerModel.busNumber"></i-input>
                </i-form-item>
            </template>
        </data-form>
        <data-box :columns="formalCustomerColumns" :data="dataSet" :page="pageService"></data-box>

    </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import { Button } from 'iview'
@Layout('workspace')
@Component({
  components: {}
})
export default class EvaluationTaskPool extends Page {
  @Dependencies(PageService) private pageService: PageService
  private dataSet: Array<any> = []
  private formalCustomerModel: any = {
    brandModel: '', //企业名称
    busNumber: '', // 证件号码
  }
  private formalCustomerColumns:any = [
    {
      title: '操作',
      align: 'center',
      fixed: 'left',
      render: (h, { row}) => {
        return h('div', [
          h(
            'i-button',
            {
              props: {
                type: 'text'
              },
              style: {
                color: '#265EA2'
              },
            },
            '企业详情'
          ),
           h(
            'i-button',
            {
              props: {
                type: 'text'
              },
              style: {
                color: '#265EA2'
              },
            },
            '领取'
          ),
          h(
            'i-button',
            {
              props: {
                type: 'text'
              },
              style: {
                color: '#265EA2'
              },
            },
            '删除'
          )
        ])
      }
    },
    {
      title: '企业名称',
      editable: true,
      key: 'approvalDealStatus',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '证件类型',
      editable: true,
      key: 'dealerName',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '证件号码',
      editable: true,
      key: 'applicationType',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '联系人',
      editable: true,
      key: 'totalPayment',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '手机号码',
      editable: true,
      key: 'operatorTime',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '意向级别',
      sortable: true,
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName1',
      align: 'center'
    },
    {
      title: '通讯地址',
      editable: true,
      key: 'operatorName2',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '创建时间',
      editable: true,
      sortable: true,
      key: 'operatorName3',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '归属业务员',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName4',
      align: 'center'
    }
  ]

  mounted() {
    this.dataSet = [
      {
        approvalDealStatus: '用户客户号'
      },
      {
        approvalDealStatus: '用户客户号'
      },
      {
        approvalDealStatus: '用户客户号'
      },
      {
        approvalDealStatus: '用户客户号'
      },
      {
        approvalDealStatus: '用户客户号'
      },
      {
        approvalDealStatus: '用户客户号'
      },
      {
        approvalDealStatus: '用户客户号'
      }
    ]
  }

  /**
   *  领取
   */
  receive(row) {}
}
</script>

<style scoped>

</style>
