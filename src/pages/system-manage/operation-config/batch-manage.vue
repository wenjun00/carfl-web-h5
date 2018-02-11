<!--批量管理-->
<template>
  <section class="page system-backups">
    <i-row>
      <div class="form-title">批量管理</div>
    </i-row>
    <data-box :columns="columns1" :data="batchList" @onPageChange="getBatchManageList" :page="pageService"></data-box>
    <div class="submitBar">
      <i-row type="flex" align="middle" style="padding:14px">
        <i-col :span="24" style="text-align:right;">
          <i-button class="highButton" @click="batchManage">批量管理</i-button>
        </i-col>
      </i-row>
    </div>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import DataBox from "~/components/common/data-box.vue";
import { PageService } from "~/utils/page.service";
import { Dependencies } from "~/core/decorator";
import { OrderService } from "~/services/business-service/order.service";
import SvgIcon from "~/components/common/svg-icon.vue";
import { Layout } from "~/core/decorator";
import { ScheduleJobService } from "~/services/manage-service/schedule-job.service";

@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class SystemBackups extends Page {
  @Dependencies() private pageService: PageService;
  @Dependencies(ScheduleJobService)
  private scheduleJobService: ScheduleJobService;
  private columns1: any;
  private columns2: any;
  private treeColumns: any;
  private batchList: Array<Object> = [];
  private treeData: Array<Object> = [];
  private treeDatabox: Array<Object> = [];
  private data2: Array<Object> = [];
  private searchOptions: Boolean = false;
  private customName: String = "";
  private openColumnsConfig: Boolean = false;
  private openOneKeyToConnect: Boolean = false;
  private editSysParamsModal: Boolean = false;

  private checkRadio: String = "";
  mounted() {
    this.getBatchManageList();
  }
  created() {
    this.columns1 = [
      {
        title: "操作",
        width: 100,
        align: "center",
        render: (h, { row, column, index }) => {
          return h(
            "i-button",
            {
              props: {
                type: "text"
              },
              style: {
                color: "#265ea2"
              },
              on: {
                click: () => {
                  this.startOrStop(row);
                }
              }
            },
            row.triggerState === "NORMAL" ? "停用" : "启用"
          );
        }
      },
      {
        title: "任务名称",
        key: "jobName",
        align: "center"
      },
      {
        title: "任务所在组",
        key: "jobGroup",
        align: "center"
      },
      {
        title: "任务描述",
        key: "jobDescribe",
        align: "center"
      },
      {
        title: "任务类名",
        key: "jobClassName",
        align: "center"
      },
      {
        title: "触发器名称",
        key: "triggerName",
        align: "center"
      },
      {
        title: "触发器所在组",
        key: "triggerGroup",
        align: "center"
      },
      {
        title: "下次执行时间",
        key: "nextExecutionTime",
        align: "center"
      },
      {
        title: "表达式",
        key: "expression",
        align: "center"
      },
      {
        title: "状态",
        key: "triggerState",
        align: "center",
        render: (h, { row, column, index }) => {
          return h("span", {}, row.triggerState === "NORMAL" ? "启用" : "停用");
        }
      },
      {
        title: "时区",
        key: "timeZone",
        align: "center"
      }
    ];
  }
  getBatchManageList() {
    this.scheduleJobService.queryScheduleJobList(this.pageService).subscribe(
      data => {
        this.batchList = data;
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }
  startOrStop(row) {
    console.log(row, 134);
    if (row.status) {
      // 停用
      this.scheduleJobService
        .pauseScheduleJob({
          jobGroup: row.jobGroup,
          jobName: row.jobName
        })
        .subscribe(
          data => {
            this.$Message.success("停用成功！");
            this.getBatchManageList();
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    } else {
      // 启用
      this.scheduleJobService
        .resumeScheduleJob({
          jobGroup: row.jobGroup,
          jobName: row.jobName
        })
        .subscribe(
          data => {
            this.$Message.success("启用成功！");
            this.getBatchManageList();
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    }
  }
  batchManage() {
    this.$Modal.confirm({
      title: "提示",
      content: "确认进行批量管理？",
      onOk: () => {
        this.scheduleJobService.scheduleJobBatchManager().subscribe(
          data => {
            this.$Message.success("批量管理成功！");
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
      }
    });
  }
  /**
   * 列配置
   */
  columnsConfig() {
    this.openColumnsConfig = true;
  }
  /**
   * 确定
   */
  confirm() {}
  startUse() {}
  stopUse() {}
}
</script>
