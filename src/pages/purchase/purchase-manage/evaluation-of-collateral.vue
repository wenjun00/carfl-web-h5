<!--押品评估-->
<template>
    <section class="page evaluation-of-collateral">
        <page-header title="押品评估" hiddenPrint></page-header>
        <data-form :model="collateralModel">
            <template slot="input">
                <i-form-item prop="brandModel" label="品牌型号">
                    <i-input placeholder="请输入品牌、系列" v-model="collateralModel.brandModel"></i-input>
                </i-form-item>
                <i-form-item prop="busNumber" label="车牌号码">
                    <i-input v-model="collateralModel.busNumber"></i-input>
                </i-form-item>
                <i-form-item prop="customerName" label="客户姓名">
                    <i-input v-model="collateralModel.customerName"></i-input>
                </i-form-item>
            </template>
        </data-form>
        <data-box :columns="collateralColumns" :data="dataSet" :page="pageService"></data-box>
    </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import DataBox from '~/components/common/data-box.vue'
import SvgIcon from '~/components/common/svg-icon.vue'
@Layout('workspace')
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class EvaluationOfCollateral extends Page {
  @Dependencies(PageService) private pageService: PageService
  private collateralColumns: any
  private dataSet: Array<any> = []
  private status: Boolean = false
  private collateralModel: any = {
    brandModel: '', //品牌系列
    busNumber: '', // 车牌号码
    customerName: '' // 客户姓名
  }
  private collateralColumns = [
    {
      title: '操作',
      align: 'center',
      fixed: 'left',
      minWidth: this.$common.getColumnWidth(3),
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
            '评估'
          ),
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
            '详情'
          )
        ])
      }
    },
    {
      title: '评估编号',
      editable: true,
      sortable: true,
      key: 'approvalDealStatus',
      align: 'center',
      minWidth: this.$common.getColumnWidth(3)
    },
    {
      title: '状态',
      editable: true,
      key: 'dealDate',
      align: 'center',
      minWidth: this.$common.getColumnWidth(3)
    },
    {
      title: '品牌',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'dealerName',
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
      key: 'operatorName',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '车架号',
      editable: true,
      key: 'operatorName',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '发动机号',
      editable: true,
      key: 'operatorName',
      minWidth: this.$common.getColumnWidth(3),
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
      title: '联系电话',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName',
      align: 'center'
    },
    {
      title: '车况级别',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName',
      align: 'center'
    },
    {
      title: '估价',
      editable: true,
      key: 'operatorName',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '评估日期',
      editable: true,
      sortable: true,
      key: 'operatorName',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '估价员',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName',
      align: 'center'
    }
  ]

  mounted() {
      this.dataSet= [
        {approvalDealStatus:'测试'},
        {approvalDealStatus:'测试'},      
        {approvalDealStatus:'测试'},  
        {approvalDealStatus:'测试'},  
        {approvalDealStatus:'测试'},  
        {approvalDealStatus:'测试'}, 
        {approvalDealStatus:'测试'},  
        {approvalDealStatus:'测试'},  
        {approvalDealStatus:'测试'},  
        {approvalDealStatus:'测试'},  
        {approvalDealStatus:'测试'} 
      ]
  }
}
</script>

<style scoped>

</style>
