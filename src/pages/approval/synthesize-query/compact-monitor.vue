<!--合同监控-->  
<template> 
    <section class="page compact-monitor">
        <page-header title="合同下载监控" hiddenPrint hiddenExport></page-header>
        <data-form :model="compactMonitorModel" date-prop="timeSearch" @on-search="getPersonalClientList">
            <template slot="input">
                <i-form-item label="日期：">
                    <i-date-picker v-model="compactMonitorModel.dateRange" type="daterange" placeholder="请选择日期范围"></i-date-picker>
                </i-form-item>
                <i-form-item label="姓名">
                    <i-input v-model="compactMonitorModel.userName" placeholder="请输入员工姓名"></i-input>
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

        <data-box :columns="monitorColumns" :data="dataSet" :page="pageService"></data-box>

        <template>
            <i-modal title="合同下载详情" v-model="compactDownloadInfoModal" :width="1300">
                <compact-download-info ref="compact-download-info"></compact-download-info>
            </i-modal>
        </template>
    </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import DataBox from '~/components/common/data-box.vue'
import PurchaseInformation from '~/components/purchase-manage/purchase-information.vue'
import CompactDownloadInfo from '~/components/approval-manage/compact-download-info.vue'
import { Dependencies } from '~/core/decorator'
import { ContractDownloadService } from '~/services/manage-service/contract-download.service'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    PurchaseInformation,
    CompactDownloadInfo
  }
})
export default class CompactMonitor extends Page {
  @Dependencies(ContractDownloadService)private contractDownloadService: ContractDownloadService
  @Dependencies(PageService) private pageService: PageService
private monitorColumns: any = [
    {
      title: '操作',
      minWidth: this.$common.getColumnWidth(1),
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
                    this.compactDownloadInfoPopup(row)
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
      key: 'deptName',
      minWidth: this.$common.getColumnWidth(3)
    },
    {
      align: 'center',
      title: '员工姓名',
      key: 'userName',
      minWidth: this.$common.getColumnWidth(3)
    },
    {
      align: 'center',
      title: ' 下载量',
      minWidth: this.$common.getColumnWidth(3)
    }
  ]
  private dataSet: Array<Object> = []
  private compactMonitorModel: any = {
    dateRange: [],
    startDate: '', //起始时间
    endDate: '', //结束时间
    userName: '' //姓名
  }
  private compactDownloadInfoModal: Boolean = false

  /**
   * 获取合同下载列表
   */
  getPersonalClientList() {
    this.contractDownloadService
      .getAllContractInfo(this.compactMonitorModel, this.pageService)
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
 * 查看弹窗 userName
 */
  compactDownloadInfoPopup(row){
    this.compactDownloadInfoModal = true
    let compactDownloadInfoPopup = this.$refs['compact-download-info'] as CompactDownloadInfo
    compactDownloadInfoPopup.contractDetails(row.userName)
  }

  mounted() {
    this.getPersonalClientList()
  }
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
