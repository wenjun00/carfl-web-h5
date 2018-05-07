<!--批量管理--> 
<template>
    <section class="page system-backups">
        <page-header title="批量管理" hidden-print hidden-export>
          <i-button @click="addManagement" type="text">新增管理</i-button>
        </page-header>
        <data-box :id="63" :columns="columns1" :data="batchList"  :page="pageService"></data-box>

        <template>
            <i-modal width="780" v-model="addmanagementModal" title="新增管理" class="add-management-list">
                <add-management-list ref="add-management-list"></add-management-list>
                <div slot="footer">
                    <i-button size="large" type="ghost" class="Ghost" @click="addmanagementModal=false">取消</i-button>
                    <i-button size="large" type="primary" @click="addmanagementModal = false">新增</i-button>
                </div>
            </i-modal>
        </template>
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
import {jobService} from '~/services/manage-service/job.service'
import AddManagementList from '~/components/purchase-manage/add-management-list.vue'


@Layout('workspace')
@Component({
  components: {
   AddManagementList
  }
})
export default class SystemBackups extends Page {
  @Dependencies(jobService) private jobService: jobService
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(ScheduleJobService) private scheduleJobService: ScheduleJobService
  private addmanagementModal: Boolean = false
  private columns1: any
  private batchList: Array<Object> = []
  private openColumnsConfig: Boolean = false

  private checkRadio: String = ''
  mounted() {
    this.getPersonalClientList()
  }
  created() {
    this.columns1 = [
      {
        title: '操作',
        align: "center",
        fixed: "left",
        minWidth: this.$common.getColumnWidth(5),
        render: (h, { row }) => {
          return h('div', [
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    // this.addFiles(row);
                  }
                }
              },
              "启用"
            ),
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    // this.addFiles(row);
                  }
                }
              },
              "暂停"
            ),
                h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    // this.addFiles(row);
                  }
                }
              },
              "运行"
            ),
          ])
        }
      },
      {
        title: '任务名',
        editable: true,
        key: 'jobName',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        title: '任务所在组',
        editable: true,
        key: 'jobGroup',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        title: '任务描述',
        editable: true,
        key: 'jobDescribe',
        align: 'center',
        minWidth: this.$common.getColumnWidth(6)
      },
      {
        title: '任务类名',
        editable: true,
        key: 'jobClassName',
        align: 'center',
        minWidth: this.$common.getColumnWidth(12)
      },
      {
        title: '触发器名称',
        editable: true,
        key: 'triggerName',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        title: '触发器所在组',
        editable: true,
        key: 'triggerGroup',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        title: '下次执行时间',
        editable: true,
        key: 'nextExecutionTime',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        title: '表达式',
        editable: true,
        key: 'expression',
        align: 'center',
        minWidth: this.$common.getColumnWidth(5)
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
        minWidth: this.$common.getColumnWidth(4)
      }
    ]
  }
//   getBatchManageList() {
//     this.scheduleJobService.queryScheduleJobList(this.pageService).subscribe(
//       data => {
//         this.batchList = data
//       },
//       ({ msg }) => {
//         this.$Message.error(msg)
//       }
//     )
//   }
//   startOrStop(row) {
//     console.log(row, 134)
//     if (row.status) {
//       // 停用
//       this.scheduleJobService
//         .pauseScheduleJob({
//           jobGroup: row.jobGroup,
//           jobName: row.jobName
//         })
//         .subscribe(
//           data => {
//             this.$Message.success('停用成功！')
//             this.getBatchManageList()
//           },
//           ({ msg }) => {
//             this.$Message.error(msg)
//           }
//         )
//     } else {
//       // 启用
//       this.scheduleJobService
//         .resumeScheduleJob({
//           jobGroup: row.jobGroup,
//           jobName: row.jobName
//         })
//         .subscribe(
//           data => {
//             this.$Message.success('启用成功！')
//             this.getBatchManageList()
//           },
//           ({ msg }) => {
//             this.$Message.error(msg)
//           }
//         )
//     }
//   }
//   batchManage() {
//     this.$Modal.confirm({
//       title: '提示',
//       content: '确认进行批量管理？',
//       onOk: () => {
//         this.scheduleJobService.scheduleJobBatchManager().subscribe(
//           data => {
//             this.$Message.success('批量管理成功！')
//           },
//           ({ msg }) => {
//             this.$Message.error(msg)
//           }
//         )
//       }
//     })
//   }
  /**
   * 列配置
   */
  columnsConfig() {
    this.openColumnsConfig = true
  }
 
  /**
   * 获取列表
   */
  getPersonalClientList() {
      console.log(666666)
    this.jobService
      .list(this.pageService)
      .subscribe(
        data => {
          console.log(data)
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }

  /**
   * 新增管理
   */
  addManagement(){
      this.addmanagementModal= true
  }

  /**
   * 确定
   */
  confirm() {}
  startUse() {}
  stopUse() {}
}
</script>

<style lang="less">
.page.system-backups {
  .submit-bar {
    margin-top: 20px;
  }
  .fixed-container {
    height: 65px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 10;
    text-align: right;
    padding: 10px 20px;
    box-shadow: 0px -5px 10px #ccc;
  }
}
</style>
