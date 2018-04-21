<!--确认还款-->
<template>
  <section class="component confirm-repayment">
    <div>
      <div class="modal-kehuxinxi"></div>
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
          <div>{{repaymentObj.periods}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="利率%/月" :span="2">
        <template>
          <div>{{repaymentObj.productRate}}</div>
        </template>
      </data-grid-item>
    </data-grid>

    <table class="modal-item-table" border="1" width="868">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="3">还款</td>
        <td bgcolor="#F2F2F2" colspan="4">明细</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2" width="100px">本金</td>
        <td width="100px">应付本金</td>
        <td width="150px">{{repaymentObj.principalReceivable}}</td>
        <td width="100px">已还本金</td>
        <td width="150px">{{repaymentObj.principalReceived}}</td>
        <td width="100px">剩余本金</td>
        <td>{{repaymentObj.principalSurplus}}</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">利息</td>
        <td>应还利息</td>
        <td>{{repaymentObj.interestReceivable}}</td>
        <td>已还利息</td>
        <td>{{repaymentObj.interestReceived}}</td>
        <td>剩余利息</td>
        <td>{{repaymentObj.interestSurplus}}</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">罚息</td>
        <td>应付罚息</td>
        <td>{{repaymentObj.penaltyReceivable}}</td>
        <td>已还罚息</td>
        <td>{{repaymentObj.penaltyReceived}}</td>
        <td>剩余罚息</td>
        <td>
          <span class="modal-item-derate">{{repaymentObj.penaltyFreezeAddDerate}}</span>
          <span class="modal-item-surplus">{{repaymentObj.penaltySurplus}}</span>
        </td>
        <!--<td><span style="color:red;text-decoration:line-through;margin-right:6px;" >{{repaymentObj.penaltyReceivable}}</span><span>{{repaymentObj.penaltySurplus}}</span></td>-->
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">管理费</td>
        <td>应收管理费</td>
        <td>{{repaymentObj.manageFeeReceivable}}</td>
        <td>实收管理费</td>
        <td>{{repaymentObj.manageFeeReceived}}</td>
        <td>剩余管理费</td>
        <td>{{repaymentObj.manageFeeSurplus}}</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">合计</td>
        <td>应付</td>
        <td>{{repaymentObj.amountReceivable}}</td>
        <td>已还</td>
        <td>{{repaymentObj.amountReceived}}</td>
        <td>剩余</td>
        <td>{{repaymentObj.amountSurplus}}</td>
      </tr>
    </table>

    <div class="modal-item-huakoujilu">
      <!--<span style="font-size:14px;font-weight:bold;position:relative;top:20px;">还款总额：1010<span></span></span>-->
      <i-button class="modal-item-huakoubutton blueButton" @click="checkDeductRecord">查看划扣记录</i-button>
    </div>

    <div>
      <div class="modal-item-shoukuanfangshi"></div>
      <span>收款方式</span>
    </div>
    <table class="modal-item-table" border="1" width="868">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="1" width="5%">
          <div @click="addObj">
            <i-icon class="modal-item-icon" type="plus"></i-icon>
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
            <i-icon type="minus" class="modal-item-icon"></i-icon>
          </div>
        </td>
        <td>
          <i-select class="modal-item-select" placeholder="选择结算通道" v-model="v.collectMoneyChannel">
            <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label"
                      :value="value"></i-option>
          </i-select>
        </td>
        <td>
          <i-select class="modal-item-select" placeholder="选择收款项" v-model="v.collectItem"
                    @on-change="selectWay($event, v)">
            <i-option v-for="item in collectMoneyItemModel" :key="item.itemCode" :label="item.itemLabel"
                      :value="item.itemCode"></i-option>
          </i-select>
        </td>
        <td>
          <i-input style="display:inline-block;width:30%;margin-right:10px" v-model="v.collectMoneyAmount" @on-blur="inputBlur" readonly></i-input>
          <i-button class="blueButton">确认划扣</i-button>
        </td>
        <td><span>已处理</span>
          <i-icon class="modal-item-icon2" type="loop" size="20" color="#199ED8"></i-icon>
        </td>
      </tr>
      <tr height="40">
        <td></td>
        <td width="25%">合计（元）</td>
        <td class="modal-item-td" colspan="3">{{collectMoneySum}}</td>
      </tr>
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
      <!--<i-button class="blueButton" style="float:right">凭证上传</i-button>
      <i-button class="blueButton" style="float:right">全部下载</i-button>-->

      <i-row>
        <i-col class="modal-item-fujian" :span="8">
          <div class="modal-item-upload"
               @click="openUpload=true">
            <Icon class="modal-item-upload-icon" type="plus-circled" color="#265ea2" size="40"></Icon>
            <h2 class="modal-item-upload-add">点击添加附件</h2>
            <h3 class="modal-item-upload-text">支持jpg/png格式</h3>
            <h3 class="modal-item-upload-text">建议大小不超过10M</h3>
          </div>
        </i-col>
        <i-col :span="8" v-for="(v,i) in financeUploadResources" :key="v.id"
               class="modal-item-fanxian">
          <img :src="v.materialUrl" class="modal-item-fanxian-img">
        </i-col>
      </i-row>
    </div>
    <!--<data-box :columns="columns1" :data="data1"></data-box>-->

    <template>
      <i-modal title="划扣记录" v-model="deductRecordModal" width="1200">
        <deduct-record ref="deduct-record"></deduct-record>
      </i-modal>
    </template>

    <!-- 弹出框 -->
    <template>
      <i-modal :loading="true" @on-ok="postFile" title="上传素材" v-model="openUpload">
        <file-upload @on-success="uploadSuccess" ref="file-upload"></file-upload>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import DeductRecord from "~/components/finance-manage/deduct-record.vue";
  import FileUpload from "~/components/common/file-upload.tsx.vue";
  import {
    DataGrid,
    DataGridItem
  } from "@zct1989/vue-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    PaymentScheduleService
  } from "~/services/manage-service/payment-schedule.service";

  @Component({
    components: {
      FileUpload,
      DataBox,
      DataGrid,
      DataGridItem,
      DeductRecord
    }
  })
  export default class ConfirmRepayment extends Vue {
    @Dependencies(PaymentScheduleService) private paymentScheduleService: PaymentScheduleService;
    private columns1: any;
    private repaymentObj: any = {};
    private rowObj: any = {};
    private data1: any = [];
    private collectMoneyDetails: any = [];
    private financeUploadResources: any = [];
    private data2: any = [];
    private deductRecordModal: Boolean = false;
    private openUpload: Boolean = false;
    private remark: String = ''
    private collectMoneySum: any = 0
    private collectMoneyId: any = ''
    private collectMoneyItemModel: any = []

    /**
     * 上传文件成功回调
     */
    uploadSuccess() {
      this.openUpload = false;
      this.$nextTick(() => {
        let fileUpload: any = this.$refs["file-upload"];
        this.financeUploadResources = this.financeUploadResources.concat(fileUpload.fileList.map(v => {
          return {
            // id: v.response.id,
            materialUrl: v.response.url,
          }
        }))
        fileUpload.reset();
      });
    }

    /**
     * 上传文件
     */
    postFile() {
      let fileUpload = this.$refs["file-upload"] as FileUpload;
      fileUpload.upload();
    }

    refresh(row) {
      this.remark = ''
      this.collectMoneyId = ''
      this.repaymentObj = {}
      this.collectMoneyDetails = []
      this.financeUploadResources = []
      this.inputBlur()
      this.rowObj = row
      this.paymentScheduleService.getCustomerScheduleBillDetail({
        orderId: row.orderId
      }).subscribe(data => {
        console.log(data)
        this.collectMoneyId = data.collectMoneyHistory ? data.collectMoneyHistory.id : ''
        this.repaymentObj = data
        this.collectMoneyDetails = data.collectMoneyDetails || []
        this.financeUploadResources = data.financeUploadResources || []
        this.collectMoneyItemModel = data.collectMoneyItemModel
        this.remark = data.remark
        this.inputBlur()
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
        collectMoneyChannel: '',
        collectItem: ''
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
      this.collectMoneySum = sum
    }

    selectWay(code, item) {
      let target: any = this.collectMoneyItemModel.find((d) => d.itemCode === code)
      if (target) {
        item.collectMoneyAmount = target.itemMoney
        this.inputBlur()
      }
    }

    created() {
      this.columns1 = [{
        title: '操作',
        width: '200',
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
          key: 'uploadTime'
        },
        {
          align: 'center',
          title: '上传人',
          key: 'uploadPerson'
        }
      ]

      this.data1 = [{
        attachmentName: 'kb0917',
        uploadTime: '2017-12-03 14:56:25',
        uploadPerson: '胡开甲'
      }]

    }

  }

</script>

<style lang="less" scoped>
  .component.confirm-repayment {
    .modal-kehuxinxi {
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

    .modal-item-derate {
      text-decoration: line-through;
      margin-right: 6px
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
      background: #265EA2;
      display: inline-block;
      margin-right: 6px;
      position: relative;
      top: 4px;
    }
    .modal-item-icon {
      color: #199ED8;
      cursor: pointer
    }
    .modal-item-select {
      display: inline-block;
      width: 90%
    }
    .modal-item-input {
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
    .modal-item-shoukuanpingzheng {
      margin-top: 10px;
      margin-bottom: 10px;
      .modal-item-shoukuanpingzheng-div {
        width: 7px;
        height: 20px;
        background: #265EA2;
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
        margin-top: 5px
      }
      .modal-item-upload-text {
        color: gray
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
