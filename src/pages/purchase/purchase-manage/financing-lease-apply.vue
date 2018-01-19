<!--融资租赁申请-->
<template>
  <section class="pageContainer financing-lease-apply specialInput">
    <div class="page">
      <div class="header">
        <div class="form-title">融资租赁申请
          <div style="float:right;margin-right:20px;">
            <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
              <svg-icon iconClass="dayin" style="font-size:24px;"></svg-icon>
              <span style="font-size:12px;" @click="print">打印</span>
            </div>
          </div>
        </div>
      </div>
      <i-row type="flex">
        <i-col span="18">
          <i-form ref="customer-form" :model="customerModel" label-position="left" :rules="customerRule" :label-width="110" style="margin-top:20px;position:relative;left:16px;">
            <i-col span="12">
              <i-form-item label="证件号码" prop="idCard">
                <i-input type="text" v-model="customerModel.idCard" autofocus @on-change="showTab">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="12">
              <i-form-item label="客户姓名" prop="userName">
                <i-input type="text" v-model="customerModel.userName">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="12">
              <i-form-item label="客户电话" prop="phone">
                <i-input type="text" v-model="customerModel.phone">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="12">
              <i-form-item label="归属业务员" prop="worker">
                <i-select>
                  <i-option label="吴小川" value="吴小川" key="吴小川"></i-option>
                </i-select>
              </i-form-item>
            </i-col>
          </i-form>
        </i-col>
        <i-col span="6" style="display: flex;justify-content: center;align-items: center;position:absolute;top:20%;right:18%;" pull="6">
          <i-button class="blueButton" @click="addNewApply">添加新申请</i-button>
        </i-col>
      </i-row>
      <i-tabs type="card" v-model="materialTabs" class="finance-lease-tabs">
        <i-tab-pane label="选购资料" name="choose-buy-materials">
        </i-tab-pane>
        <i-tab-pane label="客户资料" name="customer-materials">
        </i-tab-pane>
        <i-tab-pane label="客户职业" name="customer-job-message">
        </i-tab-pane>
        <i-tab-pane label="客户联系人" name="customer-contacts">
        </i-tab-pane>
        <i-tab-pane label="客户来源" name="customer-origin">
        </i-tab-pane>
        <i-tab-pane label="上传素材" name="upload-the-material">
        </i-tab-pane>
      </i-tabs>
      <div style="height:535px;overflow-y:auto;overflow-x:hidden;">
        <div class="shade" :style="{display:disabledStatus}">
        </div>
        <component :is="materialTabs" :disabledStatus="disabledStatus"></component>
      </div>
      <div class="submitBar">
        <i-row type="flex" align="middle" style="padding:5px">
          <i-col :span="8" push="1">
            <span>申请人：胡开甲</span>
          </i-col>
          <i-col :span="10" pull="4">
            <span>申请时间： 2017-12-01 13:56:45</span>
          </i-col>
          <i-col :span="6" style="text-align:right;position:relative;bottom:6px;">
            <i-button size="large" class="highDefaultButton">保存草稿</i-button>
            <i-button size="large" class="highButton" style="margin-left:10px;" @click="saveAndSubmit">保存并提交</i-button>
          </i-col>
        </i-row>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import ChooseBuyMaterials from "~/components/purchase-manage/choose-buy-materials.vue";
  import CustomerMaterials from "~/components/purchase-manage/customer-materials.vue";
  import CustomerJobMessage from "~/components/purchase-manage/customer-job-message.vue";
  import UploadTheMaterial from "~/components/purchase-manage/upload-the-material.vue";
  import CustomerContacts from "~/components/purchase-manage/customer-contacts.vue";
  import CustomerOrigin from "~/components/purchase-manage/customer-origin.vue";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({
    components: {
      ChooseBuyMaterials,
      CustomerMaterials,
      CustomerJobMessage,
      CustomerOrigin,
      UploadTheMaterial,
      CustomerContacts,
      SvgIcon
    }
  })
  export default class FinancingLeaseApply extends Page {

    private customerRule: Object = {};
    private customerModel: any;
    private addCar: Boolean = false;
    private disabledStatus: String = ''; // 子组件中输入框禁用flag
    private materialTabs: String = 'choose-buy-materials'
    print() {
      window.print()
    }
    created() {
      // 设置表单数据
      this.customerModel = {
        idCard: "",
        userName: ""
      };
    }
    addNewApply() {
      this.$Modal.confirm({
        title: '提示',
        content: '有未提交的申请，确定创建新申请吗？'
      })
    }
    saveAndSubmit() {
      this.customerModel.idCard = ''
      this.customerModel.userName = ''
      this.customerModel.userName = ''
      this.customerModel.phone = ''
      this.customerModel.worker = ''
    }
    showTab() {
      if (this.customerModel.idCard.length === 18) {
        this.disabledStatus = 'none'
      }
    }
  }

</script>

<style lang="less" scope>
  .header {
    border-bottom: 1px solid #cccccc;
  }

  .submitBar {
    line-height: 70px;
    height: 70px;
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    border: 1px solid #ddd;
    box-shadow: -3px 2px 20px #dddddd;
    padding-right: 24px;
  }

  .specialInput {
    .ivu-input {
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0; // width: 257%;
    }
  }

  .financing-lease-apply {
    .ivu-select-selection {
      display: inline-block;
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
      top: 257px;
      z-index: 999;
    }
  }

  .finance-lease-tabs {
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

</style>
