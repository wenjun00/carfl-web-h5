<!--财务开票-->
<template>
  <section class="page finance-make-invoice">
    <span class="form-title">财务开票</span>
    <span style="margin-left:10px;">关键字：</span>
    <i-input style="display:inline-block;width:10%" placeholder="客户姓名\发票号"></i-input>
    <i-select placeholder="开票状态" style="margin-left:10px;width:10%">
      <i-option label="已开票" value="已开票" key="已开票"></i-option>
      <i-option label="未开票" value="未开票" key="未开票"></i-option>
    </i-select>
    <i-button style="margin-left:10px" class="blueButton">搜索</i-button>
    <i-button @click="openSearch" style="margin-left:10px;color:#265EA2">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>
      <span>高级搜索</span>
    </i-button>
    <i-row v-if="searchOptions" style="margin:6px;">
      <span>所属公司：</span>
      <i-select style="margin-left:10px;width:15%" placeholder="全部机构">
        <i-option value="群泰上海" key="群泰上海" label="群泰上海"></i-option>
        <i-option value="群泰西安" key="群泰西安" label="群泰西安"></i-option>
      </i-select>
      <span>状态筛选：</span>
      <i-select style="margin-left:10px;width:15%" placeholder="全部项目">
        <i-option value="汇付" key="汇付" label="汇付"></i-option>
        <i-option value="富友" key="富友" label="富友"></i-option>
        <i-option value="支付宝" key="支付宝" label="支付宝"></i-option>
        <i-option value="现金" key="现金" label="现金"></i-option>
      </i-select>
      <i-select style="margin-left:10px;width:15%" placeholder="全部状态">
        <i-option value="汇付" key="汇付" label="汇付"></i-option>
        <i-option value="富友" key="富友" label="富友"></i-option>
        <i-option value="支付宝" key="支付宝" label="支付宝"></i-option>
        <i-option value="现金" key="现金" label="现金"></i-option>
      </i-select>
      <span>付款日期：</span>
      <i-date-picker style="width:10%"></i-date-picker>~
      <i-date-picker style="width:10%"></i-date-picker>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>
    <div class="submitBar">
      <i-row type="flex" align="middle" style="padding:5px">
        <i-col :span="8" push="1">
          <span>申请人：administrator</span>
        </i-col>
        <i-col :span="10" pull="4">
          <span>申请时间： 2017-12-01 13:56:45</span>
        </i-col>
        <i-col :span="6" style="text-align:right;">
          <!--<i-button @click="oneKeyToConnect" class="highButton">一键交接</i-button>-->
          <i-button class="highButton" @click="confirmMakeInvoice">确认开票</i-button>
        </i-col>
      </i-row>
    </div>
    <template>
      <i-modal v-model="makeInvoiceModal" title="确认开票" width="600" class="confirmMakeInvoice">
        <confirm-make-invoice></confirm-make-invoice>
      </i-modal>
    </template>

    <template>
      <i-modal title="查看附件" v-model="checkAttachmentModal">
        <check-attachment></check-attachment>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import ConfirmRepayment from "~/components/finance-manage/confirm-repayment.vue";
  import DeductRecord from "~/components/finance-manage/deduct-record.vue";
  import RepayInfo from "~/components/finance-manage/repay-info.vue";
  import CheckAttachment from '~/components/finance-manage/check-attachment.vue'
  import ConfirmMakeInvoice from '~/components/finance-manage/confirm-make-invoice.vue'
  import {
    Tooltip
  } from 'iview'
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      ConfirmRepayment,
      DeductRecord,
      RepayInfo,
      CheckAttachment,
      ConfirmMakeInvoice
    }
  })
  export default class FinanceMakeInvoice extends Page {
    private columns1: any;
    private invoiceColumns: any;
    private data1: Array < Object > = [];
    private invoiceData: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private makeInvoiceModal: Boolean = false;
    private checkAttachmentModal: Boolean = false;

    openSearch() {
      this.searchOptions = !this.searchOptions;
    }

    /**
     * 确认开票
     */
    confirmMakeInvoice() {
      this.makeInvoiceModal = true
    }

    created() {
      this.invoiceData = [{
        attachmentName: 'kb0917',
        uploadTime: '2017-12-03 14:56:25',
        uploadPerson: '胡开甲'
      }]

      this.invoiceColumns = [{
          title: '操作',
          width: 200,
          align: 'center',
          render: (h, params) => {

            return h('div', [
              h('Icon', {
                props: {
                  type: 'archive',
                  size: '20'
                },
                style: {
                  cursor: 'pointer',
                  marginRight: '15px',
                  color: '#199ED8'
                },
                on: {
                  click: () => {

                  }
                }
              }),
              h('Icon', {
                props: {
                  type: 'eye',
                  size: '20'
                },
                style: {
                  cursor: 'pointer',
                  marginRight: '15px',
                  color: '#199ED8'
                },
                on: {
                  click: () => {

                  }
                }
              }),
              h('Icon', {
                props: {
                  type: 'trash-a',
                  size: '20'
                },
                style: {
                  cursor: 'pointer',
                  color: '#199ED8'
                },
                on: {
                  click: () => {

                  }
                }
              })
            ])

          }
        },
        {
          title: '附件信息',
          align: 'center',
          key: 'attachmentName'
        },
        {
          align: 'center',
          title: '上传日期',
          key: 'uploadTime',
          width: 180
        },
        {
          align: 'center',
          title: '上传人',
          key: 'uploadPerson'
        }
      ]

      this.columns1 = [{
          align: "center",
          type: "selection",
          width: 60,
          fixed: 'left'
        },
        {
          title: "操作",
          width: 200,
          align: "center",
          fixed: 'left',
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
                    this.checkAttachment(row)
                  }
                },
                style: {
                  color: '#265EA2'
                }
              }, '查看附件'),
              h('i-button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '确定撤销吗？',
                      onOk: () => {
                        this.$Message.info('撤销成功！')
                      }
                    })
                  }
                },
                style: {
                  color: '#265EA2'
                }
              }, '撤销')
            ])
          }
        },
        {
          title: "付款日期",
          key: "orderId",
          align: "center",
          width: 180,          
          render: (h, row) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {

                }
              }
            }, 'kb20154575')
          }
        },
        {
          align: "center",
          title: "客户姓名",
          key: "customerSettleId",
          width: 180,          
          render: (h, row) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {

                }
              }
            }, 'LSK3125465')
          }
        },
        {
          align: "center",
          title: "项目",
          key: "customName",
          width: 180,
        },
        {
          align: "center",
          title: "金额",
          key: "idCard",
          width: 180
        },
        {
          align: "center",
          title: "期数",
          key: "phone",
          width: 180
        },
        {
          align: "center",
          title: "所属公司",
          key: "orderCreateTime",
          width: 180
        },
        {
          align: "center",
          title: "结算通道",
          key: "compactApplyDate",
          width: 180
        },
        {
          align: "center",
          title: "开票状态",
          key: "supposedMajorMoney",
          width: 100
        },
        {
          align: "center",
          title: "发票号",
          key: "supposedInterest",
          width: 100
        },
        {
          align: "center",
          title: "开票日期",
          key: "supposedPunishedInterest",
          width: 100
        },
        {
          align: "center",
          title: "发票抬头",
          key: "interestRate",
          width: 100
        },
        {
          align: "center",
          title: "备注",
          key: "clearAccountChannel",
          width: 100
        }
      ];

      this.data1 = [{
        orderId: 'KB56481456',
        customerSettleId: 'LSK3125465',
        customName: '陈丽',
        idCard: '610303199111414245',
        phone: '18265481548',
        orderCreateTime: '2017-12-03 13:56:03',
        compactApplyDate: '2017-12-03',
        supposedMajorMoney: '800.00',
        supposedPunishedInterest: '12.2',
        supposedInterest: '50.00',
        interestRate: '3.45',
        clearAccountChannel: '支付宝',
        belongFirm: '群泰西安'
      }, {
        orderId: 'KB56481456',
        customerSettleId: 'LSK3125465',
        customName: '陈丽',
        idCard: '610303199111414245',
        phone: '18265481548',
        orderCreateTime: '2017-12-03 13:56:03',
        compactApplyDate: '2017-12-03',
        supposedMajorMoney: '800.00',
        supposedPunishedInterest: '12.2',
        supposedInterest: '50.00',
        interestRate: '3.45',
        clearAccountChannel: '支付宝',
        belongFirm: '群泰西安'
      }, {
        orderId: 'KB56481456',
        customerSettleId: 'LSK3125465',
        customName: '陈丽',
        idCard: '610303199111414245',
        phone: '18265481548',
        orderCreateTime: '2017-12-03 13:56:03',
        compactApplyDate: '2017-12-03',
        supposedMajorMoney: '800.00',
        supposedPunishedInterest: '12.2',
        supposedInterest: '50.00',
        interestRate: '3.45',
        clearAccountChannel: '支付宝',
        belongFirm: '群泰西安'
      }]

      this.columns2 = [{
          title: "序号",
          type: "index",
          width: "80",
          align: "center"
        },
        {
          title: "列名",
          key: "columnsName",
          align: "center"
        },
        {
          type: "selection",
          width: "80",
          align: "center"
        }
      ];
      this.data2 = [{
          columnsName: "订单号"
        },
        {
          columnsName: "客户结算号"
        },
        {
          columnsName: "客户姓名"
        },
        {
          columnsName: "证件号"
        },
        {
          columnsName: "手机号"
        },
        {
          columnsName: "订单创建时间"
        },
        {
          columnsName: "合同生效日"
        },
        {
          columnsName: "代还本金"
        },
        {
          columnsName: "代还利息"
        },
        {
          columnsName: "代还罚息"
        },
        {
          columnsName: "利率%/月"
        },
        {
          columnsName: "结算通道"
        },
        {
          columnsName: "归属公司"
        }
      ];
    }
    columnsConfig() {
      this.openColumnsConfig = true;
    }
    /**
     * 确定
     */
    confirm() {}
    /**
     * 查看附件
     */
    checkAttachment(row) {
      this.checkAttachmentModal = true
    }
  }

</script>

<style lang="less">


</style>
