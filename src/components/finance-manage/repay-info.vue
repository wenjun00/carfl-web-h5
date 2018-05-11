<!--还款详情-->
<template>
  <section class="component repay-info">
    <i-row class="modal-item">
      <span>客户姓名：{{repayObj.customerName}}</span>
      <span class="modal-item-dingdanhao">订单号：{{repayObj.orderNumber}}</span>
    </i-row>
    <i-table ref="table" class="i-table" :columns="columns1" :data="repayList" stripe size="small"></i-table>

    <template>
      <i-modal title="还款记录" v-model="repayRecordModal" :width="1000">
        <repay-record ref="repay-record"></repay-record>
        <div slot="footer">
          <i-button @click="repayRecordModal=false" class="highDefaultButton">关闭</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="addAttachmentModal" title="补传凭证" :width="900" :transfer="false">
        <upload-voucher @financeUploadResources="fileNumber" ref="upload-voucher-two"></upload-voucher>
        <div slot="footer">
          <i-button @click="cancelOne">取消</i-button>
          <i-button @click="confirmOne" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import RepayRecord from '~/components/finance-manage/repay-record.vue'
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    PaymentScheduleService
  } from "~/services/manage-service/payment-schedule.service";
  import {
    FilterService
  } from "~/utils/filter.service"
  import UploadVoucher from "~/components/common/upload-voucher.vue"

  @Component({
    components: {
      DataBox,
      RepayRecord,
      UploadVoucher
    }
  })
  export default class RepayInfo extends Vue {
    @Dependencies(PaymentScheduleService) private paymentScheduleService: PaymentScheduleService;
    private repayObj: any = {
      customerName: '',
      orderNumber: ''
    };
    private rowObj: any = {};
    private columns1: any;
    private repayList: Array<Object> = [];
    private repayRecordModal: Boolean = false;
    private addAttachmentModal: Boolean = false;
    private fodderList:any = []
    private periods:any = '' //当期期数
    private backFile:any = [] //当期返现数据

    refresh(row) {
      this.repayList = []
      this.repayObj.customerName = ''
      this.repayObj.orderNumber = ''
      this.rowObj = row
      this.getRepayInfo()
    }

    getRepayInfo() {
      this.paymentScheduleService.getPaymentScheduleDetail({
        orderId: this.rowObj.orderId
      }).subscribe(data => {
        console.log(data)
        this.repayObj.customerName = data.customerName
        this.repayObj.orderNumber = data.orderNumber
        this.repayList = data.paymentDetails
      }, ({
            msg
          }) => {
        this.$Message.error(msg)
      })
    }
    fileNumber(item){
      this.fodderList = item
    }
    created() {
      this.columns1 = [{
        key: "periods",
        title: '序号',
        align: 'center',
        width: 50
      },
        {
          title: "操作",
          width: 150,
          align: "center",
          fixed: "left",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.addAttachmentModal = true
                    this.periods = row.periods
                    this.paymentScheduleService.getFinanceUploadResource({ periods:row.periods,orderNumber:this.rowObj.orderNumber})
                      .subscribe( data =>{
                        this.backFile = data
                        let uploadVoucherOne = this.$refs['upload-voucher-two'] as UploadVoucher
                        uploadVoucherOne.Reverse(data)
                      },({msg}) => {
                        this.$Message.error(msg)
                      })
                  }
                },
                style: {
                  color: '#265EA2'
                }
              }, '补传凭证'),
              h('i-button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.repayRecordModal = true
                    let _record: any = this.$refs['repay-record']
                    _record.refresh(this.rowObj, row)
                  }
                },
                style: {
                  color: '#265EA2'
                }
              }, '还款记录')
            ])
          }
        },
        {
          title: '还款状态',
          key: 'paymentStatus',
          align: 'center',
          width: 90,
          render: (h, {row, column, index}) => {
            return h("span", {}, this.$dict.getDictName(row.paymentStatus));
          }
        },
        {
          title: '应付款日',
          key: 'paymentDay',
          align: 'center',
          width: 100,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.paymentDay, 'yyyy-MM-dd'))
          }
        },
        {
          title: '实际付款日',
          key: 'actualPaymentDay',
          align: 'center',
          width: 100,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.actualPaymentDay, 'yyyy-MM-dd'))
          }
        },
        {
          title: '逾期天数',
          key: 'overdueDay',
          align: 'center',
          width: 90
        },
        {
          title: '罚息费率',
          key: 'penaltyRate',
          align: 'center',
          width: 90
        },
        {
          title: '每日罚息',
          key: 'penaltyDay',
          align: 'center',
          width: 90
        },
        {
          title: '应收总金额',
          key: 'sum',
          align: 'center',
          width: 90
        },
        {
          title: '罚金',
          key: 'penalSum',
          align: 'center',
          width: 90
        },
        {
          title: '开票日',
          key: 'invoiceDay',
          align: 'center',
          width: 100,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.invoiceDay, 'yyyy-MM-dd'))
          }
        },
        {
          title: '应收租金',
          key: 'rentReceivable',
          align: 'center',
          width: 90
        },
        {
          title: '应收本金',
          key: 'principalReceivable',
          align: 'center',
          width: 90
        },
        {
          title: '应收利息',
          key: 'interestReceivable',
          align: 'center',
          width: 90
        },
        {
          title: '应收罚息',
          key: 'penaltyReceivable',
          align: 'center',
          width: 90
        },
        {
          title: '应收管理费',
          key: 'manageFeeReceivable',
          align: 'center',
          width: 90
        },
        {
          title: '减免本金',
          key: 'principalDerate',
          align: 'center',
          width: 90
        },
        {
          title: '减免利息',
          key: 'interestDerate',
          align: 'center',
          width: 90
        },
        {
          title: '减免罚息',
          key: 'penaltyDerate',
          align: 'center',
          width: 90
        },
        {
          title: '冻结罚息',
          key: 'penaltyFreeze',
          align: 'center',
          width: 90
        },
        {
          title: '实收本金',
          key: 'principalReceived',
          align: 'center',
          width: 90
        },
        {
          title: '实收利息',
          key: 'interestReceived',
          align: 'center',
          width: 90
        },
        {
          title: '实收罚息',
          key: 'penaltyReceived',
          align: 'center',
          width: 90
        },
        {
          title: '实收管理费',
          key: 'manageFeeReceived',
          align: 'center',
          width: 90
        },
        {
          title: '剩余本金',
          key: 'principalSurplus',
          align: 'center',
          width: 90
        },
        {
          title: '剩余利息',
          key: 'interestSurplus',
          align: 'center',
          width: 90
        },
        {
          title: '剩余罚息',
          key: 'penaltySurplus',
          align: 'center',
          width: 90
        },
        {
          title: '剩余管理费',
          key: 'manageFeeSurplus',
          align: 'center',
          width: 90
        }
      ]
    }
    cancelOne() {
      this.addAttachmentModal = false
    }
    confirmOne() {
      if(this.fodderList.length === 0){
        this.fodderList = this.backFile
      }
      this.paymentScheduleService.saveScheduleUploadResources({ periods:this.periods,orderNumber:this.rowObj.orderNumber,financeUploadResources:this.fodderList})
        .subscribe( data => {
          this.$Message.success("保存成功")
          this.addAttachmentModal = false
          let uploadVoucherOne = this.$refs['upload-voucher-two'] as UploadVoucher
          uploadVoucherOne.reset()
        },({msg}) => {
         this.$Message.error(msg)
        })
    }
  }

</script>

<style lang="less" scoped>
  .component.repay-info {
    .modal-item {
      line-height: 25px;
      font-size: 14px;
      padding-bottom: 10px
    }
    .modal-item-dingdanhao{
      margin-left:10px
    }
  }

</style>
