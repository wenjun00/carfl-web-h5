<!--押品入库-->
<template>
    <section class="page goods-In-treasury">
        <page-header title="押品入库" hidden-print></page-header>
        <data-form :model="treasuryModel">
            <template slot="input">
                <i-form-item prop="orderNumber" label="订单编号">
                    <i-input placeholder="请输入订单订单编号" v-model="treasuryModel.orderNumber "></i-input>
                </i-form-item>
                <i-form-item prop="brandModel" label="品牌型号">
                    <i-input placeholder="请输入品牌型号" v-model="treasuryModel.brandModel"></i-input>
                </i-form-item>
                <i-form-item prop="busNumber" label="车牌号码">
                    <i-input placeholder="请输入车牌号码" v-model="treasuryModel.busNumber"></i-input>
                </i-form-item>
                <i-form-item prop="VIN" label="车架号">
                    <i-input placeholder="请输入车架号" v-model="treasuryModel.VIN"></i-input>
                </i-form-item>
                <i-form-item prop="containsSubmitted">
                    <i-checkbox v-model="treasuryModel.containsSubmitted">包含已提交</i-checkbox>
                </i-form-item>
            </template>
        </data-form>
        <data-box :columns="treasuryColumns" :data="dataSet" :page="pageService"></data-box>

          <template>
            <i-modal  width="780" v-model="inventoryModal" title="押品入库" class="mortgage-inventory">
                <mortgage-inventory ref="mortgage-inventory"></mortgage-inventory>
                <div slot="footer">
                     <i-button size="large" type="ghost" class="Ghost"  @click="inventoryModal=false">取消</i-button>
                    <i-button size="large"  type="primary" class="blueButton"  @click="inventoryModal=false">确定</i-button>
                </div>
            </i-modal>
        </template>

         <template>
            <i-modal  width="780" v-model="seeInventoryModal" title="抵押入库" class="see-mortgage-inventory">
                <see-mortgage-inventory ref="see-mortgage-inventory"></see-mortgage-inventory>
                <div slot="footer">
                     <i-button size="large" type="ghost" class="Ghost"  @click="seeInventoryModal=false">关闭</i-button>
                </div>
            </i-modal>
        </template>
    </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import { Button } from 'iview'
import MortgageInventory from '~/components/base-data/mortgage-inventory.vue'
import SeeMortgageInventory from '~/components/base-data/see-mortgage-inventory.vue'

@Layout('workspace')
@Component({
  components: {
    MortgageInventory,
    SeeMortgageInventory
  }
})
export default class EvaluationTaskPool extends Page {
  @Dependencies(PageService) private pageService: PageService
  private dataSet: Array<any> = []
  private inventoryModal:Boolean = false
  private seeInventoryModal:Boolean = false
  private treasuryModel: any = {
    orderNumber: '', // 订单编号
    brandModel: '', // 品牌系列
    busNumber: '', // 车牌号码
    VIN: '', // 车架号
    containsSubmitted: false //包含已入库
  }
  private treasuryColumns: any = [
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
              },
              on: {
                click: () => {
                  this.getTreasuryStorage(row)
                }
              }
            },
            '入库'
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
              on: {
                click: () => {
                  this.seeTreasuryStorage(row)
                }
              }
            },
            '查看'
          )
        ])
      }
    },
    {
      title: '入库状态',
      editable: true,
      key: 'approvalDealStatus',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '操作时间',
      editable: true,
      sortable: true,
      key: 'dealerName',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '操作人',
      editable: true,
      key: 'applicationType',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '入库门店',
      editable: true,
      key: 'totalPayment',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '订单编号',
      editable: true,
      sortable: true,
      key: 'operatorTime',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '品牌',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName1',
      align: 'center'
    },
    {
      title: '系列',
      editable: true,
      key: 'operatorName2',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '车型',
      editable: true,
      key: 'operatorName3',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '车身颜色',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName4',
      align: 'center'
    },
    {
      title: '车牌号码',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName',
      align: 'center'
    },
    {
      title: '车架号',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName',
      align: 'center'
    },
    {
      title: '发动机号',
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
   *  是否入库
   */
 getTreasuryStorage(row){
    this.inventoryModal = true
 }




  /**
   *  查看抵押入库
   */
  seeTreasuryStorage(row) {
      this.seeInventoryModal = true
  }
}
</script>

<style scoped>

</style>
