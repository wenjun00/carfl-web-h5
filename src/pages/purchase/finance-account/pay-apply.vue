<!--付款申请-->
<template>
  <section class="page payt-apply specialInput">
    <div class="header">
      <span class="form-title">付款申请</span>
      <div style="float:right;margin-top: 10px;margin-right:10px">
        <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon style="font-size:24px;" iconClass="dayin"></svg-icon>
          <span style="font-size:12px;">打印</span>
        </div>
        <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon iconClass="daochu"></svg-icon>
          <span style="font-size: 12px;">导出</span>
        </div>
      </div>
    </div>
    <i-row type="flex">
      <i-col span="18">
        <i-form ref="customer-form" :model="applyData" :rules="applyRule" :label-width="80" style="margin-top:20px;">
          <i-col span="12">
            <i-form-item label="证件号码" prop="certificateNumber">
              <i-input type="text" v-model="applyData.certificateNumber" placeholder="请输入证件号码" @on-change="showTab">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="客户姓名" prop="name">
              <i-input type="text" v-model="applyData.name" @on-blur="searchInfo" placeholder="请输入客户姓名">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="客户电话" prop="mobileNumber">
              <i-input type="text" v-model="applyData.mobileNumber" placeholder="请输入客户电话">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="选择订单">
              <i-select v-model="applyData.orderNumber" placeholder="请选择订单" @on-change="changeOrder($event)">
                <i-option v-for="item in orderList" :value="item.orderNumber" :label="item.orderNumber" :key="item.orderId"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="付款类型">
              <i-select v-model="applyData.worker" placeholder="请选择订单">
                <i-option label="2841545" value="2841545" key="2841545"></i-option>
                <i-option label="2841546" value="2841546" key="2841546"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="备注">
              <i-input type="text" style="width:77%;" v-model="applyData.phone" placeholder="请输入备注">
              </i-input>
            </i-form-item>
          </i-col>
        </i-form>
      </i-col>
      <i-col span="6" type="flex" justify="center" style="display: flex;justify-content: center;align-items: center;position:absolute;top:20%;right:18%;"
        pull="6">
        <i-button class="blueButton">清空</i-button>
      </i-col>
    </i-row>
    <i-tabs v-model="materialTabs" type="card" class="early-pay-tabs">
      <i-tab-pane name="pay-detail" label="付款明细">
        <pay-detail ref="payDetail"></pay-detail>
      </i-tab-pane>
      <i-tab-pane name="upload-the-material" label="上传素材">
      </i-tab-pane>
    </i-tabs>
    <div style="height:479px;overflow-y:auto;overflow-x:hidden;">
      <div class="shade" :style="{display:disabledStatus}">
      </div>
      <!--<component :is="materialTabs" :childMessage="childMessage" :disabledStatus="disabledStatus"></component>-->
    </div>
    <div class="submitBar">
      <i-row type="flex" align="middle" style="padding:5px">
        <i-col :span="8" push="1">
          <span style="height:40px;display:inline-block;line-height:3">申请人：administrator</span>
        </i-col>
        <i-col :span="10" pull="4">
          <span>申请时间：2017-12-01 13:56:56</span>
        </i-col>
        <i-col :span="6" style="text-align:right;position:relative;bottom:6px;">
          <i-button class="highDefaultButton">保存草稿</i-button>
          <i-button class="highButton">保存并提交</i-button>
        </i-col>
      </i-row>
    </div>
    <!--编辑收款项-->
    <template>
      <i-modal v-model="modifyGatherItemModal" title="编辑收款项" width="300">
        <modify-gather-item></modify-gather-item>
      </i-modal>
    </template>

    <!--变更收款项-->
    <template>
      <i-modal v-model="changeGatherItemModal" title="变更收款项">
        <change-gather-item></change-gather-item>
      </i-modal>
    </template>
  </section>
