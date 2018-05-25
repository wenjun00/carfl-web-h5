<!--确认还款-->
<template>
  <section class="component confirm-repayment">
    <div>
      <div class="modal-kehuxinxi"></div>
      <span>客户信息</span>
    </div>
    <data-grid :totalSpan="6" class="modal-item-grid" :labelWidth="150" labelAlign="right" contentAlign="left">
      <data-grid-item label="客户姓名" :span="2">{{repaymentObj.customerName}}</data-grid-item>
      <data-grid-item label="身份证号" :span="4">{{repaymentObj.idCard}}</data-grid-item>
      <data-grid-item label="融资金额（元）" :span="2">{{repaymentObj.financingAmount}}</data-grid-item>
      <data-grid-item label="期数" :span="2">{{repaymentObj.periods}}</data-grid-item>
      <data-grid-item label="月利率" :span="2">{{repaymentObj.productRate| decimalToPrecent}}</data-grid-item>
    </data-grid>

    <table class="modal-item-table" border="1" width="868">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="3">还款</td>
        <td bgcolor="#F2F2F2" colspan="4">明细</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2" width="100px">本金</td>
        <td width="100px">应付本金</td>
        <td width="150px">{{repaymentObj.principalReceivable | decimalToPrecent}}</td>
        <td width="100px">已还本金</td>
        <td width="150px">{{repaymentObj.principalReceived | decimalToPrecent}}</td>
        <td width="100px">剩余本金</td>
        <td>{{repaymentObj.principalSurplus | decimalToPrecent}}</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">利息</td>
        <td>应还利息</td>
        <td>{{repaymentObj.interestReceivable | decimalToPrecent}}</td>
        <td>已还利息</td>
        <td>{{repaymentObj.interestReceived | decimalToPrecent}}</td>
        <td>剩余利息</td>
        <td>{{repaymentObj.interestSurplus | decimalToPrecent}}</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">罚息</td>
        <td>应付罚息</td>
        <td>{{repaymentObj.penaltyReceivable | decimalToPrecent}}</td>
        <td>已还罚息</td>
        <td>{{repaymentObj.penaltyReceived | decimalToPrecent}}</td>
        <td>剩余罚息</td>
        <td>
          <span class="modal-item-derate">{{repaymentObj.penaltyFreezeAddDerate | decimalToPrecent}}</span>
          <span class="modal-item-surplus">{{repaymentObj.penaltySurplus | decimalToPrecent}}</span>
        </td>
        <!--<td><span style="color:red;text-decoration:line-through;margin-right:6px;" >{{repaymentObj.penaltyReceivable}}</span><span>{{repaymentObj.penaltySurplus}}</span></td>-->
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">管理费</td>
        <td>应收管理费</td>
        <td>{{repaymentObj.manageFeeReceivable | decimalToPrecent}}</td>
        <td>实收管理费</td>
        <td>{{repaymentObj.manageFeeReceived | decimalToPrecent}}</td>
        <td>剩余管理费</td>
        <td>{{repaymentObj.manageFeeSurplus | decimalToPrecent}}</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">合计</td>
        <td>应付</td>
        <td>{{repaymentObj.amountReceivable | decimalToPrecent}}</td>
        <td>已还</td>
        <td>{{repaymentObj.amountReceived | decimalToPrecent}}</td>
        <td>剩余</td>
        <td>{{repaymentObj.amountSurplus | decimalToPrecent}}</td>
      </tr>
    </table>

    <div class="modal-item-huakoujilu">
      <i-button class="modal-item-huakoubutton blueButton" @click="checkDeductRecord">本期划扣详情</i-button>
    </div>

    <div>
      <div class="modal-item-shoukuanfangshi"></div>
      <span>收款方式</span>
    </div>
    <table class="modal-item-table" border="1" width="868">
      <tr height="40">
        <!--<td bgcolor="#F2F2F2" colspan="1" width="5%">-->
        <!--<div @click="addObj">-->
        <!--<i-icon class="modal-item-icon" type="plus"></i-icon>-->
        <!--</div>-->
        <!--</td>-->
        <td bgcolor="#F2F2F2" colspan="1" width="20%">结算通道</td>
        <!--<td bgcolor="#F2F2F2" colspan="1" width="20%">收款项</td>-->
        <td bgcolor="#F2F2F2" colspan="1">合计金额（元）</td>
        <td bgcolor="#F2F2F2" colspan="1">状态</td>
      </tr>
      <tr height="40">
        <!--<td>-->
        <!--<div @click="deleteObj(i)">-->
        <!--<i-icon type="minus" class="modal-item-icon"></i-icon>-->
        <!--</div>-->
        <!--</td>-->
        <td>
          <i-select class="modal-item-select" placeholder="选择结算通道" v-model="pipeSelect">
            <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </td>
        <!--<td>-->
        <!--<i-select class="modal-item-select" placeholder="选择收款项" v-model="v.collectItem" @on-change="selectWay($event, v)">-->
        <!--<i-option v-for="item in collectMoneyItemModel" :key="item.itemCode" :label="item.itemLabel" :value="item.itemCode"></i-option>-->
        <!--</i-select>-->
        <!--</td>-->
        <td>
          <i-input-number style="display:inline-block;width:30%;margin-right:10px" v-model="totalMoney" :min="0" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"></i-input-number>
          <i-button class="blueButton" @click="huakouTest">确认划扣</i-button>
        </td>
        <!--<td>-->
        <!--<div>-->
        <!--<span>已处理</span>-->
        <!--<i-icon class="modal-item-icon2" type="loop" size="20" color="#199ED8"></i-icon>-->
        <!--</div> -->
        <!--</td>-->
        <td>
          <!--<span>{{$dict.getDictName(v.dealStatus)}}</span>-->
          <span>{{huakou}}</span>
          <i-icon class="modal-item-huakou-icon" type="loop" size="20" color="#199ED8"></i-icon>
        </td>
      </tr>
      <!--<tr height="40">-->
      <!--<td></td>-->
      <!--<td width="25%">合计（元）</td>-->
      <!--<td class="modal-item-td" colspan="3">{{collectMoneySum | toThousands}}</td>-->
      <!--</tr>-->
    </table>
    <i-form>
      <i-form-item label="备注">
        <i-input type="textarea" v-model="remark" style="width:100%;display:block;"></i-input>
      </i-form-item>
    </i-form>

    <div class="modal-item-shoukuanpingzheng">
      <div>
        <div class="modal-item-shoukuanpingzheng-div"></div>
        <span>收款凭证</span>
      </div>
      <upload-voucher @financeUploadResources="fileNumber" ref="upload-voucher-two"></upload-voucher>
    </div>
    <template>
      <i-modal title="本期划扣详情" v-model="deductRecordModal" :width="1200">
        <deduct-detail ref="deduct-Detail"></deduct-detail>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DataBox from "~/components/common/data-box.vue";
