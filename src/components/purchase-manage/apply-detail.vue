<!--添加新申请-->
<template>
  <section class="component apply-detail">
    <!--付款申请-->
    <i-row>
      <i-form :rules="applyRules"  :label-width="110" class="item-kehu-form">
        <i-col :span="12">
          <i-form-item label="客户姓名">
            <i-input v-model="addNewApplyModal.name" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="付款类型">
            <i-input v-model="refundType" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="身份证号">
            <i-input v-model="addNewApplyModal.idCard" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="选择订单">
            <i-input v-model="orderNumber" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="备注">
            <i-input type="textarea" v-model="remark" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-form>

      <span class="title">付款明细</span>
      <i-table :columns="columns1" :data="payDetail" :noDefaultRow="true"></i-table>
      <span class="title">账户信息</span>
      <i-table :columns="columns3" :data="accountDetail" :noDefaultRow="true"></i-table>
      <span class="title">附件</span>
      <i-row>
         <upload-the-fodder :type="type" ref="upload-the-fodder"></upload-the-fodder>
      </i-row>
    </i-row>

  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DataBox from "~/components/common/data-box.vue";
import { Prop } from "vue-property-decorator";
import UploadTheFodder from "~/components/purchase-manage/upload-the-fodder.vue";
  import {
    CommonService
  } from "~/utils/common.service";
@Component({
  components: {
    DataBox,
    UploadTheFodder
  }
})
export default class ApplyDetail extends Vue {
  @Prop() orderType;
  addAttachmentShow: Boolean;

  private applyType: String = "销售收款申请";
  private payDetail: Array<Object> = [];
  private data1: Array<Object> = [];
  private columns1: any;
  private columns2: any;
  private data2: Array<Object> = [];
  private columns3: any;
  private accountDetail: Array<Object> = [];
  private fileList: Array<Object> = [];
  private addNewApplyModal: any = {
    name: "",
    idCard: ""
  };
  private refundList: Object = {};
  private refundType: String = "";
  private remark: String = "";
  private orderNumber: String = "";
  private type:any="";
  private applyRules: any = {}
  /**
   * 添加附件
   */
  addAttachment() {}
  /**
   *打开页面获取申请数据
   */
  getparent(val,type) {
      console.log(type,'type')
    this.type=type
    this.refundList = val;
    this.addNewApplyModal = val.personal;
    this.payDetail = val.itemList;
    this.accountDetail = val.bankListk;
    this.fileList = val.resourceList;
       //   上传资料反显
      let _uploadFodder:any = this.$refs['upload-the-fodder']
      _uploadFodder.Reverse(val.resourceList)
    this.refundType = this.$dict.getDictName(val.refundType);
    this.remark = val.remark;
    this.orderNumber = val.productOrder.orderNumber;
  }
  getparentData(val, row ,type) {
    //   上传资料反显
    this.type=type
    console.log(type,'typedfdgfdgd')
      let _uploadFodder:any = this.$refs['upload-the-fodder']
      _uploadFodder.Reverse(val.applicationPhaseUploadResources)
    this.orderNumber = val.orderNumber; // 订单号
    val.collectMoneyItemModels.map(v => {
      v.refundAmount = v.itemMoney;
      v.refundItem = v.itemLabel;
    });
    this.addNewApplyModal.name = val.customerName; // 客户姓名
    this.payDetail = val.collectMoneyItemModels; // 付款明细
    this.addNewApplyModal.idCard = val.idCard; // 证件号
    this.remark = val.remark;
    this.refundType = val.applicationType
      ? this.$dict.getDictName(val.applicationType)
      : ""; // 付款类型
    this.accountDetail = val.personalBank||[]; // 账户信息
    // this.fileList = val.applicationPhaseUploadResources;
  }
  getparentreceipt(val,type) {
    this.type=type
    this.addNewApplyModal.name = val.customerName; // 客户姓名
    this.refundType = val.applicationType  ? this.$dict.getDictName(val.applicationType)
      : ""; // 付款类型
    this.addNewApplyModal.idCard = val.idCard; // 证件号
    this.remark = val.remark;
    this.orderNumber = val.orderNumber;
    if (val.collectMoneyItemModels) {
      val.collectMoneyItemModels.map(v => {
        v.refundAmount = v.itemMoney;
        v.refundItem = v.itemLabel;
      });
      this.payDetail = val.collectMoneyItemModels; // 付款明细
    }
    //   this.accountDetail[0].personalName = val.personalBank.personalName
    //   this.accountDetail[0].depositBank = val.personalBank.depositBank
    let personalBank: any = [];
    personalBank.push({
      personalName: val.personalBank?(val.personalBank.personalName?val.personalBank.personalName:''):'',
      depositBank: val.personalBank?(val.personalBank.depositBank?val.personalBank.depositBank:''):'',
      cardNumber: val.personalBank?(val.personalBank.cardNumber?val.personalBank.cardNumber:''):'',
      depositBranch: val.personalBank?(val.personalBank.depositBranch?val.personalBank.depositBranch:''):'',
      clientNumber: val.personalBank?(val.personalBank.clientNumber?val.personalBank.clientNumber:''):''
    });
    this.accountDetail = personalBank;
    this.fileList = val.financeUploadResources;
  }
  download(file){
      CommonService.downloadFile(file.materialUrl, '');
  }
  /**
   *删除附件
   */
  handleRemove(file) {
    console.log(file);
    this.fileList.splice(this.fileList.indexOf(file), 1);
  }
  created() {
    this.applyRules={
      idCard: [{
        validator: this.$validate.idCard,
        trigger: "blur"
      }]
    };
    this.columns1 = [
    //   {
    //     align: "center",
    //     width: 60,
    //     renderHeader: (h, { column, index }) => {
    //       return h(
    //         "div",
    //         {
    //           on: {
    //             click: () => {
    //               // this.columnsConfig();
    //             }
    //           },
    //           style: {
    //             cursor: "pointer"
    //           }
    //         },
    //         [
    //           h("Icon", {
    //             props: {
    //               type: "plus",
    //               size: "20"
    //             }
    //           })
    //         ]
    //       );
    //     },
    //     render: (h, { row, columns, index }) => {
    //       if (row.itemName !== "totalPayment") {
    //         return h("Icon", {
    //           props: {
    //             type: "trash-b",
    //             size: "20"
    //           }
    //         });
    //       }
    //     }
    //   },
      {
        title: "项目名称",
        key: "refundItem",
        align: "center",
            render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.refundItem));
          }
      },
      {
        title: "金额",
        key: "refundAmount",
        align: "center"
      }
    ];

    this.data1 = [
      {
        projectName: "首付金额",
        money: "80000"
      },
      {
        projectName: "首付月供",
        money: "10000"
      },
      {
        projectName: "保证金",
        money: "8000"
      },
      {
        projectName: "路桥费",
        money: "0"
      },
      {
        projectName: "合计",
        money: "98000"
      }
    ];
    this.columns2 = [{}];
    this.data2 = [{}];

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
.title {
  font-size: 14px;
  font-weight: bold;
}
// .demo-upload-list-cover{
//         display: none;
//         position: absolute;
//         top: 0;
//         bottom: 0;
//         left: 0;
//         right: 0;
//         background: rgba(0,0,0,.6);
//     }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
  .item-kehu-form{
    margin-top:20px;position:relative;right:20px;
  }
</style>
