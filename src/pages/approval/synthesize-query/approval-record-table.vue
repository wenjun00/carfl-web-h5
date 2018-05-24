<!--审核记录查询-->
<template> 
  <section class="page approval-record-table">
    <page-header title="审核记录查询" hiddenPrint hiddenExport></page-header>
    <data-form date-prop="timeSearch" :model="approvalRecordModel" @on-search="getApprovaRecordList" :page="pageService">
      <template slot="input">
        <i-form-item prop="orderNumber" label="订单编号">
          <i-input v-model="approvalRecordModel.orderNumber" placeholder="请输入联系电话"></i-input>
        </i-form-item>
        <i-form-item prop="type" label="审核状态">
          <i-select placeholder="选择状态" v-model="approvalRecordModel.type" @on-change="changeSelectOne" clearable>
            <i-option label="通过" :value="0" :key="0"></i-option>
            <i-option label="退件" :value="374" :key="374"></i-option>
            <i-option label="拒绝" :value="375" :key="375"></i-option>
          </i-select>
        </i-form-item>
        <!-- <i-form-item prop="second" label="通过类型">
          <i-select placeholder="请选择通过类型" v-if="passSelect" v-model="approvalRecordModel.second" clearable>
            <i-option label="通过" :key="310" :value="310"></i-option>
            <i-option label="提交内审/通过" :key="321" :value="321"></i-option>
            <i-option label="灰名单/通过" :key="322" :value="322"></i-option>
          </i-select>
        </i-form-item> -->
        <i-form-item prop="second" label="拒单原因">
          <i-select placeholder="请选择拒单原因" v-if="!passSelect" v-model="approvalRecordModel.second" @on-change="changeSelectTwo" clearable>
            <i-option v-for="item in refuseReason" :key="item.second" :label="item.second" :value="item.second">
              <div :title="item.second">{{ item.second|subOptionLabel}}</div>
            </i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="detail" label="拒单细节">
          <i-select placeholder="请选择拒单细节" v-if="!passSelect" v-model="approvalRecordModel.detail" clearable>
            <i-option v-for="item in refuseDetail" :key="item.detail" :label="item.detail" :value="item.detail">
              <div :title="item.detail">{{item.detail|subOptionLabel}}</div>
            </i-option>
          </i-select>
        </i-form-item>

        <i-form-item prop="dateRange" label="日期">
           <i-date-picker v-model="approvalRecordModel.dateRange" type="daterange" placeholder="请选择日期范围"></i-date-picker>
        </i-form-item>

      </template>
    </data-form>

    <data-box :id="356" :columns="columns1" :data="approvalRecordList" @onPageChange="getApprovaRecordList" :page="pageService"></data-box>

    <!--进度查询-->
    <template>
      <i-modal v-model="orderProgressModal" title="审核进度" :width="76" class="order-progress">
        <order-progress ref="order-progress"></order-progress>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import DataBox from '~/components/common/data-box.vue'
import Component from 'vue-class-component'
import OrderProgress from '~/components/purchase-manage/order-progress.vue'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import { FilterService } from '~/utils/filter.service'
import { CityService } from '~/utils/city.service'
import { ApprovalService } from '~/services/manage-service/approval.service'
import { ApproveReasonService } from '~/services/manage-service/approve-reason.service'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    OrderProgress
  }
})
export default class ApprovalRecordTable extends Page {
  @Dependencies(ApprovalService) private approvalService: ApprovalService
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(ApproveReasonService)
  private approveReasonService: ApproveReasonService
  private columns1: any
  private approvalRecordList: Array<Object> = []
  private searchOptions: Boolean = false
  private roleName: String = ''
  private openCreateCompact: Boolean = false
  private openColumnsConfig: Boolean = false
  private openCompact: Boolean = false
  private checkRadio: String = '融资租赁合同'
  private orderProgressModal: Boolean = false
  private passSelect: Boolean = false // 通过下拉框flag
  private refuseReason: Array<Object> = [] // 拒单原因
  private refuseDetail: Array<Object> = [] // 拒单细节
  private approvalRecordModel: any = {
    orderNumber:'',
    timeSearch: '',
    startTime: '',
    endTime: '',
    type: '',
    second: '',
    detail: '',
    dateRange: []
  }

  mounted() {
    this.getApprovaRecordList()
  }

