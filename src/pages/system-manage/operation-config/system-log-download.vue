<!--系统日志下载-->
<template>
  <section class="page system-log-download">
    <span class="form-title">系统日志下载</span>
    <i-row style="margin:6px;">
      <span style="margin-left:10px;">操作人：</span>
      <i-input style="display:inline-block;width:10%;" v-model="systemLogModel.realName"></i-input>
      <span style="margin-left:10px;">客户端IP：</span>
      <i-input style="display:inline-block;width:10%;" v-model="systemLogModel.clientIp"></i-input>
      <span style="margin-left:10px;">操作时间：</span>
      <i-date-picker style="display:inline-block;width:10%;" v-model="systemLogModel.startTime"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%;" v-model="systemLogModel.endTime"></i-date-picker>
      <i-button class="blueButton" style="margin-left:10px;" @click="search">搜索</i-button>
      <i-button class="blueButton" style="margin-left:10px;" @click="refreshRoleList">重置</i-button>
      <div style="float:right;margin-right:10px;margin-top:-48px;">
        <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon iconClass="dayin"></svg-icon>
          <span style="font-size: 12px;">打印</span>
        </div>
        <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7" @click="exportLogs">
          <svg-icon iconClass="daochu"></svg-icon>
          <span style="font-size: 12px;">导出</span>
        </div>
      </div>
    </i-row>
    <data-box :id="57" :columns="columns1" :data="systemLogsList" @onPageChange="search" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import DataBox from "~/components/common/data-box.vue";
import SvgIcon from "~/components/common/svg-icon.vue";
import { Dependencies } from "~/core/decorator";
import { Layout } from "~/core/decorator";
import { ManageService } from "~/services/manage-service/manage.service";
import { SystemLogsService } from "~/services/manage-service/system-logs.service";
import { PageService } from "~/utils/page.service";
import { CommonService } from "~/utils/common.service";
import { FilterService } from "~/utils/filter.service";
@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class SystemLogDownload extends Page {
  @Dependencies(ManageService) private manageService: ManageService;
  @Dependencies(SystemLogsService) private systemLogsService: SystemLogsService;
  @Dependencies(PageService) private pageService: PageService;

  private columns1: any;
  private systemLogsList: Array<Object> = [];
  private openColumnsConfig: Boolean = false;
  private columns2: any;
  private test: String = "";
  private systemLogModel: any = {};

  created() {
    this.systemLogModel = {
      clientIp: "",
      exeType: "",
      exeTime: ""
    };
    this.search();

    this.columns1 = [
      {
        type: "selection",
        align: "center",
        width: 60,
        fixed: "left"
      },
      {
        title: "操作时间",
        key: "operateTime",
        editable: true,
        align: "center",
        width: 160,
        render: (h, { row, columns, index }) => {
          return h(
            "span",
            FilterService.dateFormat(row.operateTime, "yyyy-MM-dd hh:mm:ss")
          );
        }
      },
      {
        title: "操作人",
        editable: true,
        key: "realName",
        align: "center"
      },
      {
        title: "客户端IP",
        editable: true,
        key: "clientIp",
        align: "center"
      },
      {
        title: "执行方法",
        editable: true,
        key: "exeMethod",
        align: "center"
      },
      {
        title: "备注",
        editable: true,
        key: "logRemark",
        align: "center"
      },
      {
        title: "请求执行时长（秒）",
        editable: true,
        key: "exeTime",
        align: "center"
      },
      {
        title: "执行类型",
        editable: true,
        key: "exeType",
        align: "center"
      }
    ];
  }
  search() {
    this.systemLogModel.startTime = FilterService.dateFormat(
      this.systemLogModel.startTime,
      "yyyy-MM-dd"
    );
    this.systemLogModel.endTime = FilterService.dateFormat(
      this.systemLogModel.endTime,
      "yyyy-MM-dd"
    );
    this.manageService
      .querySystemLogsPage(this.systemLogModel, this.pageService)
      .subscribe(
        data => {
          this.systemLogsList = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 列配置
   */
  columnsConfig() {
    this.openColumnsConfig = true;
  }
  /**
   * 重置搜索
   */
  refreshRoleList() {
    this.systemLogModel = {
      clientIp: "",
      exeType: "",
      exeTime: ""
    };
  }
  /**
   * 导出系统日志列表
   */
  exportLogs() {
    let databox = this.$refs["databox"] as DataBox;
    let multipleSelection = databox.getCurrentSelection();
    if (multipleSelection && multipleSelection.length) {
      let sysLogsIds = multipleSelection.map(v => v.id);
      this.systemLogsService
        .exportSystemLogs({
          sysLogsIds: sysLogsIds
        })
        .subscribe(
          data => {
            CommonService.downloadFile(data.url, "系统日志下载");
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    } else {
      this.$Message.info("请先选择日志再导出！");
    }
  }
}
</script>

<style lang="less" scope>

</style>
