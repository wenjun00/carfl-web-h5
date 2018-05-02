<!--确认收款-->
<template>
  <section class="component confirm-pay">
    <i-form :label-width="80" :model="repaymentObj" ref="modify-user">
      <i-row>
        <i-col :span="12">
          <i-form-item label="客户姓名" prop="name">
            <i-input v-model="personal.name" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="付款类型" prop="refundType">
            <i-select v-model="repaymentObj.refundType" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0430')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
          <i-button class="modal-item-salebutton" type="text" @click="saleApplyInfo">销售申请详情</i-button>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="身份证号" prop="idCard">
            <i-input v-model="personal.idCard" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="选择订单" prop="orderNumber">
            <i-input v-model="productOrder.orderNumber" readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-col :span="24">
        <i-form-item label="备注">
          <i-input class="modal-item-beizhu-input" type="textarea" v-model="repaymentObj.remark" disabled></i-input>
        </i-form-item>
      </i-col>
    </i-form>
    <div v-if="applicationPhaseResources.length">
      <div class="modal-item-fujian-div"></div>
      <span>附件</span>
    </div>

    <div class="invoiceContainer">
      <div v-for="item in applicationPhaseResources" :key="item.id" class="invoices">
        <div class="invoiceItem"></div>
        <div class="invoiceName">{{item.invoiceName}}</div>
      </div>
    </div>

    <div>
      <div class="modal-item-shoukuamingxi"></div>
      <span>收款明细</span>
    </div>
    <table class="modal-item-table" border="1" width="850">
      <tr height="40">
        <td class="bg-color" colspan="1" width="40%">项目</td>
        <td class="bg-color" colspan="1" width="60%">金额（元）</td>
      </tr>
      <tr height="40" v-for="(v,i) in itemList" :key="i">
        <td>{{$dict.getDictName(v.refundItem)}}</td>
        <td>{{v.refundAmount}}</td>
      </tr>
      <tr height="40">
        <td>合计</td>
        <td class="modal-item-heji-td">{{repaymentObj.refundTotalAmount}}</td>
      </tr>
    </table>

    <div>
      <div class="modal-item-shoukuanfangshi-div"></div>
      <span>收款方式</span>
    </div>

    <table class="modal-item-table" border="1" width="850">
      <tr height="40">
        <td class="bg-color" colspan="1" width="5%" v-if="!check">
          <div @click="addObj">
            <i-icon class="modal-item-icon" type="plus"></i-icon>
          </div>
        </td>
        <td class="bg-color" colspan="1" width="20%">结算通道</td>
        <td class="bg-color" colspan="1" width="20%">收款项</td>
        <td class="bg-color" colspan="1">金额（元）</td>
        <td class="bg-color" colspan="1">状态</td>
      </tr>
      <tr height="40" v-for="(v,i) in collectMoneyDetails" :key="i">
        <td v-if="!check">
          <div @click="deleteObj(i)">
            <i-icon type="minus" class="modal-item-icon"></i-icon>
          </div>
        </td>
        <td>
          <i-select class="modal-item-select" placeholder="选择结算通道" v-model="v.refundChannel" :disabled="check">
            <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </td>
        <td>
          <i-select placeholder="选择收款项目" class="modal-item-select" v-model="v.refundItem" :disabled="check">
            <i-option v-for="{value,label} in $dict.getDictData('0430')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </td>
        <td>
          <i-input class="modal-item-huakou-input" v-model="v.refundAmount" @on-blur="inputBlur" :readonly="check"></i-input>
          <i-button class="blueButton" v-if="!check">确认划扣</i-button>
        </td>
        <td>
          <span>{{$dict.getDictName(v.dealStatus)}}</span>
          <i-icon class="modal-item-huakou-icon" type="loop" size="20" color="#199ED8"></i-icon>
        </td>
      </tr>
      <tr height="40">
        <td v-if="!check"></td>
        <td width="25%">合计（元）</td>
        <td class="modal-item-heji-td" colspan="3">{{paymentAmount | toThousands}}</td>
      </tr>
    </table>

    <!--<i-table :columns3="columns3" :data3="data3"></i-table>-->
    <div>
      <div class="modal-item-zhanghuxinxi-div"></div>
      <span>账户信息</span>
    </div>
    <!--<bank-info :dataSet="personalBanks"></bank-info>-->
    <i-table :columns="columns2" :data="personalBanks"></i-table>

    <div v-if="!check||financeUploadResources.length">
      <div class="modal-item-shoukuanpingzheng-div"></div>
      <span>收款凭证</span>
    </div>

    <i-row class="modal-item-upload">
      <i-col :span="12" v-if="!check">
        <div class="modal-item-upload-div" @click="openUpload=true">
          <Icon type="plus-circled" class="modal-item-upload-icon" size="40" color="#265ea2"></Icon>
          <div>点击添加附件</div>
          <span class="modal-item-upload-text">支持jpg/pdf/png格式建议大小不超过10M</span>
        </div>
      </i-col>
      <i-col :span="8" v-for="(v,i) in financeUploadResources" :key="i" class="modal-item-upload-col">
        <div :style="`height:200px;width:200px;border:1px solid #C2C2C2;background-image:url(${v.materialUrl});background-repeat:no-repeat;`">
        </div>
      </i-col>
    </i-row>

    <template>
      <i-modal title="订单详情" v-model="purchaseInfoModel" :width="1200" class="purchaseInformation">
        <purchase-information :scrollTopHeight="scrollTopHeight" ref="purchase-info"></purchase-information>
        <div slot="footer">
          <i-button class="blueButton" @click="purchaseInfoModel=false">返回</i-button>
        </div>
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
import ChangeCard from "~/components/purchase-manage/change-card.vue"
import DataBox from "~/components/common/data-box.vue";
import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
import FileUpload from "~/components/common/file-upload.tsx.vue";
import { Dependencies } from "~/core/decorator";
import { RefundApplicationService } from "~/services/manage-service/refund-application.service";
import { Prop } from "vue-property-decorator";
import { LodashService } from "~/utils/lodash.service.ts"

