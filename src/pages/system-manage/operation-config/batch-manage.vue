<!--批量管理-->
<template>
    <section class="page system-backups">
        <page-header title="批量管理" hidden-print hidden-export></page-header>
        <data-box :id="63" :columns="columns1" :data="batchList" @onPageChange="getBatchManageList" :page="pageService"></data-box>
        <div class="submit-bar">
            <i-row type="flex" align="middle">
                <i-col :span="24" class="text-right">
                    <i-button class="high-button" @click="batchManage">批量管理</i-button>
                </i-col>
            </i-row>
        </div>
    </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import DataBox from '~/components/common/data-box.vue'
import { PageService } from '~/utils/page.service'
import { Dependencies } from '~/core/decorator'
import { OrderService } from '~/services/business-service/order.service'
import SvgIcon from '~/components/common/svg-icon.vue'
import { Layout } from '~/core/decorator'
import { ScheduleJobService } from '~/services/manage-service/schedule-job.service'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class SystemBackups extends Page {
  @Dependencies() private pageService: PageService
  @Dependencies(ScheduleJobService)
  private scheduleJobService: ScheduleJobService
  private columns1: any
  private columns2: any
  private treeColumns: any
  private batchList: Array<Object> = []
  private treeData: Array<Object> = []
  private treeDatabox: Array<Object> = []
  private data2: Array<Object> = []
  private searchOptions: Boolean = false
  private customName: String = ''
  private openColumnsConfig: Boolean = false
  private openOneKeyToConnect: Boolean = false
  private editSysParamsModal: Boolean = false

  private checkRadio: String = ''
  mounted() {
    this.getBatchManageList()
  }
  created() {
    this.columns1 = [
      {
        title: '任务名称',
        editable: true,
        key: 'jobName',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3),
      },
      {
        title: '任务所在组',
        editable: true,
        key: 'jobGroup',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3),
      },
      {
        title: '任务描述',
        editable: true,
        key: 'jobDescribe',
        align: 'center',
        minWidth: this.$common.getColumnWidth(6),
      },
      {
        title: '任务类名',
        editable: true,
        key: 'jobClassName',
        align: 'center',
        minWidth: this.$common.getColumnWidth(12),
      },
      {
        title: '触发器名称',
        editable: true,
        key: 'triggerName',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3),
      },
      {
        title: '触发器所在组',
        editable: true,
        key: 'triggerGroup',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3),
      },
      {
        title: '下次执行时间',
        editable: true,
        key: 'nextExecutionTime',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3),
      },
      {
        title: '表达式',
        editable: true,
        key: 'expression',
        align: 'center',
        minWidth: this.$common.getColumnWidth(5),
      },
      {
        title: '状态',
        editable: true,
        key: 'triggerState',
        align: 'center',
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row, column, index }) => {
          return h('span', {}, row.triggerState === 'NORMAL' ? '启用' : '停用')
        }
      },
      {
        title: '时区',
        editable: true,
        key: 'timeZone',
        align: 'center',
        minWidth: this.$common.getColumnWidth(4),
      }
    ]
  }
  getBatchManageList() {
    this.scheduleJobService.queryScheduleJobList(this.pageService).subscribe(
      data => {
        this.batchList = data
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
    )
  }
  startOrStop(row) {
    console.log(row, 134)
    if (row.status) {
      // 停用
      this.scheduleJobService
        .pauseScheduleJob({
          jobGroup: row.jobGroup,
          jobName: row.jobName
        })
        .subscribe(
          data => {
            this.$Message.success('停用成功！')
            this.getBatchManageList()
          },
          ({ msg }) => {
            this.$Message.error(msg)
          }
        )
    } else {
      // 启用
      this.scheduleJobService
        .resumeScheduleJob({
          jobGroup: row.jobGroup,
          jobName: row.jobName
        })
        .subscribe(
          data => {
            this.$Message.success('启用成功！')
            this.getBatchManageList()
          },
          ({ msg }) => {
            this.$Message.error(msg)
          }
        )
    }
  }
  batchManage() {
    this.$Modal.confirm({
      title: '提示',
      content: '确认进行批量管理？',
      onOk: () => {
        this.scheduleJobService.scheduleJobBatchManager().subscribe(
          data => {
            this.$Message.success('批量管理成功！')
          },
          ({ msg }) => {
            this.$Message.error(msg)
          }
        )
      }
    })
  }
  /**
   * 列配置
   */
  columnsConfig() {
    this.openColumnsConfig = true
  }
  /**
   * 确定
   */
  confirm() {}
  startUse() {}
  stopUse() {}
}
</script>

