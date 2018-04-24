<!--评估任务池-->
<template>
    <section class="page evaluation-task-pool">
        <page-header title="评估任务池" hidden-print>
            <i-button type="text">批量领取</i-button>
        </page-header>
        <data-form :model="taskpoolModel">
            <template slot="input">
                <i-form-item prop="brandModel" label="品牌型号">
                    <i-input placeholder="请输入品牌、系列" v-model="taskpoolModel.brandModel"></i-input>
                </i-form-item>
                <i-form-item prop="busNumber" label="车牌号码">
                    <i-input placeholder="请输入车牌号码" v-model="taskpoolModel.busNumber"></i-input>
                </i-form-item>
                <i-form-item prop="customerName" label="客户姓名">
                    <i-input placeholder="请输入客户姓名" v-model="taskpoolModel.customerName"></i-input>
                </i-form-item>
            </template>
        </data-form>
        <data-box :columns="taskpoolColumns" :data="dataSet" :page="pageService"></data-box>

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
  private taskpoolModel: any = {
    brandModel: '', //品牌系列
    busNumber: '', // 车牌号码
    customerName: '' // 客户姓名
  }
  private taskpoolColumns:any = [
    {
      type: 'selection',
      align: 'center',
      fixed: 'left',
      width:40,
    },
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
            '领取'
          )
        ])
      }
    },
    {
      title: '评估编号',
      editable: true,
      sortable: true,
      key: 'approvalDealStatus',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '品牌',
      editable: true,
      key: 'dealerName',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '系列',
      editable: true,
      key: 'applicationType',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '车型',
      editable: true,
      key: 'totalPayment',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '颜色',
      editable: true,
      key: 'operatorTime',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '车牌号码',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName1',
      align: 'center'
    },
    {
      title: '车架号',
      editable: true,
      key: 'operatorName2',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '发动机号',
      editable: true,
      key: 'operatorName3',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '客户姓名',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName4',
      align: 'center'
    },
    {
      title: '手机号',
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
