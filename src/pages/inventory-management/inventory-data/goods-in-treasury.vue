<!--押品入库-->
<template>
    <section class="page goods-In-treasury">
        <page-header title="押品入库" hidden-print></page-header>
        <data-form :model="treasuryModel" @on-search="getInTreasuryList" :page="pageService" date-prop="timeSearch">
            <template slot="input">
                <i-form-item prop="assessmentNo" label="订单编号">
                    <i-input placeholder="请输入订单订单编号" v-model="treasuryModel.assessmentNo "></i-input>
                </i-form-item>
                <i-form-item prop="carParams" label="品牌型号">
                    <i-input placeholder="请输入品牌型号" v-model="treasuryModel.carParams"></i-input>
                </i-form-item>
                <i-form-item prop="carNo" label="车牌号码">
                    <i-input placeholder="请输入车牌号码" v-model="treasuryModel.carNo"></i-input>
                </i-form-item>
                <i-form-item prop="frameNo" label="车架号">
                    <i-input placeholder="请输入车架号" v-model="treasuryModel.frameNo"></i-input>
                </i-form-item>
                <i-form-item prop="whetherInclude">
                    <i-checkbox v-model="whetherInclude">包含已提交</i-checkbox>
                </i-form-item>
            </template>
        </data-form>
        <data-box :columns="treasuryColumns" :data="dataSet" :page="pageService"></data-box>

        <template>
            <i-modal width="780" v-model="inventoryModal" title="押品入库" class="mortgage-inventory">
                <mortgage-inventory ref="mortgage-inventory"></mortgage-inventory>
                <div slot="footer">
                    <i-button size="large" type="ghost" class="Ghost" @click="close">取消</i-button>
                    <i-button size="large" type="primary" class="blueButton" @click="confirmInventoryModal">确定</i-button>
                </div>
            </i-modal>
        </template>

        <template>
            <i-modal width="780" v-model="seeInventoryModal" title="入库查看" class="see-mortgage-inventory">
                <see-mortgage-inventory ref="see-mortgage-inventory"></see-mortgage-inventory>
                <div slot="footer">
                    <i-button size="large" type="ghost" class="Ghost" @click="seeInventoryModal=false">关闭</i-button>
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
import { AssessMentPlacingService } from '~/services/manage-service/assess-ment-placing.service'

@Layout('workspace')
@Component({
  components: {
    MortgageInventory,
    SeeMortgageInventory
  }
})
export default class EvaluationTaskPool extends Page {
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(AssessMentPlacingService)
  private assessMentPlacingService: AssessMentPlacingService
  private dataSet: Array<any> = []
  private whetherInclude: Boolean = true
  private inventoryModal: Boolean = false
  private seeInventoryModal: Boolean = false
  private treasuryModel: any = {
    assessmentNo: '', // 订单编号
    carParams: '', // 品牌系列
    carNo: '', // 车牌号码
    frameNo: '', // 车架号
    isPlacing: 0, // 包含已入库
    startTime: '', // 开始时间
    endTime: '', // 结束时间
    timeSearch: '' // 时间搜索
  }
  private treasuryColumns: any = [
    {
      title: '操作',
      align: 'center',
      fixed: 'left',
      render: (h, { row }) => {
          if(row.warehousingStatus == 1198){
            return h('div',[
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
              )
              ,h(
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
          }else{
            return h('div',[
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
      }
    },
    {
      title: '入库状态',
      editable: true,
      key: 'warehousingStatus',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center',
      render: (h, { row }) => {
        return h('span', {}, this.$dict.getDictName(row.warehousingStatus))
      }
    },
    {
      title: '操作时间',
      editable: true,
      sortable: true,
      key: 'warehousingOperateTime',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '操作人',
      editable: true,
      key: 'warehousingOperator',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '订单编号',
      editable: true,
      sortable: true,
      key: 'assessmentNo',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '品牌',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'brandName',
      align: 'center'
    },
    {
      title: '系列',
      editable: true,
      key: 'seriesName',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '车型',
      editable: true,
      key: 'carName',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '车身颜色',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'carColor',
      align: 'center'
    },
    {
      title: '车牌号码',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'carNo',
      align: 'center'
    },
    {
      title: '车架号',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'frameNo',
      align: 'center'
    },
    {
      title: '发动机号',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'engineNo',
      align: 'center'
    }
  ]
   
  /**
   *押品入库订单查询
   */
  getInTreasuryList() {
    this.treasuryModel.isPlacing = this.whetherInclude ? 1 : 0
    this.assessMentPlacingService
      .orderWarehousingSerach(this.treasuryModel, this.pageService)
      .subscribe(
        data => {
          this.dataSet = data
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
  /**
   *  点击入库
   */
  getTreasuryStorage(row) {
    this.inventoryModal = true
    let MortgageInventory = this.$refs['mortgage-inventory'] as MortgageInventory
    MortgageInventory.getInventoryData(row)
    MortgageInventory.getCheckboxList()
  }
  /**
   * 入库点击确定
   */
   confirmInventoryModal(){
    let confirmInventoryModal = this.$refs['mortgage-inventory'] as MortgageInventory
    confirmInventoryModal.sendInventoryData() 
   }
 /**
  * 入库取消
  */
    close(){
    this.inventoryModal = false
    this.getInTreasuryList()
  }


  /**
   *  查看抵押入库
   */
  seeTreasuryStorage(row) {
    this.seeInventoryModal = true
  }

    mounted() {
    this.getInTreasuryList()
  }
}
</script>

<style scoped>

</style>
