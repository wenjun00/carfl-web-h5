<!--全额销售申请-->
<template>
  <section class="page full-payment-apply specialInput">
    <div class="header">
      <span class="form-title">全额销售申请</span>
      <div style="float:right;margin-top: 10px;margin-right:10px">
        <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon style="font-size:24px;" iconClass="dayin"></svg-icon>
          <span style="font-size:12px;">打印</span>
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
            <i-form-item label="归属业务员" prop="worker">
              <i-input type="text" v-model="applyData.worker" placeholder="请输入归属业务员">
              </i-input>
            </i-form-item>
          </i-col>
          <!--<i-form-item :label-width="0" style="text-align:center">
        <i-button  class="submit_btn blueButton" @click="submitForm">登录</i-button>
      </i-form-item>-->
        </i-form>
      </i-col>
      <i-col span="6" type="flex" justify="center" style="display: flex;justify-content: center;align-items: center;position:absolute;top:20%;right:18%;"
        pull="6">
        <i-button class="blueButton" @click="addNewApply">添加新申请</i-button>
      </i-col>
    </i-row>
    <i-tabs value="purchaseItem" type="card" style="height:76%;overflow-y:auto;background:white">
      <i-tab-pane name="purchaseItem" label="选购资料">
        <div class="form-title">选购信息</div>
        <i-row class="proCity">
          <i-form ref="parchase-form" :model="applyData" :rules="applyRule" :label-width="80">
            <i-col span="12">
              <i-form-item label="申请省份" prop="idCard">
                <i-select style="width:80px;">
                  <i-option label="陕西省" value="陕西省" key="陕西省"></i-option>
                </i-select>
              </i-form-item>
            </i-col>
            <i-col span="12" pull="3">
              <i-form-item label="申请城市" prop="userName">
                <i-select style="width:80px;">
                  <i-option label="西安市" value="西安市" key="西安市"></i-option>
                  <i-option label="宝鸡市" value="宝鸡市" key="宝鸡市"></i-option>
                  <i-option label="咸阳市" value="咸阳市" key="咸阳市"></i-option>
                  <i-option label="渭南市" value="渭南市" key="渭南市"></i-option>
                  <i-option label="铜川市" value="铜川市" key="铜川市"></i-option>
                  <i-option label="榆林市" value="榆林市" key="榆林市"></i-option>
                  <i-option label="延安市" value="延安市" key="延安市"></i-option>
                  <i-option label="汉中市" value="汉中市" key="汉中市"></i-option>
                  <i-option label="安康市" value="安康市" key="安康市"></i-option>
                  <i-option label="商洛市" value="商洛市" key="商洛市"></i-option>
                </i-select>
              </i-form-item>
            </i-col>
            <i-col span="12">
              <i-form-item label="所属公司" prop="phone">
                <i-input></i-input>
              </i-form-item>
            </i-col>
          </i-form>
        </i-row>
        <data-box :columns="columns1" :data="data1" :width="1100"></data-box>
        <div style="height:60px;width:100%;">
        </div>
      </i-tab-pane>
      <i-tab-pane name="customerItem" label="客户资料">
        <span class="form-title">个人信息</span>
        <i-row>
          <i-form ref="parchase-form" :model="applyData" :rules="applyRule" :label-width="80">
            <i-row>
              <i-col span="12" class="bigSelect">
                <i-form-item label="购车方" prop="idCard">
                  <i-select v-model="purchaseData.province">
                    <i-option label="中国人寿" value="中国人寿" key="中国人寿"></i-option>
                    <i-option label="中国平安" value="中国平安" key="中国平安"></i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="12" pull="3" class="bigSelect">
                <i-form-item label="联系电话" prop="userName">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="12">
                <i-form-item label="证件类型" prop="phone">
                  <i-input type="text" v-model="purchaseData.company">
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="12" pull="3">
                <i-form-item label="证件号码" prop="phone">
                  <i-input type="text" v-model="purchaseData.company">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="12">
                <i-form-item label="联系地址" prop="phone">
                  <i-row type="flex">
                    <i-col>
                      <i-select></i-select>
                    </i-col>
                    <i-col>
                      <i-select></i-select>
                    </i-col>
                    <i-col>
                      <i-select></i-select>
                    </i-col>
                  </i-row>
                  <!--<i-row>
                  <i-input placeholder="请具体到门牌号"></i-input>
                </i-row>-->
                </i-form-item>
              </i-col>
              <i-col span="12" pull="3">
                <i-form-item label="邮政编码" prop="phone">
                  <i-input type="text" v-model="purchaseData.company">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="12">
                <i-form-item label="代办服务" prop="phone">
                  <i-checkbox-group>
                    <i-checkbox label="上牌"></i-checkbox>
                    <i-checkbox label="办理保险"></i-checkbox>
                    <i-checkbox label="代缴购置税"></i-checkbox>
                    <i-checkbox label="代缴车船税"></i-checkbox>
                    <i-checkbox label="按揭贷款"></i-checkbox>
                    <i-checkbox label="车辆装潢"></i-checkbox>
                    <i-checkbox label="代缴其他费用"></i-checkbox>
                    <i-checkbox label="其他"></i-checkbox>
                  </i-checkbox-group>
                </i-form-item>
              </i-col>
            </i-row>
          </i-form>
        </i-row>
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
          <i-button size="large" class="highDefaultButton">保存草稿</i-button>
          <i-button class="highButton" @click="saveAndSubmit">保存并提交</i-button>
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
  export default class FullPaymentApply extends Page {
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
    private data1: Array < Object > = [];
    private data2: Array < Object > = [];
    private categoryData: Array < Object > ;
    private loading: Boolean = false;
    private addCar: Boolean = false;
    private isShown: Boolean = true;
    addNewApply() {
      this.$Modal.confirm({
        title: '提示',
        content: '有未提交的申请，确定创建新申请吗？'
      })
    }
    created() {
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
      this.applyQueryService.getFullQueryData().subscribe(({
        val
      }) => {
        this.data1 = val
      })
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
    /**
    是否显示汽车分类
     */
    showCategory() {
      this.isShown = !this.isShown
    }
    updateData() {
      this.applyQueryService.getFullQueryData().subscribe(({
        val
      }) => {
        this.data1 = val
      })
    }
    saveAndSubmit() {

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

</style>
