<!--押品出库-->
<template>
  <section class="page goods-out-treasury">
    <page-header title="押品出库" hidden-print hidden-export></page-header>
    <data-form :model="goodsOutModel" @on-search="getOutTreasuryList" :page="pageService" date-prop="timeSearch">
      <template slot="input">
        <i-form-item prop="assessmentNo" label="订单编号">
          <i-input v-model="goodsOutModel.assessmentNo"></i-input>
        </i-form-item>
        <i-form-item prop="carParams" label="品牌型号">
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
    <data-box :columns="goodsOutColumns" :data="dataSet" :page="pageService" @onPageChange="getOutTreasuryList"></data-box>

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
  private treasuryModal: Boolean = false
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
                    let dialog = this.$dialog.show({
                      title: '确认出库',
                      footer: true,
                      width: 800,
                      onOk: editFromStorage => {
                        return editFromStorage.confirmTreasury()
                          .then(() => this.getOutTreasuryList())
                          .catch(() => false)
                      },
                      onCancel: () => { },
                      render: h => {
                        return h(EditFromStorage, { props: { id: row.placingId } });
                      }
                    })
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
                    this.$dialog.show({
                      title: '押品出库查看',
                      footer: true,
                      isView: true,
                      width: 800,
                      render: h => h(TreasuryOutTreasury, { props: { id: row.placingId } })
                    })
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
      minWidth: this.$common.getColumnWidth(6),
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
      title: '车型',
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
      minWidth: this.$common.getColumnWidth(6),
      key: 'frameNo',
      align: 'center'
    },
    {
      title: '发动机号',
      editable: true,
      minWidth: this.$common.getColumnWidth(6),
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

