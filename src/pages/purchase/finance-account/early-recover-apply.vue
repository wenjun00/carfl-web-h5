<!--提前收回申请-->
<template>
  <section class="page early-recover-apply specialInput">
    <div class="header">
      <span class="form-title">提前收回申请</span>
      <div style="float:right;margin-top: 10px;margin-right:10px">
        <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon style="font-size:24px;" iconClass="dayin"></svg-icon>
          <span style="font-size:12px;">打印</span>
        </div>
        <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon iconClass="daochu"></svg-icon>
          <span>导出</span>
        </div>
      </div>
    </div>
    <i-row type="flex">
      <i-col span="18">
        <i-form ref="customer-form" :model="applyData" :rules="applyRule" :label-width="80" style="margin-top:20px;">
          <i-col span="12">
            <i-form-item label="证件号码" prop="idCard">
              <i-input type="text" v-model="applyData.idCard" placeholder="请输入证件号码">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="客户姓名" prop="userName">
              <i-input type="text" v-model="applyData.userName" placeholder="请输入客户姓名">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="客户电话" prop="phone">
              <i-input type="text" v-model="applyData.phone" placeholder="请输入客户电话">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="选择订单" prop="worker">
              <i-select v-model="applyData.worker" placeholder="请选择订单">
                <i-option label="2841545" value="2841545" key="2841545"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="收回类型" prop="worker">
              <i-select v-model="applyData.worker" placeholder="请选择收回类型">
                <i-option label="强行收回" value="强行收回" key="强行收回"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item>
              <i-checkbox>是否申请加入黑名单</i-checkbox>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="备注" prop="worker">
              <i-input></i-input>
            </i-form-item>
          </i-col>
        </i-form>
      </i-col>
      <i-col span="6" type="flex" justify="center" style="display: flex;justify-content: center;align-items: center;position:absolute;top:20%;right:18%;"
        pull="6">
        <i-button class="submit_btn blueButton">清空</i-button>
      </i-col>
    </i-row>
    <i-tabs value="purchaseItem" type="card" style="height:76%;overflow-y:auto;background:white">
      <i-tab-pane name="purchaseItem" label="收款明细">
        <i-table :columns="columns1" :data="data1"></i-table>
        <i-button class="blueButton">添加收款项</i-button>
        <div class="form-title">账户信息</div>
        <i-table :columns="columns3" :data="data3"></i-table>
      </i-tab-pane>
      <i-tab-pane name="customerItem" label="上传素材">
        <!--TODO-->
      </i-tab-pane>
    </i-tabs>
    <div class="submitBar">
      <i-row type="flex" align="middle" style="padding:5px">
        <i-col :span="8" push="1">
          <span style="height:40px;display:inline-block;line-height:3">申请人：胡开甲</span>
        </i-col>
        <i-col :span="10" pull="4">
          <span>申请时间：2017-12-01 13:56:56</span>
        </i-col>
        <i-col :span="6" style="text-align:right">
          <i-button class="highDefaultButton">保存草稿</i-button>
          <i-button class="highButton">保存并提交</i-button>
        </i-col>
      </i-row>
    </div>
    <template>
      <i-modal v-model="addCar" title="添加车辆" width="1100">
        <i-row>
          <i-input size="small" style="display:inline-block;width:20%;margin-right:10px" placeholder="请输入关键字"></i-input>
          <i-button class="blueButton">搜索</i-button>
        </i-row>
        <i-row>
          <i-col :span="4" style="border:1px solid #e4e4e4" :class="{open:isShown,close:!isShown}">
            <i-tree :data="categoryData"></i-tree>
          </i-col>
          <i-col :span="20">
            <i-row type="flex" justify="start">
              <i-col class="arrowButton" :span="2">
                <div :class="{arrowDown:!isShown,arrowUp:isShown}" @click="showCategory">＜</div>
              </i-col>
              <i-col span="22" style="overflow:auto">
                <div>
                  <i-table :columns="columns2" :data="data2" border stripe @on-select="multipleSelect"></i-table>
                </div>
              </i-col>
            </i-row>
          </i-col>
        </i-row>
      </i-modal>
    </template>
  </section>
