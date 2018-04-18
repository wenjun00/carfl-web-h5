<!--提前收回申请-->
<template>
  <section class="page early-recover-apply special-input">
    <div class="header">
      <span class="form-title">提前收回申请</span>
      <div class="command">
        <div class="command-item">
          <svg-icon iconClass="dayin"></svg-icon>
          <span>打印</span>
        </div>
        <div class="command-item">
          <svg-icon iconClass="daochu"></svg-icon>
          <span>导出</span>
        </div>
      </div>
    </div>
    <i-row type="flex">
      <i-col :span="18">
        <i-form ref="customer-form" :model="applyData" :rules="applyRule" :label-width="80">
          <i-row>
            <i-col :span="12">
              <i-form-item label="证件号码" prop="idCard">
                <i-input type="text" v-model="applyData.idCard" placeholder="请输入证件号码" @on-change="showTab1" :maxlength="18">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col :span="12">
              <i-form-item label="客户姓名" prop="customerName">
                <i-input type="text" v-model="applyData.customerName" placeholder="请输入客户姓名" @on-blur="showTab2">
                </i-input>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col :span="12">
              <i-form-item label="客户电话" prop="mobileMain">
                <i-input type="text" v-model="applyData.mobileMain" placeholder="请输入客户电话" @on-blur="showTab3" :maxlength="11">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col :span="12">
              <i-form-item label="选择订单" prop="orderId">
                <i-select v-model="applyData.orderId" placeholder="请选择订单" @on-change="selectOrder">
                  <i-option v-for="item in orderNumberIdModels" :key="item.orderId" :value="item.orderId" :label="item.orderNumber"></i-option>
                </i-select>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>

            <i-col :span="12">
              <i-form-item label="收回类型" prop="withdrawType">
                <i-select v-model="applyData.withdrawType" placeholder="请选择收回类型">
                  <i-option v-for="{value,label} in $dict.getDictData('0117')" :key="value" :label="label" :value="value"></i-option>
                </i-select>
              </i-form-item>
            </i-col>
            <i-col :span="12" :pull="1">
              <!--<i-form-item prop="isAddToBlackList">
                <i-checkbox v-model="applyData.isAddToBlackList" value="1" label="1">是否申请加入黑名单</i-checkbox>
              </i-form-item>-->
            </i-col>
          </i-row>
          <i-col :span="24">
            <i-form-item label="备注" prop="remark">
              <i-input style="width:77%" v-model="applyData.remark" placeholder="请输入备注"></i-input>
            </i-form-item>
          </i-col>
        </i-form>
      </i-col>
      <i-button class="blueButton clear-button" @click="clearAll">清空</i-button>
    </i-row>
    <i-tabs v-model="materialTabs" type="card" class="early-recover-tabs">
      <i-tab-pane name="gather-detail-early-pay" label="收款明细">
        <gather-detail-early-pay :checkOrderId="checkOrderId" :typeData="typeData" ref="gather-detail-early-pay"></gather-detail-early-pay>
      </i-tab-pane>
      <i-tab-pane name="upload-the-fodder" label="上传素材">
        <upload-the-fodder ref="upload-the-fodder"></upload-the-fodder>
      </i-tab-pane>
    </i-tabs>
    <div class="shade" :style="{display:disabledStatus}">
    </div>
    <div class="submit-bar">
      <i-row class="submit-bar-item" type="flex" align="middle">
        <i-col :span="8" push="1">
          <span>申请人：{{applyPerson}}</span>
        </i-col>
        <i-col :span="12" pull="4">
          <span>申请时间：{{applyTime}}</span>
        </i-col>
        <i-col :span="4">
          <i-button class="highDefaultButton" @click="saveDraftClick" :disabled="type">保存草稿</i-button>
          <i-button class="highButton" @click="saveAndCommit">保存并提交</i-button>
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
  import Page from '~/core/page';
  import Component from 'vue-class-component';
  import {
    Dependencies
  } from '~/core/decorator';
  import {
    ApplyQueryService
  } from '~/services/business-service/apply-query.service';
  import {
    WithdrawApplicationService
  } from '~/services/manage-service/withdraw-application.service';
  import DataBox from '~/components/common/data-box.vue';
  import {
    PageService
  } from '~/utils/page.service';
  import SvgIcon from '~/components/common/svg-icon.vue';
  import {
    Layout
  } from '~/core/decorator';
  import UploadTheFodder from "~/components/purchase-manage/upload-the-fodder.vue";
  import ChangeGatherItem from '~/components/purchase-manage/change-gather-item.vue';
  import ModifyGatherItem from '~/components/purchase-manage/modify-gather-item.vue';
  import GatherDetailEarlyPay from '~/components/purchase-manage/gather-detail-early-pay.vue';

  @Layout('workspace')
  @Component({
    components: {
      DataBox,
      SvgIcon,
      UploadTheFodder,
      ChangeGatherItem,
      ModifyGatherItem,
      GatherDetailEarlyPay,
    },
  })
  export default class EarlyRecoverApply extends Page {
    @Dependencies() private pageService: PageService;
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    @Dependencies(WithdrawApplicationService) private withdrawApplicationService: WithdrawApplicationService;

    private applyData: any = {
      idCard: '',
      customerName: '',
      mobileMain: '',
      orderId: '',
      withdrawType: '', // 收回类型
      remark: '', // 备注
      isAddToBlackList: []
    };
    private applyRule: Object = {
      idCard: [{
          required: true,
          message: '请输入证件号码',
          trigger: 'blur',
        },
        {
          validator: this.$validator.idCard,
          trigger: "blur"
        }
      ],
      customerName: [{
        required: true,
        message: '请输入客户姓名',
        trigger: 'blur',
      }],
      mobileMain: [{
          required: true,
          message: '请输入客户电话',
          trigger: 'blur',
        },
        {
          validator: this.$validator.phoneNumber,
          trigger: "blur"
        }
      ],
      //   orderId: [{
      //     required: true,
      //     message: '请选择订单',
      //     trigger:'change'
      //   }],
      withdrawType: [{
        required: true,
        message: '请选择收回类型',
        trigger: 'change',
        type: 'number'
      }]

    };
    private purchaseData: Object = {
      province: '',
      city: '',
      company: '',
    };
    private applyPerson: String = ""; // 申请人
    private applyTime: String = ""; // 申请时间
    private columns1: any;
    private columns2: any;
    private columns3: any;
    private data1: Array < Object > = [];
    private data2: Array < Object > = [];
    private data3: Array < Object > = [];
    private checkOrderId: Number = 0;
    private personalId: Number = 0;
    private categoryData: Array < Object > ;
    private loading: Boolean = false;
    private addCar: Boolean = false;
    private isShown: Boolean = true;
    private changeGatherItemModal: Boolean = false;
    private modifyGatherItemModal: Boolean = false;
    private materialTabs: String = 'gather-detail-early-pay';
    private disabledStatus: String = ""; // 子组件中输入框禁用flag
    private orderNumberIdModels: Array < Object > = [];
    private orderIdModels: any = {};
    private single: Boolean = false;
    private type: Boolean = false;
    private typeData: Boolean = true;
    private msg: any = '';
    private saveDraftModel: any = {
      addFinanceUploadResources: [], // 新增上传资料列表
      delFinanceUploadResources: [], // 删除上传资料Id列表
      financeUploadResources: [], // 上传素材相关信息
      accountName: "",
      advancePayoffFee: 0, // 提前结清手续费
      id: "", // 申请id
      orderId: "", // 订单id
      otherFee: 0,
      surplusManageFee: 0, // 剩余管理费
      surplusPenalty: 0, // 剩余罚息
      surplusPenaltyFreeze: 0, // 剩余冻结罚金
      surplusPrincipal: 0, // 剩余本金
      totalPayment: 0, // 收款总额
      remark: "", // 备注
      withdrawType: ''
    };

    created() {
      this.applyPerson = this.$store.state.userData.username;
      let time = new Date();
      this.applyTime =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1) +
        "-" +
        time.getDate() +
        " " +
        time.getHours() +
        ":" +
        time.getMinutes() +
        ":" +
        time.getSeconds();
      this.columns1 = [{
          title: '操作',
          width: 240,
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            if (row.itemName !== '合计') {
              return h('div', [
                h(
                  'i-button', {
                    props: {
                      type: 'text',
                    },
                    style: {
                      color: '#265EA2',
                    },
                    on: {
                      click: () => {
                        this.modifyGatherItem();
                      },
                    },
                  },
                  '编辑'
                ),
                h(
                  'i-button', {
                    props: {
                      type: 'text',
                    },
                    style: {
                      color: '#265EA2',
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '提示',
                          content: '确定删除吗？',
                          onOk: () => {
                            this.data1.forEach((x, i) => {
                              if (i === index) {
                                this.data1.splice(i, 1);
                              }
                            });
                          },
                        });
                      },
                    },
                  },
                  '删除'
                ),
              ]);
            }
          },
        },
        {
          key: 'itemName',
          title: '项目名称',
          align: 'center',
        },
        {
          key: 'itemMoney',
          title: '金额',
          align: 'center',
        },
      ];

      this.columns3 = [{
          key: 'accountName',
          align: 'center',
          title: '户名',
        },
        {
          key: 'openAccountBank',
          align: 'center',
          title: '开户银行',
        },
        {
          key: 'bankCardId',
          align: 'center',
          title: '银行卡号',
        },
        {
          key: 'branchBankName',
          align: 'center',
          title: '支行名称',
        },
        {
          key: 'thirdCustomId',
          align: 'center',
          title: '第三方客户号',
        },
      ];

      this.data3 = [{
        accountName: '李兵强',
        openAccountBank: '中国建设银行',
        bankCardId: '6227004171150315789',
        branchBankName: '丈八六路支行',
        thirdCustomId: '3456878774154',
      }, ];

      this.data1 = [{
          itemName: '首付金额',
          itemMoney: '9000',
        },
        {
          itemName: '首付月供',
          itemMoney: '9000',
        },
        {
          itemName: '合计',
          itemMoney: '18000',
        },
      ];
      this.columns2 = [{
          type: 'selection',
          align: 'center',
        },
        {
          title: '车辆品牌',
          key: 'brand',
          align: 'center',
          width: '86',
        },
        {
          title: '车辆型号',
          key: 'model',
          align: 'center',
          width: '86',
        },
        {
          title: '车身颜色',
          key: 'color',
          align: 'center',
          width: '86',
        },
        {
          title: '车辆排量',
          key: 'output',
          align: 'center',
          width: '86',
        },
        {
          title: '车辆配置',
          key: 'configuration',
          align: 'center',
          width: '86',
        },
        {
          title: '上牌地区',
          key: 'area',
          align: 'center',
          width: '86',
        },
        {
          title: '车辆牌照',
          key: 'license',
          align: 'center',
          width: '86',
        },
        {
          title: '所在门店',
          key: 'store',
          align: 'center',
          width: '86',
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          width: '86',
        },
      ];
      // this.applyQueryService.addCarQueryData().subscribe(({
      //   val
      // }) => {
      //   this.data2 = val
      // })
      this.categoryData = [{
        title: '所有品牌',
        expand: true,
        children: [{
            title: '别克',
            expand: true,
            children: [{
                title: '君越',
              },
              {
                title: '昂克赛拉',
                expand: true,
                children: [{
                    title: '君越',
                  },
                  {
                    title: '昂克赛拉',
                  },
                ],
              },
            ],
          },
          {
            title: '大众',
            expand: true,
            children: [{
                title: '英朗',
              },
              {
                title: '帕萨特',
                expand: true,
                children: [{
                    title: '英朗',
                  },
                  {
                    title: '帕萨特',
                  },
                ],
              },
            ],
          },
        ],
      }, ];
    }
    /**
     * 多选
     */
    multipleSelect(selection) {}
    /**
    是否显示汽车分类
     */
    showCategory() {
      this.isShown = !this.isShown;
    }
    /**
     * 变更收款项
     */
    changeGatherItem() {
      this.changeGatherItemModal = true;
    }
    modifyGatherItem() {
      this.modifyGatherItemModal = true;
    }
    /**
     * 清空
     */
    clearAll() {
      this.$Modal.confirm({
        title: "提示",
        content: "您有未保存的提前结清申请,清空会删除页面内容，是否确认清空申请内容！",
        onOk: () => {
          this.resetAll();
          // 显示遮罩
          this.disabledStatus = "block";
          // 清空orderId
          this.checkOrderId = 0;
        }
      });
    }
    /**
     * 页面重置
     */
    resetAll() {
      let _form: any = this.$refs["customer-form"];
      _form.resetFields();
      this.applyData.orderId = "";
      let _gatherDetail: any = this.$refs["gather-detail-early-pay"];
      _gatherDetail.resetTable();
      let _uploadFodder: any = this.$refs['upload-the-fodder'];
      _uploadFodder.reset()
    }
    showTab1() {
      if (this.applyData.idCard.length === 18) {
        this.disabledStatus = "none";
        this.getOrderInfo();
      }
    }
    showTab2() {
      //   if (this.applyData.name.length > 2) {
      //     this.disabledStatus = 'none';
      //     this.getOrderInfo();
      //   }
    }
    showTab3() {
      //   if (this.applyData.mobileMain.length > 10) {
      //     this.disabledStatus = 'none';
      //     this.getOrderInfo();
      //   }
    }
    /**
     * 获取订单信息
     */
    getOrderInfo() {
      this.withdrawApplicationService
        .getPersonalProductOrderInfoForAdvance({
          idCard: this.applyData.idCard,
          customerName: this.applyData.customerName,
          mobileMain: this.applyData.mobileMain
        })
        .subscribe(
          data => {
            if (data[0] && data[0].orderNumberIdModels) {
              this.orderNumberIdModels = data[0].orderNumberIdModels;
              this.applyData.customerName = data[0].name;
              this.applyData.mobileMain = data[0].mobileMain;
              this.personalId = data[0].personalId;
            }
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
    selectOrder(val) {
      if (val) {
        this.checkOrderId = val; // 将选择的订单号传给变更收款项按钮点击事件中
        this.saveDraftModel.orderId = val; // 保存草稿所需orderId
        this.withdrawApplicationService
          .getAdvanceRevokeApplicationInfo({
            personalId: this.personalId,
            orderId: val
          })
          .subscribe(
            data => {
              this.applyData.remark = data.remark;
              this.applyData.withdrawType = data.withdrawType
              // 获取收款项和备注信息
              let _gatherDetail: any = this.$refs["gather-detail-early-pay"];
              _gatherDetail.makeListdataSet(data);
              if (data.personalBank && data.personalBank.personalName) {
                this.saveDraftModel.accountName = data.personalBank.personalName; // 获取保存草稿时需要的accountName
              }
              if (data.withdrawId) {
                this.saveDraftModel.applicationId = data.withdrawId; // 获取保存草稿时需要的id
              }
            },
            ({
              msg
            }) => {
              this.msg = msg
              this.$Message.error(msg);
            }
          );
      }
    }
    getgather() {
      let _gatherDetail: any = this.$refs["gather-detail-early-pay"];
      let itemList = _gatherDetail.getItem();
      let _uploadthefodder: any = this.$refs['upload-the-fodder']
      this.saveDraftModel.financeUploadResources = _uploadthefodder.fodderList.map(v => {
        return {
          materialUrl: v.url,
          // type:v.response.type,
          // name:v.name,
          // id:v.response.id
        }
      })
      this.saveDraftModel.otherFee = _gatherDetail.getOtherFee();
      this.saveDraftModel.remark = this.applyData.remark;
      let surplusManageFee = itemList.find(
        v => v.itemName === "surplusManageFee"
      );
      if (surplusManageFee) {
        this.saveDraftModel.surplusManageFee = surplusManageFee.itemMoney;
      }
      let surplusPenalty = itemList.find(v => v.itemName === "surplusPenalty");
      if (surplusPenalty) {
        this.saveDraftModel.violateAmount = surplusPenalty.itemMoney;
      }
      let surplusPenaltyFreeze = itemList.find(
        v => v.itemName === "surplusPenaltyFreeze"
      );
      if (surplusPenaltyFreeze) {
        this.saveDraftModel.surplusPenaltyFreeze = surplusPenaltyFreeze.itemMoney;
      }
      let surplusPrincipal = itemList.find(
        v => v.itemName === "surplusPrincipal"
      );
      if (surplusPrincipal) {
        this.saveDraftModel.surplusPrincipal = surplusPrincipal.itemMoney;
      }
      let totalPayment = itemList.find(v => v.itemName === "totalPayment");
      if (totalPayment) {
        this.saveDraftModel.totalPayment = totalPayment.itemMoney;
      }
      let violateAmount = itemList.find(v => v.itemName === 'violateAmount');
      if (violateAmount) {
        this.saveDraftModel.violateAmount = violateAmount.itemMoney;
      }
    }
    /**
     * 保存草稿
     */
    saveDraftClick() {
      this.getgather()
      this.saveDraftModel.withdrawType = this.applyData.withdrawType
      this.withdrawApplicationService
        .saveAdvanceRevokeApplicationAsDraft(this.saveDraftModel)
        .subscribe(
          data => {
            this.$Message.success("保存草稿成功！");
            this.resetAll()
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
    /**
     * 保存并提交
     */
    saveAndCommit() {
      let customerform: any = this.$refs['customer-form']
      customerform.validate(valid => {
        if (!valid) {
          return false
        } else {
          this.getgather()
          if (this.msg === '该订单有为完成的提前收回申请') {
            this.$Message.warning('请先审批未处理的申请订单！')
            return false
          }
          this.saveDraftModel.withdrawType = this.applyData.withdrawType
          let saveAndCommitModel = this.saveDraftModel;
          this.withdrawApplicationService
            .saveAdvanceRevokeApplication(saveAndCommitModel)
            .subscribe(
              data => {
                this.$Message.success("保存并提交成功！");
                this.resetAll()
                this.type = true
              },
              ({
                msg
              }) => {
                this.$Message.error(msg);
              }
            );
        }
      })
    }
  }

</script>

<style lang="less" scope>
  .special-input {
    .ivu-input {
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }
  
  .page.early-recover-apply {
    .header {
      border-bottom: 1px solid #cccccc;
      margin-bottom: 20px;
      .command {
        float: right;
        margin-top: 10px;
        margin-right: 10px;
        .command-item {
          font-size: 16px;
          cursor: pointer;
          display: inline-block;
          margin-left: 10px;
          color: #3367A7;
          span {
            font-size: 12px;
          }
        }
      }
    }
    .clear-button {
      height: 40px;
      margin-top: 60px
    }
    .submit-bar {
      height: 70px;
      width: 100%;
      background: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      border: 1px solid #ddd;
      .submit-bar-item {
        padding: 10px;
      }
    }
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
  
  .bigSelect {
    .ivu-select-selection {
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }
  
  .early-recover-tabs {
    .ivu-tabs-bar {
      border-bottom: 1px solid #dddee1;
      .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
        margin: 0;
        margin-right: 4px;
        padding: 5px 16px 4px;
        border: 1px solid #dddee1;
        border-bottom: 0;
        border-radius: 4px 4px 0 0;
        transition: all 0.3s ease-in-out;
      }
    }
  }
  
  .early-recover-apply {
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
      top: 368px;
      z-index: 999;
    }
  }

</style>