@Component({
  components: {
    FileUpload,
    ChangeCard,
    DataBox,
    PurchaseInformation
  }
})
export default class ConfirmPay extends Vue {
  @Dependencies(RefundApplicationService) private refundApplicationService: RefundApplicationService;
  private rowObj: any = {};
  private repaymentObj: any = {};
  private personal: any = {};
  private itemList: any = [];
  private productOrder: any = {};
  private applicationPhaseResources: any = []
  private financeUploadResources: any = [];
  private collectMoneyDetails: any = [];
  private paymentAmount: any = 0
  private delFinanceUploadResource: any = []
  private addFinanceUploadResource: any = []
  private personalBanks: any = [];
  private openUpload: Boolean = false;
  @Prop({
    default: false
  })
  check: boolean;


  private columns2: any;
  private columns3: any;
  private data3: Array<Object> = [];
  private purchaseInfoModel: Boolean = false;
  private gatherModal: Object = {
    gatherType: '销售收款',
    remarks: ''
  }
  private payType = ''
  private scrollTopHeight = 0
  private collectMoneyId: any = ''

  /**
   * 上传文件成功回调
   */
  uploadSuccess() {
    this.openUpload = false;
    this.$nextTick(() => {
      let fileUpload: any = this.$refs["file-upload"];
      this.financeUploadResources = this.financeUploadResources.concat(fileUpload.fileList.map(v => v.response))
      fileUpload.reset();
    });
  }

  /**
   * 上传文件
   */
  postFile() {
    let fileUpload: any = this.$refs["file-upload"];
    fileUpload.upload();
  }