</template>
<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import {
    RefundApplicationService
  } from "~/services/manage-service/refund.application.service";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    ApplyQueryService
  } from "~/services/business-service/apply-query.service";
  import DataBox from "~/components/common/data-box.vue";
  import {
    PageService
  } from "~/utils/page.service";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {
    Layout
  } from "~/core/decorator";
  import UploadTheMaterial from "~/components/purchase-manage/upload-the-material.vue";
  import ModifyGatherItem from "~/components/purchase-manage/modify-gather-item.vue";
  import ChangeGatherItem from "~/components/purchase-manage/change-gather-item.vue";
  import PayDetail from "~/components/purchase-manage/pay-detail.vue";

  @Layout("workspace")

  @Component({
    components: {
      DataBox,
      SvgIcon,
      UploadTheMaterial,
      ModifyGatherItem,
      ChangeGatherItem,
      PayDetail
    }
  })
  export default class PayApply extends Page {
    @Dependencies(RefundApplicationService) private refundApplicationService: RefundApplicationService;
    @Dependencies(PageService) private pageService: PageService;
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    private applyData: any
    applyRule: Object = {};
    private purchaseData: Object = {
      province: '',
      city: '',
      company: ''
    };
    private data1: Array < Object > = [];
    private data2: Array < Object > = [];
    private data3: Array < Object > = [];
    private categoryData: Array < Object > ;
    private loading: Boolean = false;
    private addCar: Boolean = false;
    private isShown: Boolean = true;
    private modifyGatherItemModal: Boolean = false;
    private changeGatherItemModal: Boolean = false;
    private materialTabs: String = 'pay-detail'
    private disabledStatus: String = ''; // 子组件中输入框禁用flag
    private orderList: Array < Object > = [];
    created() {
      this.applyData = {
        orderNumber: '',
        name: '',
        certificateNumber: '',
        mobileNumber: ''
      }
    }
    /**
     * 证件号、订单号、客户姓名查询订单/账户/付款信息
     */
    getAllMessage() {
      this.refundApplicationService.getAllMessageByParams(this.applyData).subscribe(val => {
        if (val.object.length === 1) {
          console.log(val.object[0])
          let _message: any = this.$refs['payDetail']
          _message.refresh(val.object[0])
        } else if (val.object.length > 1) {
          for (let item of val.object) {
            this.orderList.push(item)
          }
        }
      })
    }
    /**
     * 输入姓名搜索
     */
    searchInfo() {
      this.getAllMessage()
    }
    /**
     * 多选
     */
    changeOrder(item) {
      for (let i in this.orderList) {
        console.log(i, this.orderList[i])
        if (this.orderList[i].orderNumber == item) {
          let _message: any = this.$refs['payDetail']
          _message.refresh(this.orderList[i])
        }
      }

    }
    multipleSelect(selection) {}
    modifyGatherItem() {
      this.modifyGatherItemModal = true
    }
    /**
     * 变更收款项
     */
    changeGatherItem() {
      this.changeGatherItemModal = true
    }
    /**
     * 根据证件号码搜索
     */
    showTab() {
      if (this.applyData.certificateNumber.length === 18) {
        this.disabledStatus = 'none'
        this.getAllMessage()
      }
    }
  }

</script>

<style lang="less" scope>
  .header {
    border-bottom: 1px solid #cccccc;
  }

  .open {
    max-width: auto;
    overflow: hidden;
  }

  .close {
    max-width: 0;
    min-width: 0;
    overflow: hidden;
  }

  .case-list {
    position: fixed;
    right: 0px;
    top: 0px;
    background: #fff;
    z-index: 2000;
    width: 368px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    height: 100%;
  }

  .case-list.flag {
    right: -348px;
    box-shadow: none;
    background: none;
  }

  .arrowUp {
    transform: rotate(0deg); // transition: transform ease-in 0.2s;
  }

  .arrowDown {
    transform: rotate(180deg); // transition: transform ease-in 0.2s;
  }

  .arrowButton {
    line-height: 570px;
    height: 100%;
    background: #e4e4e4;
    text-align: center;
    width: 30px;
  }

  .submitBar {
    height: 70px;
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    border: 1px solid #ddd;
  }

  .specialInput {
    .ivu-input {
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

  .bigSelect {
    .ivu-select-selection {
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

  .early-pay-tabs {
    .ivu-tabs-bar {
      border-bottom: 1px solid #DDDEE1;
      .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
        margin: 0;
        margin-right: 4px;
        padding: 5px 16px 4px;
        border: 1px solid #dddee1;
        border-bottom: 0;
        border-radius: 4px 4px 0 0;
        transition: all .3s ease-in-out;
      }
    }
  }

  .early-payment-apply {
    .ivu-select-selection {
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
    .shade {
      width: 98%;
      height: 666px;
      background: rgba(250, 250, 250, 0.4);
      position: absolute;
      left: 21px;
      top: 315px;
      z-index: 999;
    }
  }

</style>
