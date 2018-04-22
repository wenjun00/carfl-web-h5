<!--确认收回-->
<template>
  <section class="component confirm-withdraw">
    <div>
      <div class="modal-item-kehuxinxi"></div>
      <span>客户信息</span>
    </div>
    <data-grid class="modal-item-grid" :labelWidth="90" labelAlign="left" contentAlign="left">
      <data-grid-item label="客户姓名" :span="2">
        <template>
          <div>{{repaymentObj.customerName}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="身份证号" :span="4">
        <template>
          <div>{{repaymentObj.idCard}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="融资金额（元）" :span="2">
        <template>
          <div>{{repaymentObj.financingAmount}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="期数" :span="2">
        <template>
          <div>{{$dict.getDictName(repaymentObj.periods)}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="月供（元）" :span="2">
        <template>
          <div>{{repaymentObj.monthlySupply}}</div>
        </template>
      </data-grid-item>
    </data-grid>

    <table class="modal-item-table" border="1" width="868">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="1" width="40%">项目</td>
        <td bgcolor="#F2F2F2" colspan="1" width="60%">金额（元）</td>
      </tr>
      <tr height="40" v-for="item in collectMoneyItemModel" :key="item.itemCode">
        <td>{{item.itemLabel}}</td>
        <td>{{item.itemMoney}}</td>
      </tr>
      <tr height="40">
        <td>合计</td>
        <td class="modal-item-heji">{{repaymentObj.totalPayment}}</td>
      </tr>
    </table>
    <div class="modal-item-fujian" v-if="applicationPhaseResources.length">
      <div class="modal-item-fujianbox"></div>
      <span>附件</span>
    </div>
    <div class="modal-item-resources">
      <i-row>
        <i-col :span="6" v-for="(v,i) in applicationPhaseResources" :key="v.id"
               class="modal-item-resources-col">
          <div
            :style="`height:150px;width:150px;border:1px solid #C2C2C2;background-image:url(${v.materialUrl});background-repeat:no-repeat;`">
          </div>
          <div class="modal-item-resources-div">{{v.originName}}</div>
        </i-col>
      </i-row>
    </div>
    <div class="modal-item-huakoujilu">
      <!--<span style="font-size:14px;font-weight:bold;position:relative;top:20px;">还款总额：1010<span></span></span>-->
      <i-button class="modal-item-huakoujilu-button blueButton" @click="checkDeductRecord">查看划扣记录</i-button>
    </div>

    <div>
      <div class="modal-item-shoukuanfangshi"></div>
      <span>收款方式</span>
    </div>
    <table class="modal-item-table" border="1" width="868">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="1" width="5%">
          <div @click="addObj">
            <i-icon class="modal-item-shoukuanfangshi-icon" type="plus"></i-icon>
          </div>
        </td>
        <td bgcolor="#F2F2F2" colspan="1" width="20%">结算通道</td>
        <td bgcolor="#F2F2F2" colspan="1" width="20%">收款项</td>
        <td bgcolor="#F2F2F2" colspan="1">金额（元）</td>
        <td bgcolor="#F2F2F2" colspan="1">状态</td>
      </tr>
      <tr height="40" v-for="(v,i) in collectMoneyDetails" :key="i">
        <td>
          <div @click="deleteObj(i)">
            <i-icon class="modal-item-shoukuanfangshi-icon" type="minus"></i-icon>
          </div>
        </td>
        <td>
          <i-select class="modal-item-shoukuanfangshi-select" placeholder="选择结算通道" v-model="v.collectMoneyChannel">
            <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label"
                      :value="value"></i-option>
          </i-select>
        </td>
        <!--<td>-->
        <!--<i-select placeholder="选择收款项目" style="display:inline-block;width:90%" v-model="v.collectItem">-->
        <!--<i-option v-for="{value,label} in $dict.getDictData('0113')" :key="value" :label="label" :value="value"></i-option>-->
        <!--</i-select>-->
        <!--</td>-->
        <td>
          <i-select class="modal-item-shoukuanfangshi-select" placeholder="选择收款项目" v-model="v.collectItem"
                    @on-change="selectWay($event, v)">
            <i-option v-for="item in collectMoneyItemModel" :key="item.itemCode" :label="item.itemLabel"
                      :value="item.itemCode"></i-option>
          </i-select>
        </td>
        <td>
          <i-input class="modal-item-querenhuakou-input" v-model="v.collectMoneyAmount" @on-blur="inputBlur" readonly></i-input>
          <i-button class="blueButton">确认划扣</i-button>
        </td>
        <td><span>已处理</span>
          <i-icon class="modal-item-yichuli-icon" type="loop" size="20" color="#199ED8"></i-icon>
        </td>
      </tr>
      <tr height="40">
        <td></td>
        <td width="25%">合计（元）</td>
        <td class="modal-item-heji-td" colspan="3">{{paymentAmount}}</td>
      </tr>
    </table>
    <i-form>
      <i-form-item label="备注">
        <i-input class="modal-item-beizhu-input" type="textarea" v-model="remark"></i-input>
      </i-form-item>
    </i-form>

    <div class="modal-item-shoukuanpingzheng">
      <div>
        <div class="modal-item-shoukuanpingzheng-box"></div>
        <span>收款凭证</span>
      </div>
      <upload-voucher @financeUploadResources="fileNumber" ref="upload-voucher"></upload-voucher>
    </div>
    <template>
      <i-modal title="划扣记录" v-model="deductRecordModal" width="1200">
        <deduct-record ref="deduct-record"></deduct-record>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import DeductRecord from "~/components/finance-manage/deduct-record.vue";
  import {
    DataGrid,
    DataGridItem
  } from "@zct1989/vue-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    AdvanceRevokeService
  } from "~/services/manage-service/advance-revoke.service";
  import UploadVoucher from "~/components/common/upload-voucher.vue"

  @Component({
    components: {
      DataBox,
      DataGrid,
      DataGridItem,
      DeductRecord,
      UploadVoucher
    }
  })
  export default class ConfirmWithdraw extends Vue {
    @Dependencies(AdvanceRevokeService) private advanceRevokeService: AdvanceRevokeService;
    private repaymentObj: any = {};
    private rowObj: any = {};
    private collectMoneyDetails: any = [];
    private financeUploadResources: any = [];
    private data2: any = [];
    private deductRecordModal: Boolean = false
    private remark: String = ''
    private paymentAmount: any = 0
    private delFinanceUploadResource: any = []
    private addFinanceUploadResource: any = []
    private applicationPhaseResources: any = []
    private collectMoneyId: any = ''
    private collectMoneyItemModel: any = []
    private openUpload: Boolean = false;
    private fodderList:any = []

    refresh(row) {
      this.rowObj = row
      this.advanceRevokeService.getAdvanceRevokeBillInfo({
        orderId: row.orderId
      }).subscribe(data => {
        this.collectMoneyId = data.collectMoneyHistory ? data.collectMoneyHistory.id : ''
        this.repaymentObj = data
        this.collectMoneyDetails = data.collectMoneyDetails || []
        this.financeUploadResources = data.collectMoneyPhaseResources
        this.applicationPhaseResources = data.applicationPhaseResources
        this.collectMoneyItemModel = data.collectMoneyItemModel
        this.inputBlur()
        this.remark = data.collectMoneyHistory ? data.collectMoneyHistory.remark : ''
      }, ({
            msg
          }) => {
        this.$Message.error(msg)
      })
    }

    checkDeductRecord() {
      this.deductRecordModal = true
      let _record: any = this.$refs['deduct-record']
      _record.refresh(this.rowObj)
    }
    fileNumber(item){
      this.fodderList = item
    }
    /**
     * 增加还款对象
     */
    addObj() {
      console.log('add')
      this.collectMoneyDetails.push({
        collectMoneyAmount: '',
      })
    }

    /**
     * 删除还款对象
     */
    deleteObj(index) {
      console.log('add')
      this.collectMoneyDetails.splice(index, 1)
      this.inputBlur()
    }

    /**
     * 计算总计
     */
    inputBlur() {
      let sum: any = 0
      this.collectMoneyDetails.forEach(v => {
        sum = sum + (Number(v.collectMoneyAmount) || 0)
      })
      console.log(sum)
      this.paymentAmount = sum
    }

    selectWay(code, item) {
      let target: any = this.collectMoneyItemModel.find((d) => d.itemCode === code)
      if (target) {
        item.collectMoneyAmount = target.itemMoney
        this.inputBlur()
      }
    }
  }

</script>

<style lang="less" scoped>
  .component.confirm-withdraw {
    .modal-item-kehuxinxi {
      width: 7px;
      height: 20px;
      background: #265EA2;
      display: inline-block;
      margin-right: 6px;
      position: relative;
      top: 4px;
    }
    .modal-item-grid {
      margin-top: 10px
    }
    .modal-item-table {
      margin-top: 10px;
      text-align: center;
      border: 1px solid #DDDEE1
    }
    .modal-item-heji {
      font-weight: 700;
      font-size: 14px
    }
    .modal-item-fujian {
      margin-top: 10px;
      .modal-item-fujianbox {
        width: 7px;
        height: 20px;
        background: #265EA2;
        display: inline-block;
        margin-right: 6px;
        position: relative;
        top: 4px;
      }
    }
    .modal-item-resources {
      margin-top: 10px;
      margin-bottom: 10px;
      .modal-item-resources-col {
        display: flex;
        align-items: center;
        margin-top: 10px;
        flex-direction: column
      }
      .modal-item-resources-div {
        height: 40px;
        line-height: 40px;
        font-size: 14px
      }
    }
    .modal-item-huakoujilu {
      margin-top: 10px;
      .modal-item-huakoujilu-button {
        float: right;
        margin-bottom: 10px;
      }
    }

    .modal-item-shoukuanfangshi {
      width: 7px;
      height: 20px;
      background: #265EA2;
      display: inline-block;
      margin-right: 6px;
      position: relative;
      top: 4px;
      .modal-item-shoukuanfangshi-icon {
        color: #199ED8;
        cursor: pointer
      }
      .modal-item-shoukuanfangshi-select {
        display: inline-block;
        width: 90%
      }
    }
    .modal-item-querenhuakou-input {
      display: inline-block;
      width: 30%;
      margin-right: 10px
    }
    .modal-item-yichuli-icon {
      margin-left: 6px;
      cursor: pointer
    }
    .modal-item-heji-td {
      font-weight: 700;
      font-size: 14px
    }
    .modal-item-beizhu-input {
      width: 100%;
      display: block;
    }
    .modal-item-shoukuanpingzheng {
      margin-top: 10px;
      margin-bottom: 10px;
      .modal-item-shoukuanpingzheng-box {
        width: 7px;
        height: 20px;
        background: #265EA2;
        display: inline-block;
        margin-right: 6px;
        position: relative;
        top: 4px;
      }
    }
    .modal-item-addfujian {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      .modal-item-addfujianbox {
        height: 200px;
        width: 200px;
        cursor: pointer;
        text-align: center;
        background-color: rgb(244, 244, 244);
        .modal-item-addfujianbox-icon {
          display: block;
          margin-top: 40px;
        }
        .modal-item-addfujianbox-tianjia {
          margin-top: 5px
        }
        .modal-item-addfujianbox-text {
          color: gray
        }
      }
    }
    .modal-item-url {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      .modal-item-img {
        height: 200px;
        width: 200px;
      }
    }
  }

</style>
