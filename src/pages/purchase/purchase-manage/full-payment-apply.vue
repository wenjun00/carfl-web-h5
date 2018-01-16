<!--全款销售申请-->
<template>
  <section class="page full-payment-apply specialInput">
    <div class="header">
      <span class="form-title">全款销售申请</span>
      <div style="float:right;margin-top: 10px;margin-right:10px">
        <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon style="font-size:24px;" iconClass="dayin"></svg-icon>
          <span style="font-size:12px;">打印</span>
        </div>
      </div>
    </div>
    <i-row type="flex">
      <i-col span="18">
        <i-form ref="customer-form" :model="applyData" :rules="applyRule" label-position="left" :label-width="110" style="margin-top:20px;position:relative;left:16px;">
          <i-col span="12">
            <i-form-item label="证件号码" prop="idCard">
              <i-input type="text" v-model="applyData.idCard" autofocus placeholder="请输入证件号码" @on-change="showTab">
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
          <i-col span="12" class="belongSalers">
            <i-form-item label="归属业务员" prop="worker">
              <i-select>
                <i-option label="吴小川" value="吴小川" key="吴小川"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-form>
      </i-col>
      <i-col span="6" type="flex" justify="center" style="display: flex;justify-content: center;align-items: center;position:absolute;top:20%;right:18%;"
        pull="6">
        <i-button class="blueButton" @click="addNewApply">添加新申请</i-button>
      </i-col>
    </i-row>
    <i-tabs v-model="materialTabs" type="card">
      <i-tab-pane name="choose-buy-materials-all" label="选购资料">
      </i-tab-pane>
      <i-tab-pane name="customer-materials-all" label="客户资料">
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
          <span style="height:40px;display:inline-block;line-height:3">申请人：胡开甲</span>
        </i-col>
        <i-col :span="10" pull="4">
          <span>申请时间：2017-12-01 13:56:56</span>
        </i-col>
        <i-col :span="6" style="text-align:right;position:relative;bottom:6px;">
          <i-button size="large" class="highDefaultButton">保存草稿</i-button>
          <i-button class="highButton" @click="saveAndSubmit">保存并提交</i-button>
        </i-col>
      </i-row>
    </div>
    <template>
      <i-modal v-model="addCar" title="添加车辆" width="1100" class="customer-lease-tabs">
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

    <template>
      <i-modal :title="addOrEditFlag?'添加车辆':'编辑车辆'" width="1200" v-model="editCarModal" :trandfer="false">
        <add-car></add-car>
        <div slot="footer">
          <i-button @click="confirmAndBack">确认并返回</i-button>
        </div>
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
  import AddCar from "~/components/purchase-manage/add-car.vue"
  import ChooseBuyMaterialsAll from "~/components/purchase-manage/choose-buy-materials-all.vue";
  import CustomerMaterialsAll from "~/components/purchase-manage/customer-materials-all.vue";

  @Layout("workspace")

  @Component({
    components: {
      DataBox,
      SvgIcon,
      AddCar,
      ChooseBuyMaterialsAll,
      CustomerMaterialsAll
    }
  })
  export default class FullPaymentApply extends Page {
    @Dependencies() private pageService: PageService;
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    private applyData: any;
    applyRule: Object = {};

    private columns1: any;
    private columns2: any;
    private data1: Array < Object > = [];
    private data2: Array < Object > = [];
    private categoryData: Array < Object > ;
    private loading: Boolean = false;
    private addCar: Boolean = false;
    private isShown: Boolean = true;
    private editCarModal: Boolean = false;
    private addOrEditFlag: Boolean = false;
    private materialTabs: String = 'choose-buy-materials-all'
    private disabledStatus: String = ''; // 子组件中输入框禁用flag

    addNewApply() {
      this.$Modal.confirm({
        title: '提示',
        content: '有未提交的申请，确定创建新申请吗？'
      })
    }
    created() {
      this.applyData = {
        idCard: '',
        customerName: '',
        phone: '',
        salesManName: ''
      }
      this.columns1 = [{
        title: '操作',
        align: 'center',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h("div", [
            h(
              "i-button", {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.addCar = true;
                  }
                }
              },
              "编辑"
            ),
            h(
              "i-button", {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.data1.forEach((x, i) => {
                      if (i === index) {
                        this.data1.splice(i, 1)
                      }
                    })
                    console.log(this.data1.find((x, i) => i === index))
                    console.log(index)
                  }
                }
              },
              "删除"
            )
          ]);
        }
      }, {
        title: '品牌/型号',
        key: 'columnsName',
        align: 'center'
      }, {
        title: '车身颜色',
        key: 'color',
        align: 'center'
      }, {
        title: '单价（元）',
        key: 'price',
        align: 'center'
      }, {
        title: '数量',
        key: 'amount',
        align: 'center'
      }, {
        title: '车牌号码',
        key: 'carNumber',
        align: 'center'
      }]
      // this.applyQueryService.getFullQueryData().subscribe(({
      //   val
      // }) => {
      //   this.data1 = val
      // })
      this.columns2 = [{
        type: 'selection',
        align: 'center',
        width: 60
      }, {
        title: '车辆品牌',
        key: 'brand',
        align: 'center',
        width: 86
      }, {
        title: '车辆型号',
        key: 'model',
        align: 'center',
        width: 86
      }, {
        title: '车身颜色',
        key: 'color',
        align: 'center',
        width: 86
      }, {
        title: '车辆排量',
        key: 'output',
        align: 'center',
        width: 86
      }, {
        title: '车辆配置',
        key: 'configuration',
        align: 'center'
      }, {
        title: '上牌地区',
        key: 'area',
        align: 'center',
        width: 86
      }, {
        title: '车辆牌照',
        key: 'license',
        align: 'center'
      }, {
        title: '所在门店',
        key: 'store',
        align: 'center'
      }, {
        title: '状态',
        key: 'status',
        align: 'center',
        width: 86
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
    addModalOpen() {
      this.addOrEditFlag = true
      this.editCarModal = true
    }
    /**
    是否显示汽车分类
     */
    showCategory() {
      this.isShown = !this.isShown
    }
    // updateData() {
    //   this.applyQueryService.getFullQueryData().subscribe(({
    //     val
    //   }) => {
    //     this.data1 = val
    //   })
    // }
    saveAndSubmit() {

    }
    showTab() {
      if (this.applyData.idCard.length === 18) {
        this.disabledStatus = 'none'
      }
    }
    confirmAndBack() {
      this.editCarModal = false
      this.applyQueryService.getFullQueryData().subscribe(({
        val
      }) => {
        this.data1 = val
      })
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
    box-shadow: -3px 2px 20px #dddddd;
  }

  .specialInput {
    .ivu-input {
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0; // width: 240%;
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

  .proCity .ivu-select-selection {
    width: 358%;
    display: inline-block;
    border-style: none;
    border-bottom-style: solid;
    border-radius: 0;
  }

  .belongSalers {
    .ivu-select-selection {
      width: 240%;
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

  .full-payment-apply {
    .ivu-select,
    .ivu-select-single {
      width: 100px;
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

  .customer-lease-tabs {
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