  created() {
    this.columns1 = [
      {
        title: '操作',
        minWidth: this.$common.getColumnWidth(4),
        fixed: 'left',
        align: 'center',
        render: (h, { row, column, index }) => {
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
                    this.checkOrderProgress(row)
                  }
                }
              },
              '查看'
            )
          ])
        }
      },
      {
        align: 'center',
        title: '审核时间',
        editable: true,
        key: 'approvalDate',
        minWidth: this.$common.getColumnWidth(6),
        render: (h, { row, column, index }) => {
          return h(
            'span',
            FilterService.dateFormat(row.approvalDate, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        align: 'center',
        title: '省份',
        editable: true,
        key: 'province',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h('span', CityService.getCityName(row.province))
        }
      },
      {
        align: 'center',
        title: '城市',
        editable: true,
        key: 'city',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h('span', CityService.getCityName(row.city))
        }
      },
      {
        align: 'center',
        editable: true,
        title: '网点',
        key: 'dot',
        minWidth: this.$common.getColumnWidth(5)
      },
      {
        align: 'center',
        editable: true,
        title: '业务员',
        key: 'salesmanName',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        align: 'center',
        editable: true,
        title: '客户姓名',
        key: 'personalName',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        align: 'center',
        editable: true,
        title: '证件号',
        key: 'idCard',
        minWidth: this.$common.getColumnWidth(6)
      },
      {
        align: 'center',
        editable: true,
        title: '审核状态',
        key: 'approveStatus',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, columns, index }) => {
          return h('span', {}, this.$dict.getDictName(row.approveStatus))
        }
      },
      {
        align: 'center',
        editable: true,
        title: '拒单原因',
        minWidth: this.$common.getColumnWidth(5),
        key: 'refuseResource'
      },
      {
        align: 'center',
        editable: true,
        title: '拒单细节',
        minWidth: this.$common.getColumnWidth(5),
        key: 'refuseDetails'
      },
      {
        align: 'center',
        editable: true,
        title: '备注',
        minWidth: this.$common.getColumnWidth(6),
        key: 'remark'
      },
      {
        align: 'center',
        editable: true,
        title: '审核人员',
        minWidth: this.$common.getColumnWidth(3),
        key: 'approvalPersonal'
      }
    ]
  }

  openSearch() {
    this.searchOptions = !this.searchOptions
  }

  deleteRole(row) { }

  allotRole(row) { }

  dataPower(row) { }

  changeSelectOne(val) {
    if (val === 0) {
      // TODO
      this.passSelect = true
    } else {
      this.passSelect = false
      this.approvalRecordModel.detail = ''
      this.approvalRecordModel.second = ''
      this.approvalRecordModel.type = val
      this.approveReasonService
        .getApproveReasonByCondition(this.approvalRecordModel)
        .subscribe(
        data => {
          this.refuseReason = data
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
        )
    }
  }

  changeSelectTwo(val) {
    this.approvalRecordModel.second = val
    this.approvalRecordModel.detail = ''
    this.approveReasonService
      .getApproveReasonByCondition(this.approvalRecordModel)
      .subscribe(
      data => {
        this.refuseDetail = data
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
      )
  }

  checkOrderProgress(row) {
    this.orderProgressModal = true
    let _orderProgress: any = this.$refs['order-progress']
    _orderProgress.getOrderProgressInfo(row)
  }

  /**
   * 列配置
   */
  columnsConfig() {
    this.openColumnsConfig = true
  }

  getApprovaRecordList() {
    this.approvalService
      .getAuditRecord(this.approvalRecordModel, this.pageService)
      .subscribe(
      data => this.approvalRecordList = data,
      err => this.$Message.error(err)

      )
  }

  getTimeSearch(val) {
    this.approvalRecordModel.startTime = ''
    this.approvalRecordModel.endTime = ''
    this.approvalRecordModel.second = ''
    this.approvalRecordModel.detail = ''
    this.approvalRecordModel.type = ''
    this.approvalRecordModel.timeSearch = val
    this.getApprovaRecordList()
    this.approvalRecordModel.timeSearch = ''
  }
}
</script>

<style lang="less" scoped>
.order-progress {
  .ivu-modal-footer {
    display: none;
  }
}

.page.approval-record-table {
  .command {
    margin-top: 10px;
    .command-item {
      font-size: 18px;
      font-weight: bold;
      position: relative;
      left: 10px;
    }
    .open-search {
      color: #265ea2;
    }
  }

  .data-form {
    margin: 6px;
    position: relative;
    right: 16px;
    .data-form-item {
      &.state {
        margin-left: 20px;
        width: 10%;
      }
      &.type {
        margin-left: 20px;
        width: 12%;
      }
      &.reason {
        margin-left: 20px;
        width: 12%;
        display: inline-block;
      }
      &.detail {
        margin-left: 20px;
        width: 12%;
        display: inline-block;
      }
      &.date-picker {
        display: inline-block;
        width: 10%;
      }
      &.search-button {
        margin-left: 20px;
      }
    }
  }
}
</style>
