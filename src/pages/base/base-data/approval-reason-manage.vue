<!--审批原因管理-->
<template>
  <section class="page approval-reason-manage">
    <span style="font-size:18px;font-weight:bold">审批原因管理</span>
    <i-select style="margin-left:10px;width:10%;" placeholder="全部">
      <i-option label="退回" value="退回" key="退回"></i-option>
      <i-option label="拒绝" value="拒绝" key="拒绝"></i-option>
    </i-select>
    <span style="margin-left:10px;">一级：</span>
    <i-input></i-input>
    <span style="margin-left:10px;">二级：</span>
    <i-input></i-input>
    <span style="margin-left:10px;">详细内容：</span>
    <i-input></i-input>
    <i-button class="blueButton" style="margin-left:10px;">搜索</i-button>
    <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;">
      <svg-icon iconClass="daoru"></svg-icon>
      <span>导入</span>
    </div>
    <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;">
      <svg-icon iconClass="xiazai"></svg-icon>
      <span>模版下载</span>
    </div>
    <data-box :columns="columns1" :data="data1"></data-box>

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
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderService
  } from "~/services/business-service/order.service";
import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({
   
    components: {
      DataBox,
      SvgIcon
    }
  })
  export default class ApprovalReasonManage extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private columns2: any;
    private data1: Array < Object > = [];
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private approvalReasonModal: Boolean = false;
    private isDisabled: Boolean = true;
    private fileDataOpen: Boolean = false;

    created() {
      this.columns1 = [{
          title: "序号",
          width: 60,
          type: 'index',
          align: 'center'
        },
        {
          title: "类型",
          key: "type",
          align: 'center'
        },
        {
          title: "一级",
          key: "firstLevel",
          align: 'center'
        },
        {
          title: "二级",
          key: "secondLevel",
          align: 'center'
        },
        {
          title: "CRC编码",
          key: "crcCode",
          align: 'center'
        },
        {
          title: "详细内容",
          key: "detail",
          align: 'center'
        },
        {
          title: "创建人",
          key: "creator",
          align: 'center'
        },
        {
          title: "创建时间",
          key: "createTime",
          align: 'center'
        }
      ]

      this.columns2 = [{
          title: "序号",
          width: 60,
          type: 'index',
          align: 'center'
        },
        {
          title: "一级",
          key: "firstLevel",
          align: 'center'
        },
        {
          title: "二级",
          key: "secondLevel",
          align: 'center'
        },
        {
          title: "CRC编码",
          key: "crcCode",
          align: 'center'
        },
        {
          title: "详细内容",
          key: "detail",
          align: 'center'
        }
      ]

      this.data1 = [{
        type: '退件',
        firstLevel: '退回',
        secondLevel: '进件材料不足',
        crcCode: 'AJJ5',
        detail: '产品不符',
        creator: '李兵强',
        createTime: '2017-12-01 13:56:42'
      }]
      this.data2 = [{
        firstLevel: '退回',
        secondLevel: '进件材料不足',
        crcCode: 'AJJ5',
        detail: '产品不符'
      }]
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
      this.approvalReasonModal = true
    }
    /**
     * selectChange
     */
    changeOption(val) {
      if (val) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    }
    /**
     * 文件选择按钮点击
     */
    checkFile() {
      this.fileDataOpen = true
    }
  }
</script>