</template>
<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
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

  @Layout("workspace")

  @Component({
    components: {
      DataBox,
      SvgIcon
    }
  })
  export default class EarlyRecoverApply extends Page {
    @Dependencies() private pageService: PageService;
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    private applyData: Object = {
      idNumber: '',
      customerName: '',
      phone: '',
      salesManName: ''
    };
    applyRule: Object = {};
    private purchaseData: Object = {
      province: '',
      city: '',
      company: ''
    };
    private columns1: any;
    private columns2: any;
    private columns3: any;
    private data1: Array < Object > = [];
    private data2: Array < Object > = [];
    private data3: Array < Object > = [];
    private categoryData: Array < Object > ;
    private loading: Boolean = false;
    private addCar: Boolean = false;
    private isShown: Boolean = true;
    created() {
      this.columns1 = [{
        key: 'itemName',
        title: '项目名称',
        align: 'center'
      }, {
        key: 'itemMoney',
        title: '金额',
        align: 'center'
      }]

      this.columns3 = [{
        key: 'accountName',
        align: 'center',
        title: '户名'
      }, {
        key: 'openAccountBank',
        align: 'center',
        title: '开户银行'
      }, {
        key: 'bankCardId',
        align: 'center',
        title: '银行卡号'
      }, {
        key: 'branchBankName',
        align: 'center',
        title: '支行名称'
      }, {
        key: 'thirdCustomId',
        align: 'center',
        title: '第三方客户号'
      }]

      this.data3 = [{
        accountName: '李兵强',
        openAccountBank: '中国建设银行',
        bankCardId: '6227004171150315789',
        branchBankName: '丈八六路支行',
        thirdCustomId: '3456878774154'
      }]

      this.data1 = [{
        itemName: '首付金额',
        itemMoney: '9000'
      }, {
        itemName: '首付月供',
        itemMoney: '9000'
      }, {
        itemName: '合计',
        itemMoney: '18000'
      }]
      this.columns2 = [{
        type: 'selection',
        align: 'center'
      }, {
        title: '车辆品牌',
        key: 'brand',
        align: 'center',
        width: '86'
      }, {
        title: '车辆型号',
        key: 'model',
        align: 'center',
        width: '86'
      }, {
        title: '车身颜色',
        key: 'color',
        align: 'center',
        width: '86'
      }, {
        title: '车辆排量',
        key: 'output',
        align: 'center',
        width: '86'
      }, {
        title: '车辆配置',
        key: 'configuration',
        align: 'center',
        width: '86'
      }, {
        title: '上牌地区',
        key: 'area',
        align: 'center',
        width: '86'
      }, {
        title: '车辆牌照',
        key: 'license',
        align: 'center',
        width: '86'
      }, {
        title: '所在门店',
        key: 'store',
        align: 'center',
        width: '86'
      }, {
        title: '状态',
        key: 'status',
        align: 'center',
        width: '86'
      }]
      this.applyQueryService.addCarQueryData().subscribe(({
        val
      }) => {
        this.data2 = val
        console.log('val', val)
      })
      this.categoryData = [{
        title: '所有品牌',
        expand: true,
        children: [{
            title: '别克',
            expand: true,
            children: [{
                title: '君越'
              },
              {
                title: '昂克赛拉',
                expand: true,
                children: [{
                    title: '君越'
                  },
                  {
                    title: '昂克赛拉'
                  }
                ]
              }
            ]
          },
          {
            title: '大众',
            expand: true,
            children: [{
                title: '英朗'
              },
              {
                title: '帕萨特',
                expand: true,
                children: [{
                    title: '英朗'
                  },
                  {
                    title: '帕萨特'
                  }
                ]
              }
            ]
          }
        ]
      }]
    }
    /**
     * 多选
     */
    multipleSelect(selection) {
      console.log(888, selection)
    }
    /**
    是否显示汽车分类
     */
    showCategory() {
      this.isShown = !this.isShown
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
      width: 240%;
    }
  }

  .bigSelect {
    .ivu-select-selection {
      width: 240%;
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

</style>