  refresh(row) {
    this.rowObj = row
    this.refundApplicationService.getRefundApplicationById({
      refundId: row.refundApplicationId
    }).subscribe(data => {
      console.log(data)
      this.collectMoneyId = data.collectMoneyHistory ? data.collectMoneyHistory.id : ''
      this.personal = data.personal
      this.productOrder = data.productOrder
      this.itemList = data.itemList
      this.repaymentObj = data
      this.collectMoneyDetails = data.refundRecordItems
      this.personalBanks = data.bankListk
      console.log(this.personalBanks)
      this.financeUploadResources = data.resourceList.filter(v => v.materialType === 1163)
      this.applicationPhaseResources = data.resourceList.filter(v => v.materialType === 1162)
      this.inputBlur()
    }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
  }

  /**
   * 计算总计
   */
  inputBlur() {
    let sum: any = 0
    this.collectMoneyDetails.forEach(v => {
      sum = sum + (Number(v.refundAmount) || 0)
    })
    console.log(sum)
    this.paymentAmount = LodashService.round(sum, 2)
  }

  mounted() {
    let target = document.querySelector(".purchaseInformation .ivu-modal-body")
    if (target) {
      target.addEventListener('scroll', this.monitorScorll)
    }
  }

  monitorScorll() {
    let target = document.querySelector(".purchaseInformation .ivu-modal-body")
    if (target) {
      this.scrollTopHeight = target.scrollTop
      console.log(this.scrollTopHeight)
    }
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

  created() {
    this.columns2 = [{
      title: "户名",
      align: 'center',
      key: 'personalName'
    }, {
      title: "开户银行",
      align: 'center',
      key: 'depositBank'
    }, {
      title: "银行卡号",
      align: 'center',
      key: 'cardNumber'
    }, {
      title: "支行名称",
      align: 'center',
      key: 'depositBranch'
    }, {
      title: "第三方客户号",
      align: 'center',
      key: 'clientNumber'
    }];
    this.columns3 = [{
      align: "center",
      width: "60",
      renderHeader: (h, {
          column,
        index
        }) => {
        return h(
          "div", {
            on: {
              click: () => {
                // this.columnsConfig();
              }
            },
            style: {
              cursor: "pointer"
            }
          }, [
            h("Icon", {
              props: {
                type: "plus",
                size: "20"
              }
            })
          ]
        );
      },
      render: (h, {
          row,
        columns,
        index
        }) => {
        if (index === 1) {
          return h("Icon", {
            props: {
              type: "loop",
              size: "20"
            }
          })
        } else {
          return h("Icon", {
            props: {
              type: "trash-a",
              size: "20"
            }
          })
        }
      }
    }, {
      title: '项目名称',
      align: 'center',
      key: 'projectName',
      render: (h, {
          row,
        columns,
        index
        }) => {
        return h('Select', {
          props: {
            width: '100px',
            placeholder: '请选择收款方式'
          }
        }, [h('Option', {
          props: {
            label: '汇付',
            value: '汇付'
          }
        }), h('Option', {
          props: {
            label: '富友',
            value: '富友'
          }
        }), h('Option', {
          props: {
            label: '现金',
            value: '现金'
          }
        })])
      }
    }]
    this.data3 = [{
      // projectName: ''
    }]
  }

  changeBankCard() {

  }

  addRow() {
    // let tr: any = document.createElement('tr');
    // let tb: any = document.getElementsByClassName('gather_type_table')[0]
    // let cellsNum = tb.rows[0].cells.length;
    // console.log(444, cellsNum)
    // for (let j = 0; j < cellsNum; j++) {
    //   let td = document.createElement('td');
    //   td.innerHTML = 'test';
    //   tr.appendChild(td);
    // }
    // tb.tBodies[0].appendChild(tr);
  }

  saleApplyInfo() {
    this.purchaseInfoModel = true
    let _purchaseInfo: any = this.$refs["purchase-info"];
    _purchaseInfo.getOrderDetail(this.rowObj);
  }
}

</script>

<style lang="less" scoped>
.invoiceContainer {
  display: flex;
  justify-content: flex-start;
  .invoices {
    margin-top: 10px;
  }
  .invoiceItem {
    margin-left: 10px;
    width: 140px;
    height: 100px;
    border: 1px solid #dddddd;
    background-image: url("/static/images/common/invoice.png");
  }
  .invoiceName {
    text-align: center;
  }
}

.component.confirm-pay {
  .modal-item-salebutton {
    float: right;
    color: #265ea2;
  }
  .modal-item-beizhu-input {
    width: 100%;
  }
  .modal-item-fujian-div {
    width: 7px;
    height: 20px;
    background: #265ea2;
    display: inline-block;
    margin-right: 6px;
    position: relative;
    top: 4px;
  }
  .modal-item-shoukuamingxi {
    width: 7px;
    height: 20px;
    background: #265ea2;
    display: inline-block;
    margin-right: 6px;
    position: relative;
    top: 4px;
  }
  .modal-item-table {
    margin-top: 10px;
    text-align: center;
    border: 1px solid #dddee1;
    .bg-color {
      background-color: #f2f2f2;
    }
  }
  .modal-item-heji-td {
    font-weight: 700;
    font-size: 14px;
  }
  .modal-item-shoukuanfangshi-div {
    width: 7px;
    height: 20px;
    background: #265ea2;
    display: inline-block;
    margin-right: 6px;
    position: relative;
    top: 4px;
  }
  .modal-item-icon {
    color: #199ed8;
    cursor: pointer;
  }
  .modal-item-select {
    display: inline-block;
    width: 90%;
  }
  .modal-item-huakou-input {
    display: inline-block;
    width: 30%;
    margin-right: 10px;
  }
  .modal-item-huakou-icon {
    margin-left: 6px;
    cursor: pointer;
  }
  .modal-item-zhanghuxinxi-div {
    width: 7px;
    height: 20px;
    background: #265ea2;
    display: inline-block;
    margin-right: 6px;
    position: relative;
    top: 4px;
    margin-top: 10px;
  }
  .modal-item-shoukuanpingzheng-div {
    width: 7px;
    height: 20px;
    background: #265ea2;
    display: inline-block;
    margin-right: 6px;
    position: relative;
    top: 4px;
    margin-top: 10px;
  }
  .modal-item-upload {
    margin-top: 10px;
    .modal-item-upload-div {
      height: 200px;
      width: 200px;
      border: 1px solid #c2c2c2;
      cursor: pointer;
      text-align: center;
      position: relative;
      left: 40px;
    }
    .modal-item-upload-icon {
      display: block;
      margin-top: 53px;
    }
    .modal-item-upload-text {
      color: gray;
    }
    .modal-item-upload-col {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
  }
}
</style>
