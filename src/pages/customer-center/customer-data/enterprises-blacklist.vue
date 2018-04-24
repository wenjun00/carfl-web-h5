<!--企业黑名单-->
<template>
    <section class="page enterprises-blacklist">
        <page-header title="企业黑名单" hidden-print hidden-export> </page-header>
        <data-form :model="blacklistModel" hidden-reset>
            <template slot="input">
                <i-form-item prop="brandModel">
                    <i-input placeholder="请输入客户姓名、证件号" v-model="blacklistModel.customerName"></i-input>
                </i-form-item>
                <i-form-item prop="dateRange" label="日期：">
                    <i-date-picker v-model="blacklistModel.dateRange" type="daterange" placeholder="请选择日期范围"></i-date-picker>
                </i-form-item>
                <i-form-item prop="province" label="省份">
                    <i-select placeholder="选择省" v-model="blacklistModel.province" clearable>
                        <i-option></i-option>
                    </i-select>
                </i-form-item>
                <i-form-item prop="city">
                    <i-select placeholder="选择省" v-model="blacklistModel.city" clearable>
                        <i-option></i-option>
                    </i-select>
                </i-form-item>
                <i-form-item prop="productName " label="产品名称">
                    <i-select placeholder="选择省" v-model="blacklistModel.productName" clearable>
                        <i-option ></i-option>
                    </i-select>
                </i-form-item>
            </template>
        </data-form>
        <data-box :columns="blacklistColumns" :data="dataSet" :page="pageService"></data-box>

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
  private blacklistModel: any = {
    customerName: '', //客户姓名
    dateRange: '', // 日期
    province: '', // 省份
    city: '', // 城市
    productName: '' // 产品名称
  }
  private blacklistColumns: any = [
    {
      title: '操作',
      align: 'center',
      fixed: 'left',
      render: (h, { row }) => {
        return h('div', [
          h(
            'i-button',
            {
              props: {
                type: 'text'
              },
              style: {
                color: '#265EA2'
              }
            },
            '查看'
          )
        ])
      }
    },
    {
      title: '环节',
      editable: true,
      key: 'approvalDealStatus',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '订单状态',
      editable: true,
      key: 'dealerName',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '订单编号',
      editable: true,
      sortable: true,
      key: 'applicationType',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '订单创建时间',
      editable: true,
      key: 'totalPayment',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '滞留天数',
      editable: true,
      key: 'operatorTime',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '省份',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName1',
      align: 'center'
    },
    {
      title: '城市',
      editable: true,
      key: 'operatorName2',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '订单类型',
      editable: true,
      key: 'operatorName3',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '产品名称',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName4',
      align: 'center'
    },
    {
      title: '客户姓名',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName',
      align: 'center'
    },
    {
      title: '证件号码',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName',
      align: 'center'
    },
    {
      title: '手机号码',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName',
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
