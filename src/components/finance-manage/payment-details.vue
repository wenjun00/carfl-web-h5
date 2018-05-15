<!--收款详情-->
<template>
  <section class="component payment-details">
    <i-form :model="paymentDetailsModel" ref="form-item" :label-width="90">
      <i-row class="head">
        <i-col :span="3">
          <span>收款类型</span>
        </i-col>
        <i-col :span="6">
          <span>{{this.$dict.getDictName(this.paymentDetailsModel.applicationType)}}</span>
        </i-col>
      </i-row>
      <i-row class="noteBox head">
        <i-col :span="3">
          <span>备注</span>
        </i-col>
        <i-input v-model="paymentDetailsModel.remark" readonly type="textarea"></i-input>
      </i-row>
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">收款明细</a>
        </i-col>
      </i-row>
      <i-row>
        <i-table :columns="columnsdata" :data="dataOne"></i-table>
      </i-row>
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">收款方式</a>
        </i-col>
      </i-row>
      <i-row>
        <i-table :columns="columnsdataTwo" :data="dataTwo"></i-table>
      </i-row>
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">账户信息</a>
        </i-col>
      </i-row>
       <i-row>
        <i-table :columns="columnsdataThree" :data="dataThree"></i-table>
      </i-row>
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">收款凭证</a>
        </i-col>
      </i-row>
      <i-row class="adjunct">
        <upload-voucher hiddenUpload ref="upload-voucher"></upload-voucher>
      </i-row>


    </i-form>
  </section>
</template>


<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component"
  import ChangeCard from "~/components/purchase-manage/change-card.vue"
  import {PaymentScheduleService} from "~/services/manage-service/payment-schedule.service"
  import {Dependencies} from "~/core/decorator"
  import UploadVoucher from "~/components/common/upload-voucher.vue"
  import {FinanceInvoiceService} from '~/services/manage-service/finance-invoice.service'

  @Component({
    components: {
      ChangeCard,
      UploadVoucher
    }
  })
  export default class CheckAttachment extends Vue {
    @Dependencies(PaymentScheduleService) private paymentScheduleService: PaymentScheduleService;
    @Dependencies(FinanceInvoiceService) private financeInvoiceService: FinanceInvoiceService
    private paymentDetailsModel: any = {}
    private dataOne: Array<any> = []
    private dataThree: any = [
      {
        personalName:'',     // 户名
        depositBank:null,      // 开户银行
        cardNumber:null,       // 银行卡号
        depositBranch:'',    // 支行名称
        clientNumber:'',     // 第三方客户号
      }
    ]
     private dataTwo:any=[{
        collectMoneyChannel:null,     // 还款渠道
        totalPayment:'',            // 还款金额
     }]

    private fodderList: any = [];
    private columnsdata: any = [
      {
        title: '项目名称',
        editable: true,
        key: 'itemInvoice',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3),
         render: (h, { row }) => {
        return h('span', {}, this.$dict.getDictName(row.itemInvoice))
      }
      },
      {
        title: '金额',
        editable: true,
        key: 'itemMoney',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)

      },
    ]

    private columnsdataTwo: any = [{
        title: '还款渠道',
        editable: true,
        key: 'collectMoneyChannel',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) => {
          return h('span', {}, this.$dict.getDictName(row.collectMoneyChannel))
        }

      },
      {
        title: '金额',
        editable: true,
        key: 'totalPayment',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)
      },
    ]
    private columnsdataThree: any = [{
        title: '户名',
        editable: true,
        key: 'personalName',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        title: '开户银行',
        editable: true,
        key: 'depositBank',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) => {
          return h('span', {}, this.$dict.getDictName(row.depositBank))
        }

      },
       {
        title: '银行卡号',
        editable: true,
        key: 'cardNumber',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)
      },
        {
        title: '支行名称',
        editable: true,
        key: 'depositBranch',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        title: '第三方客户号',
        editable: true,
        key: 'clientNumber',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)
      },
    ]
    private data1 =[]
    private id = {
       orderId:'',
       collectMoneyDetailId:'',
    }
      
    

  /**
   * 获取收款详情
   */
  obtainDetails(a,b){
    this.id.orderId = b
    this.id.collectMoneyDetailId = a
     this.financeInvoiceService
      .getCollectMoneyDetail(this.id)
      .subscribe(
      val => {
        this.paymentDetailsModel = val
        this.dataOne = val.collectMoneyItemModels
        this.dataThree[0].personalName = !!val.personalBank.personalName ?val.personalBank.personalName:''
        this.dataThree[0].depositBank = !!val.personalBank.depositBank?Number(val.personalBank.depositBank):null
        this.dataThree[0].cardNumber  = !!val.personalBank.cardNumber?val.personalBank.cardNumber:null
        this.dataThree[0].depositBranch = !!val.personalBank.depositBranch?val.personalBank.depositBranch:''
        this.dataThree[0].clientNumber = !!val.personalBank.clientNumber?val.personalBank.clientNumber:''
        this.dataTwo[0].collectMoneyChannel = !!val.collectMoneyChannel?Number(val.collectMoneyChannel):null
        this.dataTwo[0].totalPayment = !!val.totalPayment?val.totalPayment:0
        let uploadFodder: any = this.$refs['upload-voucher']
        uploadFodder.Reverse(val.applicationPhaseUploadResources)
        console.log(this.dataTwo)
       
      },
      ({
            msg
          }) => {
        this.$Message.error(msg)
      }
      )

    // console.log(a)
    // console.log(b)
  }





  }

</script>

<style lang="less" scoped>
  .component.payment-details {
    // .table{
    //   width: 720px;
    //   height: 75px;
    // }
    // .elasticBox{
    //   display: flex;
    //   justify-content: center;
    // }
    .adjunct {
      min-height: 50px;
    }
    .head {
      font-size: 14px;
      margin-bottom: 20px;
    }
    .data-form {
      margin-bottom: 20px;
      margin-top: 5px;
      .data-form-item {
        width: 7px;
        height: 25px;
        background: #1d4f88;
        display: inline-block;
        margin-right: 6px;
        position: relative;
        top: 4px;
      }
      .information {
        font-size: 16px;
        color: black;
      }
    }
  }

</style>
<style lang="less">
  .component.payment-details {
    .noteBox {
      .ivu-input-wrapper.ivu-input-type {
        width: 630px
      }
    }
  }

</style>
