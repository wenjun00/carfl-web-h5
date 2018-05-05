<!--添加新申请-->
<template>
  <section class="component apply-detail">
    <!--付款申请-->
    <i-form :rules="applyRules" :label-width="110" class="item-kehu-form">
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
          <i-form-item label="选择订单">
            <i-input v-model="orderNumber" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="备注">
            <i-input type="textarea" v-model="remark" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
    <i-card title="付款明细">
      <i-table :columns="columns1" :data="payDetail" :noDefaultRow="true"></i-table>
    </i-card>
    <i-card title="账户信息">
      <i-table :columns="columns3" :data="accountDetail"></i-table>
    </i-card>
    <i-card title="附件">
      <upload-voucher ref="upload-voucher" hiddenUpload hiddenDelete></upload-voucher>
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
export default class ApplyDetail extends Vue {
  @Prop() orderType;
  addAttachmentShow: Boolean;
  private applyType: String = "销售收款申请";
  private payDetail: Array<Object> = [];
  private columns1: any;
  private columns3:any;
  private accountDetail: Array<Object> = [];
  private fileList: Array<Object> = [];
  private addNewApplyModal: any = {
    name: "",
    idCard: ""
  };
  private fodderList: any = [];
  private refundType: String = "";
  private remark: String = "";
  private orderNumber: String = "";
  private type: any = "";
  private applyRules: any = {}
  getparentData(val, row, type) {
    //   上传资料反显
    this.type = type
    let _uploadFodder: any = this.$refs['upload-voucher']
    _uploadFodder.Reverse(val.applicationPhaseUploadResources)
    this.orderNumber = val.orderNumber; // 订单号
    this.addNewApplyModal.name = val.customerName; // 客户姓名
    this.payDetail = val.collectMoneyItemModels; // 付款明细
    this.addNewApplyModal.idCard = val.idCard; // 证件号
    this.remark = val.remark;
    this.refundType = val.applicationType ? this.$dict.getDictName(val.applicationType) : ""; // 付款类型
    this.accountDetail = val.personalBank || []; // 账户信息
  }

  created() {
    this.applyRules = {
      idCard: [{
        validator: this.$validator.idCard,
        trigger: "blur"
      }]
    };
    this.columns1 = [
      {
        title: "项目名称",
        key: "itemLabel",
        align: "center",
      },
      {
        title: "金额",
        key: "itemMoney",
        align: "center"
      }
    ];
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
}
</script>
<style lang="less" scoped>

</style>