import DeductDetail from "~/components/finance-manage/deduct-detail.vue";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { Dependencies } from "~/core/decorator";
import { PaymentScheduleService } from "~/services/manage-service/payment-schedule.service";
import UploadVoucher from "~/components/common/upload-voucher.vue";
import { LodashService } from '~/utils/lodash.service'
import { ChargeBackService } from "~/services/manage-service/charge-back.service";

@Component({
  components: {
    DataBox,
    DataGrid,
    DataGridItem,
    DeductDetail,
    UploadVoucher
  }
})
export default class ConfirmRepayment extends Vue {
  @Dependencies(PaymentScheduleService) private paymentScheduleService: PaymentScheduleService;
  @Dependencies(ChargeBackService) private chargeBackService: ChargeBackService;
  private columns1: any;
  private repaymentObj: any = {};
  private rowObj: any = {
    personalId: '',
    businessId: '',
    orderId: '',
    periods: ''
  };
  private data1: any = [];
  private collectMoneyDetails: any = [];
  private financeUploadResources: any = [];
  private data2: any = [];
  private deductRecordModal: Boolean = false;
  private openUpload: Boolean = false;
  public remark: String = "";
  private collectMoneySum: any = 0;
  private collectMoneyId: any = "";
  private collectMoneyItemModel: any = [];
  private fodderList: any = [];
  private uploadFodder: any = {};
  public pipeSelect: any = ''
  private huakou: any = '未处理'
  public totalMoney: any = 0

  mounted() {
    this.uploadFodder = this.$refs["upload-voucher-two"];
  }

  fileNumber(item) {
    this.fodderList = item;
  }
  refresh(row) {
    this.remark = "";
    this.collectMoneyId = "";
    this.repaymentObj = {};
    this.collectMoneyDetails = [];
    this.financeUploadResources = [];
    this.inputBlur();
    this.rowObj.personalId = row.personalId
    this.rowObj.businessId = row.businessId
    this.rowObj.orderId = row.orderId
    this.paymentScheduleService
      .getCustomerScheduleBillDetail({
        orderId: row.orderId
      })
      .subscribe(
      data => {
        this.collectMoneyId = data.collectMoneyHistory ? data.collectMoneyHistory.id : "";
        this.repaymentObj = data;
        this.rowObj.periods = data.periods
        this.collectMoneyDetails = data.collectMoneyDetails || [];
        this.financeUploadResources = data.financeUploadResources || [];
        this.collectMoneyItemModel = data.collectMoneyItemModel;
        this.remark = data.remark;
        this.totalMoney = data.amountSurplus
        this.inputBlur();
      },
      ({ msg }) => {
        this.$Message.error(msg);
      });
  }

  checkDeductRecord() {
    this.deductRecordModal = true;
    let _record: any = this.$refs["deduct-Detail"];
    _record.refresh(this.rowObj);
  }

