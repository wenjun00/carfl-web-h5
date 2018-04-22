<!--确认收款-->
<template>
  <section class="component confirm-gather">
    <i-form :label-width="110" label-position="left">
      <i-row class="modal-item-shenqing">
        <i-col class="modal-item-col" :span="24">
          <span>收款类型：</span><span class="modal-item-leixing">{{$dict.getDictName(repaymentObj.applicationType)}}</span>
          <i-button class="modal-item-button" type="text" @click="saleApplyInfo">销售申请详情</i-button>
        </i-col>
        <i-col class="modal-item-beizhu" :span="24">
          <i-form-item>
            <span>备注：</span>
            <i-input class="modal-item-input" type="textarea" v-model="repaymentObj.remark" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
    <div v-if="applicationPhaseResources.length">
      <div class="modal-item-fujian"></div>
      <span>附件</span>
      <upload-voucher  ref="upload-voucher" hiddenUpload hiddenDelete></upload-voucher>
    </div>
    <div>
      <div class="modal-item-mingxi"></div>
      <span>收款明细</span>
    </div>
    <table class="modal-item-table" border="1" width="850">
      <tr height="40">
        <td class="bg-color" colspan="1" width="40%">项目</td>
        <td class="bg-color" colspan="1" width="60%">金额（元）</td>
      </tr>
      <tr height="40" v-for="item in collectMoneyItemModels" :key="item.itemName">
        <td>{{item.itemLabel}}</td>
        <td>{{item.itemMoney}}</td>
      </tr>
      <tr height="40">
        <td>合计</td>
        <td class="modal-item-heji">{{repaymentObj.totalPayment}}</td>
      </tr>
    </table>
    <div>
      <div class="modal-item-fangshi"></div>
      <span>收款方式</span>
    </div>
    <table class="modal-item-table" border="1" width="850">
      <tr height="40">
        <td class="bg-color" colspan="1" width="5%" v-if="!check">
          <div @click="addObj">
            <i-icon type="plus" class="modal-item-icon"></i-icon>
          </div>
        </td>
        <td class="bg-color" colspan="1" width="20%">结算通道</td>
        <td class="bg-color" colspan="1" width="20%">收款项</td>
        <td class="bg-color" colspan="1">金额（元）</td>
        <td class="bg-color" colspan="1">状态</td>
      </tr>
      <tr height="40" v-for="(v,i) in collectMoneyDetails" :key="i">
        <td v-if="!check">
          <div @click="deleteObj(i)">
            <i-icon type="minus" class="modal-item-icon"></i-icon>
          </div>
        </td>
        <td>
          <i-select class="modal-item-select" placeholder="选择结算通道" v-model="v.collectMoneyChannel" :disabled="check">
            <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </td>
        <td>
          <i-select class="modal-item-select" placeholder="选择收款项目" v-model="v.collectItem" :disabled="check" @on-change="selectWay($event, v)">
            <i-option v-for="item in collectMoneyItemModels" :key="item.itemCode" :label="item.itemLabel" :value="item.itemCode"></i-option>
          </i-select>
        </td>
        <td>
          <i-input class="modal-item-huakou" v-model="v.collectMoneyAmount" @on-blur="inputBlur" readonly></i-input>
          <i-button class="blueButton" v-if="!check">确认划扣</i-button>
        </td>
        <td><span>已处理</span>
          <i-icon class="modal-item-icon2" type="loop" size="20" color="#199ED8"></i-icon>
        </td>
      </tr>
      <tr height="40">
        <td v-if="!check"></td>
        <td width="25%">合计（元）</td>
        <td colspan="3" class="modal-item-td">{{paymentAmount}}</td>
      </tr>
    </table>
    <div>
      <div class="modal-item-xinxi"></div>
      <span >账户信息</span>
    </div>
    <i-table :columns="columns2" :data="personalBanks"></i-table>

    <div v-if="!check||financeUploadResources.length">
      <div class="modal-item-xinxi"></div>
      <span >收款凭证</span>
      <upload-voucher @financeUploadResources="fileNumber" ref="upload-voucher-two"></upload-voucher>
    </div>

    <template>
      <i-modal title="申请单详情" v-model="purchaseInfoModel" width="1000" class="purchaseInformation">
        <purchase-information ref="purchase-info"></purchase-information>
        <div slot="footer">
          <i-button class="blueButton" @click="purchaseInfoModel=false">返回</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import ChangeCard from "~/components/purchase-manage/change-card.vue"
  import DataBox from "~/components/common/data-box.vue";
  import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    CollectMoneyHistoryService
  } from "~/services/manage-service/collect-money-history.service";
  import UploadVoucher from "~/components/common/upload-voucher.vue"
  import { Prop, Watch } from "vue-property-decorator";

  @Component({
    components: {
      ChangeCard,
      DataBox,
      PurchaseInformation,
      UploadVoucher
    }
  })
  export default class ConfirmGather extends Vue {
    @Dependencies(CollectMoneyHistoryService) private collectMoneyHistoryService: CollectMoneyHistoryService;
    @Prop({
      default: false
    })
    check: boolean;
    @Prop() currentRow:any
    private rowObj: any = {};
    private repaymentObj: any = {};
    private applicationPhaseResources: any = []
    private financeUploadResources: any = [];
    private collectMoneyDetails: any = [];
    private paymentAmount: any = 0
    private collectMoneyItemModels: any = []
    private collectMoneyId: any = ''
    private openUpload: Boolean = false;
    private box: any = ''
    private columns2: any;
    private personalBanks: Array < Object > = [];
    private columns3: any;
    private data3: Array < Object > = [];
    private purchaseInfoModel: Boolean = false;
    private fodderList:any =[]
    private gatherModal: Object = {
      gatherType: '销售收款',
      remarks: ''
    }

    @Watch('currentRow')
    onChange(){
      this.refresh(this.currentRow)
    }
    mounted(){
      this.refresh(this.currentRow)
    }
    refresh(row) {
      this.$nextTick(()=>{
        if(!row)
          return
        this.rowObj = row
        this.collectMoneyHistoryService.withdrawApplicationDetail({
          applicationId: row.applicationId
        }).subscribe(data => {
          this.collectMoneyId = data.collectMoneyId || ''
          this.repaymentObj = data
          this.collectMoneyDetails = data.collectMoneyDetails || []
          this.personalBanks = data.personalBanks
          this.financeUploadResources = data.collectMoneyPhaseUploadResources
          this.applicationPhaseResources = data.applicationPhaseUploadResources
          this.collectMoneyItemModels = data.collectMoneyItemModels
          this.$nextTick(()=>{
            let _uploadFodder:any = this.$refs['upload-voucher']
            _uploadFodder.Reverse(data.applicationPhaseUploadResources)
            let _uploadFodderTwo:any = this.$refs['upload-voucher-two']
            _uploadFodderTwo.Reverse(data.collectMoneyPhaseUploadResources)
            this.inputBlur()
          })
        }, ({
              msg
            }) => {
          this.$Message.error(msg)
        })
      })
    }
    /**
     * 上传的文件
     */
    fileNumber(item){
      this.fodderList = item
    }
    /**
     * 计算总计
     */
    inputBlur() {
      let sum: any = 0
      this.collectMoneyDetails.forEach(v => {
        sum = sum + (Number(v.collectMoneyAmount) || 0)
      })
      this.paymentAmount = sum
    }
    /**
     * 增加还款对象
     */
    addObj() {
      this.collectMoneyDetails.push({collectMoneyAmount: ''})
    }
    selectWay(code, item) {
      let target: any = this.collectMoneyItemModels.find((d) => d.itemCode === code)
      if (target) {
        item.collectMoneyAmount = target.itemMoney
        this.inputBlur()
      }
    }
    /**
     * 删除还款对象
     */
    deleteObj(index) {
      console.log('add')
      this.collectMoneyDetails.splice(index, 1)
      this.inputBlur()
    }

    created() {
      this.columns3 = [{
        align: "center",
        width: "60",
        renderHeader: (h, {
          column,
          index
        }) => {
          return h(
            "div", {
              on: {
                click: () => {
                  // this.columnsConfig();
                }
              },
              style: {
                cursor: "pointer"
              }
            }, [
              h("Icon", {
                props: {
                  type: "plus",
                  size: "20"
                }
              })
            ]
          );
        },
        render: (h, {
          row,
          columns,
          index
        }) => {
          if (index === 1) {
            return h("Icon", {
              props: {
                type: "loop",
                size: "20"
              }
            })
          } else {
            return h("Icon", {
              props: {
                type: "trash-a",
                size: "20"
              }
            })
          }
        }
      }, {
        title: '项目名称',
        align: 'center',
        key: 'projectName',
        render: (h, {
          row,
          columns,
          index
        }) => {
          return h('Select', {
            props: {
              width: '100px',
              placeholder: '请选择收款方式'
            }
          }, [h('Option', {
            props: {
              label: '汇付',
              value: '汇付'
            }
          }), h('Option', {
            props: {
              label: '富友',
              value: '富友'
            }
          }), h('Option', {
            props: {
              label: '现金',
              value: '现金'
            }
          })])
        }
      }]
      this.data3 = [{
        // projectName: ''
      }]


      this.columns2 = [{
        title: "户名",
        align: 'center',
        key: 'personalName'
      }, {
        title: "开户银行",
        align: 'center',
        key: 'depositBank'
      }, {
        title: "银行卡号",
        align: 'center',
        key: 'cardNumber'
      }, {
        title: "支行名称",
        align: 'center',
        key: 'depositBranch'
      }, {
        title: "第三方客户号",
        align: 'center',
        key: 'clientNumber'
      }]
    }
    saleApplyInfo() {
      this.purchaseInfoModel = true
      let _purchaseInfo: any = this.$refs["purchase-info"];
      _purchaseInfo.getOrderDetail(this.rowObj);
    }
  }

