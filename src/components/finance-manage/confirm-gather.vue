<!--确认收款-->
<template>
  <section class="component confirm-gather">
    <i-form :label-width="110" label-position="left">
      <i-row style="background:#F5F5F5">
        <i-col :span="24" style="padding:6px;">
          <span>收款类型：</span><span style="margin-left:10px;">{{$dict.getDictName(repaymentObj.applicationType)}}</span>
          <i-button style="float:right;color:#265ea2" type="text" @click="saleApplyInfo">销售申请详情</i-button>
        </i-col>
        <i-col :span="24" style="margin-top:10px;margin-left:10px">
          <i-form-item>
            <span>备注：</span>
            <i-input type="textarea" v-model="repaymentObj.remark" style="display:inline-block;width:80%;" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>

    <div v-if="applicationPhaseResources.length">
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>附件</span>
    </div>

    <div class="invoiceContainer">
      <div v-for="item in applicationPhaseResources" :key="item.id" class="invoices">
        <div class="invoiceItem"></div>
        <div class="invoiceName">{{item.invoiceName}}</div>
      </div>
    </div>

    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>收款明细</span>
    </div>
    <table border="1" width="850" style="margin-top:10px;text-align:center;border:1px solid #DDDEE1">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="1" width="40%">项目</td>
        <td bgcolor="#F2F2F2" colspan="1" width="60%">金额（元）</td>
      </tr>
      <tr height="40" v-for="item in collectMoneyItemModels" :key="item.itemName">
        <td>{{item.itemLabel}}</td>
        <td>{{item.itemMoney}}</td>
      </tr>
    </table>

    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>收款方式</span>
    </div>

    <table border="1" width="850" style="margin-top:10px;text-align:center;border:1px solid #DDDEE1">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="1" width="5%" v-if="!check">
          <div @click="addObj">
            <i-icon type="plus" style="color:#199ED8;cursor:pointer"></i-icon>
          </div>
        </td>        
        <td bgcolor="#F2F2F2" colspan="1" width="20%">结算通道</td>
        <td bgcolor="#F2F2F2" colspan="1" width="20%">收款项</td>
        <td bgcolor="#F2F2F2" colspan="1">金额（元）</td>
        <td bgcolor="#F2F2F2" colspan="1">状态</td>
      </tr>
      <tr height="40" v-for="(v,i) in collectMoneyDetails" :key="i">
        <td v-if="!check">
          <div @click="deleteObj(i)">          
            <i-icon type="minus" style="color:#199ED8;cursor:pointer"></i-icon>
          </div>
        </td>
        <td>
          <i-select placeholder="选择结算通道" style="display:inline-block;width:90%" v-model="v.collectMoneyChannel" :disabled="check">
            <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </td>
        <td>
          <i-select placeholder="选择收款项目" style="display:inline-block;width:90%" v-model="v.collectItem" :disabled="check">
            <i-option v-for="{value,label} in $dict.getDictData('0113')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </td>
        <td>
          <i-input style="display:inline-block;width:30%;margin-right:10px" v-model="v.collectMoneyAmount" @on-blur="inputBlur" :readonly="check"></i-input>
          <i-button class="blueButton" v-if="!check">确认划扣</i-button>
        </td>
        <td><span>已处理</span>
          <i-icon type="loop" size="20" color="#199ED8" style="margin-left:6px;cursor:pointer"></i-icon>
        </td>
      </tr>
      <tr height="40">
        <td v-if="!check"></td>
        <td width="25%">合计（元）</td>
        <td  colspan="3" style="font-weight:700;font-size:14px">{{paymentAmount}}</td>
      </tr>
    </table>

    <!--<i-table :columns3="columns3" :data3="data3"></i-table>-->
    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;margin-top:10px;"></div><span>账户信息</span>
    </div>
    <i-table :columns="columns2" :data="personalBanks"></i-table>

    <div v-if="!check||financeUploadResources.length">
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;margin-top:10px;"></div><span>收款凭证</span>
    </div>

    <i-row style="margin-top:10px">
      <i-col :span="12" v-if="!check">
        <div style="height:200px;width:200px;border:1px solid #C2C2C2;cursor:pointer;text-align:center;position:relative;left:40px;"
           @click="openUpload=true">
          <Icon type="plus-circled" style="display:block;margin-top:53px;" size="40" color="#265ea2"></Icon>
          <div>点击添加附件</div>
          <span style="color:gray">支持jpg/pdf/png格式建议大小不超过10M</span>
        </div>
      </i-col>
      <i-col :span="8" v-for="(v,i) in financeUploadResources" :key="v.id" style="display:flex;justify-content:center;margin-top:10px">
        <div :style="`height:200px;width:200px;border:1px solid #C2C2C2;background-image:url(${v.materialUrl});background-repeat:no-repeat;`">
        </div>
      </i-col>
    </i-row>

    <template>
      <i-modal title="订单详情" v-model="purchaseInfoModel" width="1000" class="purchaseInformation">
        <purchase-information ref="purchase-info" :scrollTopHeight="scrollTopHeight"></purchase-information>
        <div slot="footer">
          <i-button class="blueButton" @click="purchaseInfoModal=false">返回</i-button>
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
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    CollectMoneyHistoryService
  } from "~/services/manage-service/collect-money-history.service";
  import { Prop } from "vue-property-decorator";
  import FileUpload from "~/components/common/file-upload.tsx.vue";

  @Component({
    components: {
      FileUpload,
      ChangeCard,
      DataBox,
      PurchaseInformation
    }
  })
  export default class ConfirmGather extends Vue {
    @Dependencies(CollectMoneyHistoryService) private collectMoneyHistoryService: CollectMoneyHistoryService;
    private rowObj: any = {};
    private repaymentObj: any = {};
    private applicationPhaseResources: any = []
    private financeUploadResources: any = [];
    private collectMoneyDetails: any = [];
    private paymentAmount: any = 0
    private collectMoneyItemModels: any = []
    private collectMoneyId: any = ''
    private openUpload: Boolean = false;

    @Prop({
      default: false
    })
    check: boolean;


    private columns2: any;
    private personalBanks: Array < Object > = [];
    private columns3: any;
    private data3: Array < Object > = [];
    private purchaseInfoModel: Boolean = false;
    private gatherModal: Object = {
      gatherType: '销售收款',
      remarks: ''
    }
    private payType = ''
    private scrollTopHeight = 0
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
      this.collectMoneyHistoryService.withdrawApplicationDetail({
        applicationId: row.applicationId
      }).subscribe(data => {
        this.collectMoneyId = data.collectMoneyId || ''
        console.log(data)
        this.repaymentObj = data
        this.collectMoneyDetails = data.collectMoneyDetails || []
        this.personalBanks = data.personalBanks 
        this.financeUploadResources = data.collectMoneyPhaseUploadResources
        this.applicationPhaseResources = data.applicationPhaseUploadResources
        this.collectMoneyItemModels = data.collectMoneyItemModels
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
        sum = sum + (Number(v.collectMoneyAmount) || 0)
      })
      console.log(sum)
      this.paymentAmount = sum 
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

<style lang="less">
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
      background-image: url('/static/images/common/invoice.png')
    }
    .invoiceName {
      text-align: center;
    }
  }

</style>