  /**
   * 增加还款对象
   */
  addObj() {
    console.log("add");
    this.collectMoneyDetails.push({
      collectMoneyAmount: 0,
      collectMoneyChannel: "",
      collectItem: ""
    });
  }

  /**
   * 删除还款对象
   */
  deleteObj(index) {
    console.log("add");
    this.collectMoneyDetails.splice(index, 1);
    this.inputBlur();
  }

  /**
   * 计算总计
   */
  inputBlur() {
    let sum: any = 0;
    this.collectMoneyDetails.forEach(v => {
      sum += v.collectMoneyAmount;
    });
    this.collectMoneySum = LodashService.round(sum, 2);
  }

  selectWay(code, item) {
    let target: any = this.collectMoneyItemModel.find(d => d.itemCode === code);
    if (target) {
      item.collectMoneyAmount = target.itemMoney;
      this.inputBlur();
    }
  }
  huakouTest() {
    this.chargeBackService.saveChargeback({ personalId: 1 })
      .subscribe(data => {
        this.$Message.success('划扣成功')
        this.huakou = '已处理'
      }, (msg) => {
        this.$Message.error(msg)
      })
  }
  created() {
    this.columns1 = [
      {
        title: "操作",
        width: "200",
        align: "center",
        render: (h, params) => {
          return h("div", [
            h("Icon", {
              props: {
                type: "archive",
                size: "20"
              },
              style: {
                cursor: "pointer",
                marginRight: "15px",
                color: "#199ED8"
              },
              on: {
                click: () => { }
              }
            }),
            h("Icon", {
              props: {
                type: "eye",
                size: "20"
              },
              style: {
                cursor: "pointer",
                marginRight: "15px",
                color: "#199ED8"
              },
              on: {
                click: () => { }
              }
            }),
            h("Icon", {
              props: {
                type: "trash-a",
                size: "20"
              },
              style: {
                cursor: "pointer",
                color: "#199ED8"
              },
              on: {
                click: () => { }
              }
            })
          ]);
        }
      },
      {
        title: "附件信息",
        align: "center",
        key: "attachmentName"
      },
      {
        align: "center",
        title: "上传日期",
        key: "uploadTime"
      },
      {
        align: "center",
        title: "上传人",
        key: "uploadPerson"
      }
    ];

    this.data1 = [
      {
        attachmentName: "kb0917",
        uploadTime: "2017-12-03 14:56:25",
        uploadPerson: "胡开甲"
      }
    ];
  }
}
</script>

<style lang="less" scoped>
.component.confirm-repayment {
  .modal-kehuxinxi {
    width: 7px;
    height: 20px;
    background: #265ea2;
    display: inline-block;
    margin-right: 6px;
    position: relative;
    top: 4px;
  }
  .modal-item-grid {
    margin-top: 10px;
  }
  .modal-item-table {
    margin-top: 10px;
    text-align: center;
    border: 1px solid #dddee1;
  }

  .modal-item-derate {
    text-decoration: line-through;
    margin-right: 6px;
  }
  .modal-item-surplus {
    color: red;
  }
  .modal-item-huakoujilu {
    margin-top: 10px;
    .modal-item-huakoubutton {
      float: right;
      margin-bottom: 10px;
    }
  }
  .modal-item-shoukuanfangshi {
    width: 7px;
    height: 20px;
    background: #265ea2;
    display: inline-block;
    margin-right: 6px;
    position: relative;
    top: 4px;
  }
  .modal-item-icon {
    color: #199ed8;
    cursor: pointer;
  }
  .modal-item-select {
    display: inline-block;
    width: 90%;
  }
  .modal-item-input {
    display: inline-block;
    width: 30%;
    margin-right: 10px;
  }
  .modal-item-icon2 {
    margin-left: 6px;
    cursor: pointer;
  }
  .modal-item-td {
    font-weight: 700;
    font-size: 14px;
  }
  .modal-item-shoukuanpingzheng {
    margin-top: 10px;
    margin-bottom: 10px;
    .modal-item-shoukuanpingzheng-div {
      width: 7px;
      height: 20px;
      background: #265ea2;
      display: inline-block;
      margin-right: 6px;
      position: relative;
      top: 4px;
    }
  }
  .modal-item-fujian {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    .modal-item-upload {
      height: 200px;
      width: 200px;
      cursor: pointer;
      text-align: center;
      background-color: rgb(244, 244, 244);
    }
    .modal-item-upload-icon {
      display: block;
      margin-top: 40px;
    }
    .modal-item-upload-add {
      margin-top: 5px;
    }
    .modal-item-upload-text {
      color: gray;
    }
  }
  .modal-item-fanxian {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    .modal-item-fanxian-img {
      height: 200px;
      width: 200px;
    }
  }
}
</style>
