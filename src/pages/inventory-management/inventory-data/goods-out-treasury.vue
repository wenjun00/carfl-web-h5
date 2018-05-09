<!--押品出库--> 
<template>
    <section class="page goods-out-treasury">
        <page-header title="押品出库" hidden-print hidden-export></page-header>
        <data-form :model="goodsOutModel" @on-search="getOutTreasuryList" :page="pageService" date-prop="timeSearch">
            <template slot="input">
                <i-form-item prop="assessmentNo" label="订单编号">
                    <i-input v-model="goodsOutModel.assessmentNo"></i-input>
                </i-form-item>
                <i-form-item prop="carParams" label="品牌系列">
                    <i-input v-model="goodsOutModel.carParams" placeholder="请输入品牌、系列、车型关键字查询"></i-input>
                </i-form-item>
                <i-form-item prop="carNo" label="车牌号码">
                    <i-input v-model="goodsOutModel.carNo"></i-input>
                </i-form-item>
                <i-form-item prop="frameNo" label="车架号">
                    <i-input v-model="goodsOutModel.frameNo"></i-input>
                </i-form-item>
                <i-form-item prop="whetherInclude">
                    <i-checkbox v-model="whetherInclude">包含已出库</i-checkbox>
                </i-form-item>
            </template>
        </data-form>
        <data-box :columns="goodsOutColumns" :data="dataSet" :page="pageService"></data-box>
        <template>
            <i-modal width="780" v-model="inventoryModal" title="确认出库">
                <edit-from-storage ref="edit-from-storage" @close="close"></edit-from-storage>
                <div slot="footer">
                    <i-button size="large" type="ghost" class="Ghost" @click="inventoryModal=false">取消</i-button>
                    <i-button size="large" type="primary" class="blueButton" @click="confirmOut">确定</i-button>
                </div>
            </i-modal>
        </template>
        <template>
          <i-modal width="780" v-model="treasuryModal" title="查看详情">
            <treasury-out-treasury ref="treasury-out-treasury"></treasury-out-treasury>
            <div slot="footer">
              <i-button size="large" type="ghost" class="Ghost" @click="treasuryModal=false">取消</i-button>
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
import EditFromStorage from '~/components/stock/edit-from-storage.vue'
import TreasuryOutTreasury from '~/components/stock/treasury-out-treasury.vue'
import { AssessMentPlacingService } from '~/services/manage-service/assess-ment-placing.service'
import { FilterService } from '~/utils/filter.service'
@Layout('workspace')
@Component({
  components: {
    EditFromStorage,
    TreasuryOutTreasury
  }
})
export default class GoodsOutTreasury extends Page {
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(AssessMentPlacingService)
  private assessMentPlacingService: AssessMentPlacingService
  private dataSet: Array<any> = []
  private goodsOutModel: any = {
    assessmentNo: '', //订单编号
    carParams: '', //品牌系列
    carNo: '', // 车牌号码
    frameNo: '', // 车架号
    isPlacing: 1, // 包含提交
    startDate: '', // 开始时间
    endDate: '', // 结束时间
    timeSearch: ''
  }
  private whetherInclude: Boolean = true
  private inventoryModal: Boolean = false
  private treasuryModal:Boolean = false
  private goodsOutColumns: any = [
    {
      title: '操作',
      align: 'center',
      fixed: 'left',
      minWidth: this.$common.getColumnWidth(3),
      render: (h, { row }) => {
        if (row.placingStatus == 1200) {
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
                    this.getOutTreasuryPopup(row)
                  }
                }
              },
              '出库'
            )
          ])
        } else {
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
                    this.getDetailsPopup(row)
                  }
                }
              },
              '详情'
            )
          ])
        }
      }
    },
    {
      title: '状态',
      editable: true,
      key: 'placingStatus',
      align: 'center',
      minWidth: this.$common.getColumnWidth(3),
      render: (h, { row }) => {
        return h('span', {}, this.$dict.getDictName(row.placingStatus))
      }
    },
    {
      title: '操作日期',
      editable: true,
      sortable: true,
      key: 'placingOperateTime',
      align: 'center',
      minWidth: this.$common.getColumnWidth(3),
      render: (h, { row }) => {
        return h('span', FilterService.dateFormat(row.placingOperateTime, 'yyyy-MM-dd'))
      }
    },
    {
      title: '操作人',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'placingOperator',
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
      key: 'brandName',
      minWidth: this.$common.getColumnWidth(3),
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
      title: '车辆型号',
      editable: true,
      key: 'carName',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '车身颜色',
      editable: true,
      key: 'carColor',
      minWidth: this.$common.getColumnWidth(3),
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
    },
    {
      title: '客户姓名',
      editable: true,
      key: 'ownerName',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '手机号码',
      editable: true,
      key: 'ownPhone',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    }
  ]
  /**
   *押品出库订单查询
   */
  getOutTreasuryList() {
    this.goodsOutModel.isPlacing = this.whetherInclude ? 1 : 0
    this.assessMentPlacingService
      .orderPlacingSerach(this.goodsOutModel, this.pageService)
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
   * 获取押品出库信息
   */
  getOutTreasuryPopup(row) {
    this.inventoryModal = true
    let editFromStorage = this.$refs['edit-from-storage'] as EditFromStorage
    editFromStorage.outTreasury(row)
  }
  /**
   * 确定押品出库
   */
  confirmOut(){
    let editFromStorage = this.$refs['edit-from-storage'] as EditFromStorage
    editFromStorage.confirmTreasury()
  }
  /**
   * 押品出库详情
   */
  getDetailsPopup(row){
    this.treasuryModal = true
    let treasuryOutTreasury = this.$refs['treasury-out-treasury'] as TreasuryOutTreasury
    treasuryOutTreasury.outTreasury(row)
  }
  close(){
    this.inventoryModal = false
    this.getOutTreasuryList()
  }
  mounted() {
    this.getOutTreasuryList()
  }
  activated() {
    this.getOutTreasuryList()
  }
}
</script>

<style lang="less" scoped>

</style>

