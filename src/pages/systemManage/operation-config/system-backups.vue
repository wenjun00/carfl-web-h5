<!--系统备份-->
<template>
    <section class="page system-backups">
        <i-row>
            <div class="form-title">系统备份</div>
            <span style="margin-left:20px;">mysql文件名：</span>
            <i-input style="display:inline-block;width:10%;" v-model="systemBackUpModel.mysqlName"></i-input>
            <span style="margin-left:20px;">mongodb文件名：</span>
            <i-input style="display:inline-block;width:10%;" v-model="systemBackUpModel.mongdbName"></i-input>
            <span style="margin-left:20px;">备份类型：</span>
            <!--<i-input style="display:inline-block;width:10%;" ></i-input>-->
            <i-select v-model="systemBackUpModel.type" style="display:inline-block;width:10%;" clearable>
                <i-option label="自动" :value="0" :key="0"></i-option>
                <i-option label="手动" :value="1" :key="1"></i-option>
            </i-select>
            <span style="margin-left:20px;">备份时间：</span>
            <i-date-picker type="datetimerange" v-model="backupTimeRange" @on-change="changeBackupTime" @on-clear="clearDateTime"></i-date-picker>
            <i-button style="margin-left:10px;" class="blueButton" @click="getSystemBackupList">搜索</i-button>
            <i-button style="margin-left:10px;" class="blueButton" @click="addNewBackups">新增备份</i-button>
        </i-row>
        <data-box :columns="columns1" :data="systemBackUpList"></data-box>
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
import { ManageService } from "~/services/manage-service/manage.service";
import { FilterService } from "~/utils/filter.service";
@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class SystemBackups extends Page {
  @Dependencies() private pageService: PageService;
  @Dependencies(ManageService) private manageService: ManageService;
  private columns1: any;
  private columns2: any;
  private treeColumns: any;
  private systemBackUpList: Array<Object> = [];
  private treeData: Array<Object> = [];
  private treeDatabox: Array<Object> = [];
  private data2: Array<Object> = [];
  private searchOptions: Boolean = false;
  private customName: String = "";
  private openColumnsConfig: Boolean = false;
  private openOneKeyToConnect: Boolean = false;
  private editSysParamsModal: Boolean = false;
  private checkRadio: String = "";
  private systemBackUpModel: any;
  private backupTimeRange: Array<any> = [];
  activated() {}
  created() {
    this.getSystemBackupList();
    this.systemBackUpModel = {
      mysqlName: "",
      mongdbName: "",
      type: "",
      // backupTimeRange: [],
      startTime: "",
      endTime: ""
    };
    this.columns1 = [
      {
        align: "center",
        type: "index",
        title: "序号",
        width: 60
      },
      {
        title: "操作",
        width: 220,
        align: "center",
        render: (h, { row, column, index }) => {
          return h("div", [
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
                    this.$Message.info("恢复备份成功！");
                  }
                }
              },
              "恢复数据"
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
                    this.$Modal.confirm({
                      title: "提示",
                      content: "确定删除吗？",
                      onOk: () => {
                        this.manageService
                          .deleteSystemBackup({
                            id: row.id
                          })
                          .subscribe(val => {
                            this.$Message.success("删除成功！");
                          });
                      }
                    });
                  }
                }
              },
              "删除备份"
            )
          ]);
        }
      },
      {
        title: "操作人",
        key: "operatorName",
        align: "center"
      },
      {
        title: "操作时间",
        key: "operateTime",
        align: "center",
        render: (h, { row, columns, index }) => {
          return h(
            "span",
            FilterService.dateFormat(row.operateTime, "yyyy-MM-dd hh:mm:ss")
          );
        }
      },
      {
        title: "mysql文件名",
        key: "mysqlName",
        align: "center"
      },
      {
        title: "mongodb文件名",
        key: "mongdbName",
        align: "center"
      },
      {
        title: "备份类型",
        key: "type",
        align: "center",
        render: (h, { row, columns, index }) => {
          if (row.type === 0) {
            return h("span", {}, "自动");
          } else if (row.type === 1) {
            return h("span", {}, "手动");
          }
        }
      }
    ];
  }
  getSystemBackupList() {
    this.manageService
      .querySystemBackupPage(this.systemBackUpModel, this.pageService)
      .subscribe(val => {
        this.systemBackUpList = val.object.list;
      });
  }
  addNewBackups() {
    this.manageService.createSystemBackup().subscribe(val => {
      this.$Message.success("新增备份成功！");
      this.getSystemBackupList();
    });
  }
  /**
   * dateTimeRange的Change事件
   */
  changeBackupTime(val) {
    let startTime, endTime;
    startTime = new Date(val[0]);
    endTime = new Date(val[1]);
    this.systemBackUpModel.startTime = Date.parse(startTime) / 1000;
    this.systemBackUpModel.endTime = Date.parse(endTime) / 1000;
    console.log(
      1234,
      this.systemBackUpModel.startTime,
      this.systemBackUpModel.endTime
    );
  }
  clearDateTime() {
    this.systemBackUpModel.startTime = "";
    this.systemBackUpModel.endTime = "";
  }
}
</script>
