<!--放款审批-->
<template>
  <section class="component apply-out">
    <!--放款审批-->
    <i-form  :label-width="110" class="item-kehu-form">
      <i-row>
        <i-col :span="12">
          <i-form-item label="客户姓名">
            <i-input v-model="addNewApplyModal.name" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="身份证号">
            <i-input v-model="addNewApplyModal.idCard" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="订单编号">
            <i-input v-model="orderNumber" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="备注">
            <i-input type="textarea" v-model="remark" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
    <i-card title="放款明细">
      <table class="modal-item-table" border="1" width="100%">
        <tr height="40">
          <td class="bg-color" colspan="1" width="40%">项目</td>
          <td class="bg-color" colspan="1" width="60%">金额（元）</td>
        </tr>
        <tr height="40" v-for="item in payDetail" :key="item.id">
          <td>{{item.refundItem}}</td>
          <td>{{item.refundAmount}}</td>
        </tr>
        <tr height="40">
          <td>合计(元)</td>
          <td>{{refundTotalAmount}}</td>
        </tr>
      </table>
    </i-card>
    <i-card title="账户信息">
      <i-table :columns="columns3" :data="accountDetail"></i-table>
    </i-card>
    <i-card title="附件">
      <upload-voucher ref="upload-voucher" @financeUploadResources="fileNumber"></upload-voucher>
    </i-card>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import { Prop } from "vue-property-decorator";
  import UploadVoucher from "~/components/common/upload-voucher.vue"
  import BankInfo from "~/components/base-data/bank-info.vue"

  @Component({
    components: {
      DataBox,
      UploadVoucher,
      BankInfo
    }
  })
  export default class ApplyOut extends Vue {
    @Prop() orderType;
    private payDetail: any = [];
    private columns1: any;
    private columns3:any;
    private accountDetail: any = [];
    private addNewApplyModal = {
      name: "",
      idCard: ""
    };
    private fodderList: any = [];
    private remark: String = "";
    private orderNumber: String = "";
    private type: any = "";
    private refundTotalAmount :any = ''
    getparentreceipt(val, row, type) {
      //   上传资料反显
      this.type = type
      let _uploadFodder: any = this.$refs['upload-voucher']
      _uploadFodder.Reverse(val.applicationPhaseUploadResources)
      this.orderNumber = !!val.orderNumber ? val.orderNumber:'' ; // 订单号
      this.addNewApplyModal.name = !!val.customerName ? val.customerName:''; // 客户姓名
      this.payDetail = !!val.collectMoneyItemModels ? val.collectMoneyItemModels:[{}]; // 付款明细
      this.addNewApplyModal.idCard = !!val.idCard ? val.idCard : ''; // 证件号
      this.remark = !!val.remark ? val.remark:'' ;
      this.accountDetail = !!val.personalBank ? this.accountDetail.concat(val.personalBank) :[{}]; // 账户信息
      this.refundTotalAmount = !!val.refundTotalAmount ? val.refundTotalAmount:'' ;
    }
    created() {
      this.columns3 = [
        {
          title: "户名",
          align: "center",
          key: "personalName"
        },
        {
          title: "开户银行",
          align: "center",
          key: "depositBank"
        },
        {
          title: "银行卡号",
          align: "center",
          key: "cardNumber"
        },
        {
          title: "支行名称",
          align: "center",
          key: "depositBranch"
        },
        {
          title: "第三方客户号",
          align: "center",
          key: "clientNumber"
        }
      ];
    }
    reset(){
      this.accountDetail = []
    }
    fileNumber(item) {
      this.fodderList = item;
    }
  }
</script>
<style lang="less" scoped>
  .modal-item-table {
    margin-top: 10px;
    text-align: center;
    border: 1px solid #dddee1;
    .bg-color {
      background-color: #f2f2f2;
    }
  }
</style>
