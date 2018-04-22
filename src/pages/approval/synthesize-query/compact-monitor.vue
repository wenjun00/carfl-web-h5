<!--合同监控-->
<template>
    <section class="page compact-monitor">
        <page-header title="合同下载监控" hiddenPrint hiddenExport></page-header>
        <data-form :model="approvalModel" @on-search="getAllOrderList"  :page="pageService" hidden-reset>
            <template slot="input">
                <i-form-item label="日期：">
                    <i-date-picker type="daterange" placeholder="请选择日期范围"></i-date-picker>
                </i-form-item>

                <i-form-item label="姓名">
                    <i-input placeholder="请输入员工姓名"></i-input>
                </i-form-item>
                <i-form-item label="门店">
                    <i-select placeholder="全部门店">
                        <i-option label="吴小川" value="吴小川" key="吴小川"></i-option>
                        <i-option label="黄瑞" value="黄瑞" key="黄瑞"></i-option>
                        <i-option label="祁吉贵" value="祁吉贵" key="祁吉贵"></i-option>
                    </i-select>
                </i-form-item>
            </template>
        </data-form>

        <data-box :columns="columns1" :data="compactList" @onPageChange="getCompactMonitorList" :page="pageService" :noDefaultRow="true"></data-box>

        <template>
            <i-modal title="合同下载详情" v-model="compactDownloadInfoModal" :width="1300">
                <compact-download-info></compact-download-info>
            </i-modal>
        </template>
    </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import DataBox from '~/components/common/data-box.vue'
import Component from 'vue-class-component'
import RepaySum from '~/components/approval-manage/repay-sum.vue'
import PurchaseInformation from '~/components/purchase-manage/purchase-information.vue'
import CompactDownloadInfo from '~/components/approval-manage/compact-download-info.vue'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    RepaySum,
    PurchaseInformation,
    CompactDownloadInfo
  }
})
export default class CompactMonitor extends Page {
  @Dependencies(PageService) private pageService: PageService
  private columns1: any
  private compactList: Array<Object> = []
  private repayInfo: Boolean = false
  private ceshiShow: Boolean = false
  private searchOptions: Boolean = false
  private compactDownloadInfoModal: Boolean = false

  mounted() {
    this.getCompactMonitorList()
  }

  created() {
    this.columns1 = [
      {
        align: 'center',
        type: 'index',
        title: '序号',
        fixed: 'left',
        minWidth: this.$common.getColumnWidth(3),
      },
      {
        title: '操作',
        minWidth: this.$common.getColumnWidth(6),
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
                    this.compactDownloadInfoModal = true
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
        title: '门店',
        key: 'branchAddress',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        align: 'center',
        title: '员工姓名',
        key: 'employeeName',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        align: 'center',
        title: ' 下载量',
        key: 'downloadNum',
        minWidth: this.$common.getColumnWidth(3)
      }
    ]
  }

  openSearch() {
    this.searchOptions = !this.searchOptions
  }

  getCompactMonitorList() {}

  repaySum(row) {}

  trailerCar(row) {}

  /**
   * 查看凭证
   */
  checkProof(row) {}

  getOrderInfoByTime() {}
}
</script>
<style lang="less" scoped>
.page.compact-monitor {
  .seek-day {
    margin-top: 10px;
  }
  .open-search {
    color: #265ea2;
  }
  .data-form {
    margin: 6px;
    .data-form-item {
      &.date-picker {
        display: inline-block;
        width: 10%;
      }
      &.name {
        display: inline-block;
        width: 10%;
      }
      &.store {
        width: 10%;
      }
      &.search-button {
        margin-left: 20px;
      }
    }
  }
}
</style>