</script>

<style lang="less" scoped>
  .invoiceContainer {
    display: flex;
    justify-content: flex-start;
    .invoices {
      margin-top: 10px;
    }
    .invoiceItem {
      margin-left: 10px;
      width: 140px;
      height: 100px;
      border: 1px solid #dddddd;
      background-image: url('/static/images/common/invoice.png')
    }
    .invoiceName {
      text-align: center;
    }
  }

  .component.confirm-gather {
    .modal-item-shenqing {
      background: #F5F5F5
    }
    .modal-item-col {
      padding: 6px;
    }
    .modal-item-leixing {
      margin-left: 10px;
    }
    .modal-item-button {
      float: right;
      color: #265ea2
    }
    .modal-item-beizhu {
      margin-top: 10px;
      margin-left: 10px
    }
    .modal-item-input {
      display: inline-block;
      width: 80%;
    }
    .modal-item-fujian {
      width: 7px;
      height: 20px;
      background: #265EA2;
      display: inline-block;
      margin-right: 6px;
      position: relative;
      top: 4px;
    }
    .modal-item-mingxi {
      width: 7px;
      height: 20px;
      background: #265EA2;
      display: inline-block;
      margin-right: 6px;
      position: relative;
      top: 4px;
    }
    .modal-item-table {
      margin-top: 10px;
      text-align: center;
      border: 1px solid #DDDEE1;
      .bg-color{
          background-color: #F2F2F2;
      }
    }
    .modal-item-fangshi {
      width: 7px;
      height: 20px;
      background: #265EA2;
      display: inline-block;
      margin-right: 6px;
      position: relative;
      top: 4px;
    }
    .modal-item-icon {
      color: #199ED8;
      cursor: pointer;
    }
    .modal-item-select {
      display: inline-block;
      width: 90%
    }
    .modal-item-input2 {
      display: inline-block;
      width: 80%;
    }
    .modal-item-huakou {
      display: inline-block;
      width: 30%;
      margin-right: 10px
    }
    .modal-item-icon2 {
      margin-left: 6px;
      cursor: pointer
    }
    .modal-item-td {
      font-weight: 700;
      font-size: 14px
    }
    .modal-item-zhanghuxinxi {
      width: 7px;
      height: 20px;
      background: #265EA2;
      display: inline-block;
      margin-right: 6px;
      position: relative;
      top: 4px;
      margin-top: 10px;
    }
  }

</style>
