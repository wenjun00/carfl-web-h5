<!--审批原因管理-->
<template>
    <section class="page approval-reason-manage">
        <i-row style="margin-top:10px">
            <span style="font-size:18px;font-weight:bold">审批原因管理</span>
            <i-select style="margin-left:10px;width:10%;" placeholder="全部">
                <i-option label="退回" value="退回" key="退回"></i-option>
                <i-option label="拒绝" value="拒绝" key="拒绝"></i-option>
            </i-select>
            <span style="margin-left:10px;">一级：</span>
            <i-input style="width:10%;" v-model="columns1.first"></i-input>
            <span style="margin-left:10px;">二级：</span>
            <i-input style="width:10%;" v-model="columns1.second"></i-input>
            <span style="margin-left:10px;">详细内容：</span>
            <i-input style="width:10%;" v-model="columns1.detail"></i-input>
            <i-button class="blueButton" style="margin-left:10px;" @click="seach">搜索</i-button>
            <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;">
                <span></span>
            </div>
            <div style="float:right;margin-right:10px;margin-top:10px;">
                <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
                    <svg-icon iconClass="daoru" style="font-size:16px;"></svg-icon>
                    <span style="font-size:12px;">导入</span>
                </div>
                <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
                    <svg-icon iconClass="xiazai"></svg-icon>
                    <span>模版下载</span>
                </div>
            </div>
        </i-row>
        <data-box :columns="columns1" :data="AppRoveReasonList"></data-box>

        <template>
            <i-modal v-model="approvalReasonModal" title="审批原因导入" width="800">
                <i-select placeholder="导入类型" style="width:20%" @on-change="changeOption">
                    <i-option label="退件" value="退件" key="退件"></i-option>
                    <i-option label="拒绝" value="拒绝" key="拒绝"></i-option>
                </i-select>
                <i-input style="display:inline-block;width:50%;margin-left:10px;"></i-input>
                <i-button class="blueButton" :disabled="isDisabled" @click="checkFile" style="margin-left:10px">文件选择</i-button>
                <data-box :columns="columns2" :data="data2" v-show="fileDataOpen"></data-box>
            </i-modal>
        </template>
    </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import SvgIcon from "~/components/common/svg-icon.vue";
import { Dependencies } from "~/core/decorator";
import { OrderService } from "~/services/business-service/order.service";
import { Layout } from "~/core/decorator";
import { ApproveReasonService } from "~/services/manage-service/approve.reason.service";
import { PageService } from "~/utils/page.service";
@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class ApprovalReasonManage extends Page {
  @Dependencies(ApproveReasonService)
  private approveReasonService: ApproveReasonService;
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(OrderService) private orderService: OrderService;
  private columns1: any;
  private columns2: any;
  private appReasonModel: any;
  private data2: Array<Object> = [];
  private searchOptions: Boolean = false;
  private approvalReasonModal: Boolean = false;
  private isDisabled: Boolean = true;
  private fileDataOpen: Boolean = false;
  private AppRoveReasonList: Array<Object> = [];

  created() {
    this.columns1 = [
      {
        title: "序号",
        width: 60,
        type: "index",
        align: "center"
      },
      {
        title: "类型",
        key: "type",
        align: "center"
      },
      {
        title: "一级",
        key: "first",
        align: "center"
      },
      {
        title: "二级",
        key: "second",
        align: "center"
      },
      {
        title: "CRC编码",
        key: "crc",
        align: "center"
      },
      {
        title: "详细内容",
        key: "detail",
        align: "center"
      },
      {
        title: "创建人",
        key: "operator",
        align: "center"
      },
      {
        title: "创建时间",
        key: "operatorTime",
        align: "center"
      }
    ];

    this.columns2 = [
      {
        title: "序号",
        width: 60,
        type: "index",
        align: "center"
      },
      {
        title: "一级",
        key: "first",
        align: "center"
      },
      {
        title: "二级",
        key: "second",
        align: "center"
      },
      {
        title: "CRC编码",
        key: "crc",
        align: "center"
      },
      {
        title: "详细内容",
        key: "detail",
        align: "center"
      }
    ];
  }
  getOrderInfoByTime() {}
  openSearch() {
    this.searchOptions = !this.searchOptions;
  }
  exportMonthReport() {}
  /**
   * 导入审批原因
   */
  importApprovalReason() {
    this.approvalReasonModal = true;
  }
  /**
   * selectChange
   */
  changeOption(val) {
    if (val) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }
  /**
   * 文件选择按钮点击
   */
  checkFile() {
    this.fileDataOpen = true;
  }
  seach() {
    this.approveReasonService
      .getAllApproveReason(this.columns1, this.pageService)
      .subscribe(val => {
        this.AppRoveReasonList = val.object.list;
        console.log(this.AppRoveReasonList);
      });
  }
}
</script>
