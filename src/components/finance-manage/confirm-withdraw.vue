<!--确认收回-->
<template>
  <section class="component confirm-withdraw">
    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>客户信息</span>
    </div>
    <data-grid :labelWidth="90" labelAlign="left" contentAlign="left" style="margin-top:10px">
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
          <div>{{repaymentObj.periods}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="月供（元）" :span="2">
        <template>
          <div>{{repaymentObj.monthlySupply}}</div>
        </template>
      </data-grid-item>
    </data-grid>

    <table border="1" width="868" style="margin-top:10px;text-align:center;border:1px solid #DDDEE1">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="1" width="40%">项目</td>
        <td bgcolor="#F2F2F2" colspan="1" width="60%">金额（元）</td>
      </tr>
      <tr height="40">
        <td>违约费</td>
        <td>{{repaymentObj.violateAmount}}</td>
      </tr>
      <tr height="40">
        <td>手续费</td>
        <td>{{repaymentObj.advanceRevokeFee}}</td>
      </tr>
      <tr height="40">
        <td>合计</td>
        <td style="font-weight:700;font-size:14px">{{repaymentObj.totalPayment}}</td>
      </tr>
    </table>
    <div style="margin-top:10px;">
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>附件</span>
    </div>
    <div style="margin-top:10px;margin-bottom:10px;">
      <i-row>
        <i-col :span="6" v-for="(v,i) in applicationPhaseResources" :key="v.id" style="display:flex;align-items:center;margin-top:10px;flex-direction:column">
          <div :style="`height:150px;width:150px;border:1px solid #C2C2C2;background-image:url(${v.materialUrl});background-repeat:no-repeat;`">
          </div>
          <div style="height:40px;line-height:40px;font-size:14px">{{v.originName}}</div>
        </i-col>
      </i-row>
    </div>
    <div style="margin-top:10px;">
      <!--<span style="font-size:14px;font-weight:bold;position:relative;top:20px;">还款总额：1010<span></span></span>-->
      <i-button class="blueButton" style="float:right;margin-bottom:10px;" @click="checkDeductRecord">查看划扣记录</i-button>
    </div>

    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>收款方式</span>
    </div>
    <table border="1" width="868" style="margin-top:10px;text-align:center;border:1px solid #DDDEE1">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="1" width="5%">
          <div @click="addObj">
            <i-icon type="plus" style="color:#199ED8;cursor:pointer"></i-icon>
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
            <i-icon type="minus" style="color:#199ED8;cursor:pointer"></i-icon>
          </div>
        </td>
        <td>
          <i-select placeholder="选择结算通道" style="display:inline-block;width:90%" v-model="v.collectMoneyChannel">
            <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </td>
        <td>
          <i-select placeholder="选择收款项目" style="display:inline-block;width:90%" v-model="v.collectItem">
            <i-option v-for="{value,label} in $dict.getDictData('0113')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </td>
        <td>
          <i-input style="display:inline-block;width:30%;margin-right:10px" v-model="v.collectMoneyAmount" @on-blur="inputBlur"></i-input>
          <i-button class="blueButton">确认划扣</i-button>
        </td>
        <td><span>已处理</span>
          <i-icon type="loop" size="20" color="#199ED8" style="margin-left:6px;cursor:pointer"></i-icon>
        </td>
      </tr>
      <tr height="40">
        <td></td>
        <td width="25%">合计（元）</td>
        <td  colspan="3" style="font-weight:700;font-size:14px">{{paymentAmount}}</td>
      </tr>
    </table>
    <i-form>
      <i-form-item label="备注">
        <i-input type="textarea" v-model="remark" style="width:100%;display:block;"></i-input>
      </i-form-item>
    </i-form>

    <div style="margin-top:10px;margin-bottom:10px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>收款凭证</span>
      </div>
      <!--<i-button class="blueButton" style="float:right">凭证上传</i-button>
      <i-button class="blueButton" style="float:right">全部下载</i-button>-->

      <i-row>
        <i-col :span="8" style="display:flex;justify-content:center;;margin-top:10px">
          <div style="height:200px;width:200px;border:1px solid #C2C2C2;cursor:pointer;text-align:center;">
            <Icon type="plus-circled" style="display:block;margin-top:53px;" color="#265ea2" size="40"></Icon>
            <div>点击添加附件</div>
            <span style="color:gray">支持jpg/pdf/png格式建议大小不超过10M</span>
          </div>
        </i-col>
        <i-col :span="8" v-for="(v,i) in financeUploadResources" :key="v.id" style="display:flex;justify-content:center;margin-top:10px">
          <div :style="`height:200px;width:200px;border:1px solid #C2C2C2;background-image:url(${v.materialUrl});background-repeat:no-repeat;`">
          </div>
        </i-col>
      </i-row>
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
  } from "vue-fintech-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    AdvanceRevokeService
  } from "~/services/manage-service/advance-revoke.service";

  @Component({
    components: {
      DataBox,
      DataGrid,
      DataGridItem,
      DeductRecord
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

    refresh(row) {
      this.rowObj = row
      this.advanceRevokeService.getAdvanceRevokeBillInfo({
        orderId: row.orderId
      }).subscribe(data => {
        console.log(data)
        this.repaymentObj = data
        this.collectMoneyDetails = data.collectMoneyDetails || []
        this.financeUploadResources = data.collectMoneyPhaseResources
        this.applicationPhaseResources = data.applicationPhaseResources
        this.inputBlur()
        this.remark = data.collectMoneyHistory.remark
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
    /**
     * 增加还款对象
     */
    addObj() {
      console.log('add')
      this.collectMoneyDetails.push({
        collectMoneyAmount: '',
        collectMoneyMethod: ''
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
    created() {
    }

  }

</script>

<style lang="less" scope>


</style>
