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
      <div style="float:right;margin-right:10px;margin-top:10px;">
        <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon iconClass="xiazai"></svg-icon>
          <span style="font-size: 12px;">导出</span>
        </div>
      </div>
    </i-row>
    <data-box :columns="columns1" :data="systemLogsList" @onPageChange="search" :page="pageService"></data-box>
    <!--Model-->
    <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <i-table :columns="columns2" :data="data2"></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>

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
import { PageService } from "~/utils/page.service";
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
  @Dependencies(PageService) private pageService: PageService;

  private columns1: any;
  private systemLogsList: Array<Object> = [];
  private openColumnsConfig: Boolean = false;
  private columns2: any;
  private data2: Array<Object>;
  private test: String = "";
  private systemLogModel: any;

  created() {
    this.systemLogModel = {
      clientIp: "",
      exeType: "",
      exeTime: ""
    };
    this.search();

    this.columns1 = [
      {
        title: "操作时间",
        key: "operateTime",
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
        key: "realName",
        align: "center"
      },
      {
        title: "客户端IP",
        key: "clientIp",
        align: "center"
      },
      {
        title: "执行参数",
        key: "exeParams",
        align: "center"
      },
      {
        title: "备注",
        key: "logRemark",
        align: "center"
      },
      {
        title: "请求执行时长（秒）",
        key: "exeTime",
        align: "center"
      },
      {
        title: "执行类型",
        key: "exeType",
        align: "center"
      }
    ];
    this.columns2 = [
      {
        title: "序号",
        type: "index",
        width: 80,
        align: "center"
      },
      {
        title: "列名",
        key: "columnsName",
        align: "center"
      },
      {
        type: "selection",
        width: 80,
        align: "center"
      }
    ];

    this.data2 = [
      {
        columnsName: "操作时间"
      },
      {
        columnsName: "操作人"
      },
      {
        columnsName: "客户端IP"
      },
      {
        columnsName: "请求执行时长（秒）"
      },
      {
        columnsName: "描述"
      },
      {
        columnsName: "执行方法"
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
}
</script>

<style lang="less" scope>

</style>
