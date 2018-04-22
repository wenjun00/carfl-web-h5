<!--确认结清-->
<template>
  <section class="component confirm-early-pay">
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
        <td class="td-bg" colspan="1" width="40%">项目</td>
        <td class="td-bg" colspan="1" width="60%">金额（元）</td>
      </tr>
      <tr height="40" v-for="item in collectMoneyItemModel" :key="item.itemCode">
        <td>{{item.itemLabel}}</td>
        <td>{{item.itemMoney}}</td>
      </tr>
      <tr height="40">
        <td>合计（元）</td>
        <td class="modal-item-heji">{{repaymentObj.totalPayment}}</td>
      </tr>
    </table>
    <div class="modal-item-resources" v-if="applicationPhaseResources.length">
      <div class="modal-item-resources-fujian"></div>
      <span>附件</span>
    </div>
    <div class="modal-item-origin">
      <i-row>
        <i-col class="modal-item-col" :span="6" v-for="v in applicationPhaseResources" :key="v.id">
          <div>
          </div>
          <div class="modal-item-col-div">{{v.originName}}</div>
        </i-col>
      </i-row>
    </div>
    <div class="modal-item-huakou">
      <i-button class="modal-item-huakoubutton blueButton" @click="checkDeductRecord">查看划扣记录</i-button>
    </div>

    <div>
      <div class="modal-item-shoukuanfangshi"></div>
      <span>收款方式</span>
    </div>
    <table class="modal-item-table" border="1" width="868">
      <tr height="40">
        <td class="td-bg" colspan="1" width="5%">
          <div @click="addObj">
            <i-icon type="plus" class="modal-item-shoukuanfangshi-icon"></i-icon>
          </div>
        </td>
        <td class="td-bg" colspan="1" width="20%">结算通道</td>
        <td class="td-bg" colspan="1" width="20%">收款项</td>
        <td class="td-bg" colspan="1">金额（元）</td>
        <td class="td-bg" colspan="1">状态</td>
      </tr>
      <tr height="40" v-for="(v,i) in collectMoneyDetails" :key="i">
        <td>
          <div @click="deleteObj(i)">
            <i-icon type="minus" class="modal-item-shoukuanfangshi-icon"></i-icon>
          </div>
        </td>
        <td>
          <i-select class="modal-item-select" placeholder="选择结算通道" v-model="v.collectMoneyChannel">
            <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </td>
        <td>
          <i-select class="modal-item-select" placeholder="选择收款项" v-model="v.collectItem" @on-change="selectWay($event, v)">
            <i-option v-for="item in collectMoneyItemModel" :key="item.itemCode" :label="item.itemLabel" :value="item.itemCode"></i-option>
          </i-select>
        </td>
        <td>
          <i-input class="modal-item-huakou-input" v-model="v.collectMoneyAmount" @on-blur="inputBlur"></i-input>
          <i-button class="blueButton">确认划扣</i-button>
        </td>
        <td>
          <span>已处理</span>
          <i-icon type="loop" size="20" color="#199ED8" class="modal-item-yichuli"></i-icon>
        </td>
      </tr>
      <tr height="40">
        <td></td>
        <td class="td-wh">合计（元）</td>
        <td colspan="3" class="modal-item-heji">{{paymentAmount}}</td>
      </tr>
    </table>
    <i-form>
      <div class="modal-item-beizhu">备注</div>
      <i-form-item>
        <i-input type="textarea" v-model="remark" class="modal-item-beizhu-input"></i-input>
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
        <i-col class="modal-item-upload" :span="8">
          <div class="modal-item-upload-div" @click="openUpload=true">
            <Icon type="plus-circled" class="modal-item-upload-icon" color="#265ea2" size="40"></Icon>
            <h2 class="modal-item-upload-add">点击添加附件</h2>
            <h3 class="modal-item-upload-text">支持jpg/png格式</h3>
            <h3 class="modal-item-upload-text">建议大小不超过10M</h3>
          </div>
        </i-col>
        <i-col class="modal-item-upload-col" :span="8" v-for="v in financeUploadResources" :key="v.id">
          <img class="modal-item-upload-img" :src="v.materialUrl">
        </i-col>
      </i-row>
    </div>
    <!-- 弹出框 -->
    <template>
      <i-modal :loading="true" @on-ok="postFile" title="上传素材" v-model="openUpload">
        <file-upload @on-success="uploadSuccess" ref="file-upload"></file-upload>
      </i-modal>
    </template>
    <template>
      <i-modal title="划扣记录" v-model="deductRecordModal" :width="1200">
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
  import FileUpload from "~/components/common/file-upload.tsx.vue";
  import {
    DataGrid,
    DataGridItem
  } from "@zct1989/vue-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    AdvancePayoffService
  } from "~/services/manage-service/advance-payoff.service";

  @Component({
    components: {
      DataBox,
      DataGrid,
      DataGridItem,
      DeductRecord,
      FileUpload
    }
  })
  export default class ConfirmEarlyPay extends Vue {
    @Dependencies(AdvancePayoffService) private advancePayoffService: AdvancePayoffService;
    private columns1: any;
    private repaymentObj: any = {};
    private rowObj: any = {};
    private data1: any = [];
    private collectMoneyDetails: any = [];
    private financeUploadResources: any = [];
    private data2: any = [];
    private deductRecordModal: Boolean = false
    private remark: any = ''
    private paymentAmount: any = 0
    private delFinanceUploadResource: any = []
    private addFinanceUploadResource: any = []
    private applicationPhaseResources: any = []
    private collectMoneyId: any = ''
    private collectMoneyItemModel: any = []
    private openUpload: Boolean = false;
    private withdrawApplicationId: any = ''


    /**
     * 上传文件成功回调
     */
    uploadSuccess() {
      this.openUpload = false;
      this.$nextTick(() => {
        let fileUpload: any = this.$refs["file-upload"];
        this.financeUploadResources = this.financeUploadResources.concat(fileUpload.fileList.map(v => {
          return {
            id: v.response.id,
            materialUrl: v.response.url,
            orderId: this.rowObj.orderId,
            businessId: this.rowObj.businessId
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
      this.rowObj = row
      this.advancePayoffService.getAdvancePayoffBillInfo({
        orderId: row.orderId
      }).subscribe(data => {
        this.collectMoneyId = data.collectMoneyHistory ? data.collectMoneyHistory.id : ''
        this.repaymentObj = data
        this.collectMoneyDetails = data.collectMoneyDetails || []
        this.financeUploadResources = data.collectMoneyPhaseResources
        this.applicationPhaseResources = data.applicationPhaseResources
        this.collectMoneyItemModel = data.collectMoneyItemModel
        this.withdrawApplicationId = data.withdrawApplicationId
        this.inputBlur()
        // this.remark = data.collectMoneyHistory.remark
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
      this.collectMoneyDetails.push({
        collectMoneyAmount: '',
      })
    }

    /**
     * 删除还款对象
     */
    deleteObj(index) {
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
      this.paymentAmount = sum
    }

    selectWay(code, item) {
      let target: any = this.collectMoneyItemModel.find((d) => d.itemCode === code)
      if (target) {
        item.collectMoneyAmount = target.itemMoney
        this.inputBlur()
      }
    }

    earlyClear() {
      // if(this.$dict.getDictName(this.selectOne.collectItem) === '提前结清总额'){
      //   this.collectMoneyDetails.forEach(v => {
      //     // if(v.collectMoneyAmount < this.repaymentObj.totalPayment){
      //     if(v.collectMoneyAmount < 10){
      //       this.$Message.error('失败')
      //     }
      //   })
      // }
      // return
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
  .component.confirm-early-pay {
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
      border: 1px solid #DDDEE1;
      .td-bg {
        background-color: #F2F2F2;
      }
    }
    .modal-item-heji {
      font-weight: 700;
      font-size: 14px
    }
    .modal-item-resources {
      margin-top: 10px;
      .modal-item-resources-fujian {
        width: 7px;
        height: 20px;
        background: #265EA2;
        display: inline-block;
        margin-right: 6px;
        position: relative;
        top: 4px;
      }
    }
    .modal-item-origin {
      margin-top: 10px;
      margin-bottom: 10px;
      .modal-item-col {
        display: flex;
        align-items: center;
        margin-top: 10px;
        flex-direction: column;
        div {
          height: 150px;
          width: 150px;
          border: 1px solid #C2C2C2;
          background-image:url(${v.materialUrl});
          background-repeat: no-repeat;
        }
        .modal-item-col-div {
          height: 40px;
          line-height: 40px;
          font-size: 14px
        }
      }
    }
    .modal-item-huakou {
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
      .modal-item-shoukuanfangshi-icon {
        color: #199ED8;
        cursor: pointer
      }
    }
    .modal-item-select {
      display: inline-block;
      width: 90%
    }
    .td-wh {
      width: 25%;
    }
    .modal-item-huakou-input {
      display: inline-block;
      width: 30%;
      margin-right: 10px
    }
    .modal-item-yichuli {
      margin-left: 6px;
      cursor: pointer
    }
    .modal-item-beizhu {
      margin: 5px 0px
    }
    .modal-item-beizhu-input {
      width: 100%;
      display: block;
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
    .modal-item-upload {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      .modal-item-upload-div {
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
    .modal-item-upload-col {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      .modal-item-upload-img {
        height: 200px;
        width: 200px;
      }
    }
  }

</style>
