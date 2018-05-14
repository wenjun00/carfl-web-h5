<!--确认开票-->
<template>
  <div class="component confirm-make-invoice">
    <i-form :label-width="110" :model="affirmMake" ref="from-data">
      <i-row>
        <i-col :span="12">
          <i-form-item label="开票金额">
            <i-input readonly class="modal-item-input" v-model="affirmMake.invoicingAmount"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item class="modal-item-input" label="发票抬头">
            <i-input v-model="affirmMake.invoiceTitle" class="modal-item-input"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="开票日期">
            <i-date-picker v-model="affirmMake.invoicingDate" size="default"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="发票号">
            <i-input v-model="affirmMake.invoiceNumber" class="modal-item-input"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="备注" class="remarks">
            <i-input v-model="affirmMake.remark" type="textarea"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
    <!--发票-->

    <i-row class="modal-item">
      <div>
        <div class="modal-item-fapiao"></div>
        <span>发票</span>
      </div>
      <i-row class="modal-item-fujian">
        <upload-voucher @financeUploadResources="fileNumber" ref="upload-voucher"></upload-voucher>
      </i-row>
    </i-row>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {Prop} from "vue-property-decorator";
  import {Action} from "vuex-class";
  import UploadVoucher from "~/components/common/upload-voucher.vue";
  import { FinanceInvoiceService} from '~/services/manage-service/finance-invoice.service'
  import {Dependencies} from '~/core/decorator'
  @Component({
    components: {
      UploadVoucher
    }
  })
  export default class ConfirmMakeInvoice extends Vue {
    @Dependencies(FinanceInvoiceService) private financeInvoiceService: FinanceInvoiceService
    private single: Boolean = false;
    private fodderList: any = [];

    private affirmMake: any = {
      invoicingAmount: 0, // 开票金额
      invoiceTitle: '', // 发票头部
      invoiceNumber: '', // 发票号
      invoicingDate: '', // 开票日期
      remark: '', // 备注
      collectMoneyDetailIds:[],     //id
      financeUploadResources:[],    //图片
    }

    /**
     *上传图片
     */
    fileNumber(item) {
      this.affirmMake.financeUploadResources = item;
    }

    /**
     * 单选获取id 和金额
     */
    saveMake(a, b) {
      this.affirmMake.collectMoneyDetailIds =[]
      this.affirmMake.invoicingAmount = 0
      this.affirmMake.collectMoneyDetailIds.push(a) 
      this.affirmMake.invoicingAmount = Number(b) 
    }
    /**
     * 多选点击确定
     */
    allMakeInvoice(a,b){
      this.affirmMake.collectMoneyDetailIds =[]
      this.affirmMake.invoicingAmount = 0
      this.affirmMake.collectMoneyDetailIds = a 
      this.affirmMake.invoicingAmount = Number(b) 
    }

    /**
     * 新增单个点击确定
     */
    makeInvoice() {
       this.financeInvoiceService
        .saveFinanceInvoiceRecord(this.affirmMake)
        .subscribe(
          val => {
            this.$Message.success('确认开票成功')
            this.$emit("close");
          },
          ({
            msg
          }) => {
            this.$Message.error(msg)
          }
        )
    }
    /**
     * 关闭弹窗数据清空
     */
    allCloseEmpty(){
      this.$common.reset(this.affirmMake);
      this.affirmMake.invoicingDate = ''
       let uploadFodder: any = this.$refs['upload-voucher']
      uploadFodder.reset()
    }
    


  }

</script>

<style scoped lang="less">
  .confirm-make-invoice {
    .ivu-form {
      position: relative;
      right: 30px;
    }
  }

  .component.confirm-make-invoice {
    .modal-item {
      margin-top: 20px;
    }
    .modal-item-fapiao {
      width: 7px;
      height: 20px;
      background: #265ea2;
      display: inline-block;
      margin-right: 6px;
      position: relative;
      top: 4px;
    }
    .modal-item-fujian {
      margin-top: 10px;
    }
    .modal-item-fujian-div {
      height: 200px;
      width: 200px;
      border: 1px solid #c2c2c2;
      cursor: pointer;
      text-align: center;
      position: relative;
      left: 40px;
    }
    .modal-item-fujian-icon {
      display: block;
      margin-top: 53px;
      color: #265ea2;
    }
    .modal-item-fujian-text {
      color: gray;
    }
    .modal-item-div {
      height: 200px;
      width: 200px;
      border: 1px solid #c2c2c2;
      background-image: url("/static/images/common/invoice2.png");
      background-repeat: no-repeat;
      position: relative;
      left: 72px;
    }
    .modal-item-input {
      width: 200px;
    }
  }

</style>
<style lang="less">
  .component.confirm-make-invoice {
    .remarks {
      .ivu-input-wrapper.ivu-input-type {
        width: 535px;
      }
    }
  }

</style>
