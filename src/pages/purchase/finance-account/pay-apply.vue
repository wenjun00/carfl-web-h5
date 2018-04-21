<!--付款申请-->
<template>
    <section class="page early-payment-apply special-input">
        <page-header title="付款申请"></page-header>
        <i-row type="flex" class="data-form">
            <i-col span="18">
                <i-form ref="customer-form" :model="applyData" :rules="applyRule" :label-width="80">
                    <i-col span="12">
                        <i-form-item label="证件号码" prop="certificateNumber">
                            <i-input type="text" v-model="applyData.certificateNumber" placeholder="请输入证件号码" @on-change="showTab" :maxlength="18">
                            </i-input>
                        </i-form-item>
                    </i-col>
                    <i-col span="12">
                        <i-form-item label="客户姓名" prop="name">
                            <i-input type="text" v-model="applyData.name" @on-blur="searchInfo" placeholder="请输入客户姓名">
                            </i-input>
                        </i-form-item>
                    </i-col>
                    <i-col span="12">
                        <i-form-item label="客户电话" prop="mobileNumber">
                            <i-input type="text" v-model="applyData.mobileNumber" placeholder="请输入客户电话">
                            </i-input>
                        </i-form-item>
                    </i-col>
                    <i-col span="12">
                        <i-form-item label="选择订单" prop="orderNumber">
                            <i-select v-model="applyData.orderNumber" placeholder="请选择订单" @on-change="changeOrder($event)">
                                <i-option v-for="item in orderList" :value="item.orderNumber" :label="item.orderNumber" :key="item.orderId"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col span="12">
                        <i-form-item label="付款类型" prop="refundType">
                            <i-select v-model="applyData.refundType" placeholder="请选择付款类型">
                                <i-option v-for="{value,label} in $dict.getDictData('0430')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col span="12">
                        <i-form-item label="备注" prop="remark">
                            <i-input type="text" style="width:77%;" v-model="applyData.remark" placeholder="请输入备注">
                            </i-input>
                        </i-form-item>
                    </i-col>
                </i-form>
            </i-col>
            <i-button class="blueButton clear-button" @click="clearAll">清空</i-button>
        </i-row>
        <i-tabs v-model="materialTabs" type="card" class="early-pay-tabs">
            <i-tab-pane name="pay-detail" label="付款明细">
                <pay-detail :checkOrderId="checkOrderId" ref="payDetail"></pay-detail>
            </i-tab-pane>
            <i-tab-pane name="upload-the-fodder" label="上传素材">
                <upload-the-fodder ref="upload-the-fodder"></upload-the-fodder>
            </i-tab-pane>
        </i-tabs>
        <div class="shade" :style="{display:disabledStatus}">
        </div>
        <div class="submit-bar">
            <i-row type="flex" align="middle" class="submit-bar-item">
                <i-col :span="8" push="1">
                    <span>申请人：{{applyPerson}}</span>
                </i-col>
                <i-col :span="12" pull="4">
                    <span>申请时间：{{applyTime}}</span>
                </i-col>
                <i-col :span="4">
                    <!--<i-button class="highDefaultButton" @click="saveDraft">保存草稿</i-button>-->
                    <i-button class="highButton" @click="saveSubmit">保存并提交</i-button>
                </i-col>
            </i-row>
        </div>
        <!--编辑收款项-->
        <template>
            <i-modal v-model="modifyGatherItemModal" title="编辑收款项" width="300">
                <modify-gather-item></modify-gather-item>
            </i-modal>
        </template>

        <!--变更收款项-->
        <template>
            <i-modal v-model="changeGatherItemModal" title="变更收款项">
                <change-gather-item></change-gather-item>
            </i-modal>
        </template>
    </section>
</template>
<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import { RefundApplicationService } from '~/services/manage-service/refund-application.service'
import { Dependencies } from '~/core/decorator'
import { ApplyQueryService } from '~/services/business-service/apply-query.service'
import DataBox from '~/components/common/data-box.vue'
import { PageService } from '~/utils/page.service'
import SvgIcon from '~/components/common/svg-icon.vue'
import { Layout } from '~/core/decorator'
import UploadTheMaterial from '~/components/purchase-manage/upload-the-material.vue'
import ModifyGatherItem from '~/components/purchase-manage/modify-gather-item.vue'
import ChangeGatherItem from '~/components/purchase-manage/change-gather-item.vue'
import PayDetail from '~/components/purchase-manage/pay-detail.vue'
import UploadTheFodder from '~/components/purchase-manage/upload-the-fodder.vue'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    SvgIcon,
    UploadTheFodder,
    ModifyGatherItem,
    ChangeGatherItem,
    PayDetail
  }
})
export default class PayApply extends Page {
  @Dependencies(RefundApplicationService)
  private refundApplicationService: RefundApplicationService
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService
  private applyData: any = {
    orderNumber: '', // 订单号
    name: '', // 客户姓名
    certificateNumber: '', // 证件号
    mobileNumber: '', // 客户电话
    refundType: '', // 退款类型
    remark: '' // 备注
  }
  private paramsData: any = {
    itemList: [],
    remark: '',
    recordStatus: '',
    refundTotalAmount: ''
  }
  private applyRule: Object = {
    certificateNumber: [
      {
        required: true,
        message: '请输入证件号码',
        trigger: 'blur'
      },
      {
        validator: this.$validator.idCard,
        trigger: 'blur'
      }
    ],
    name: [
      {
        required: true,
        message: '请输入客户姓名',
        trigger: 'blur'
      }
    ],
    mobileNumber: [
      {
        required: true,
        message: '请输入客户电话',
        trigger: 'blur'
      },
      {
        validator: this.$validator.phoneNumber,
        trigger: 'blur'
      }
    ],
    //   orderNumber: [{
    //     required: true,
    //     message: '请选择订单',
    //     trigger:'change'
    //   }],
    refundType: [
      {
        required: true,
        message: '请选择付款类型',
        trigger: 'change',
        type: 'number'
      }
    ]
  }
  private purchaseData: Object = {
    province: '',
    city: '',
    company: ''
  }
  private applyPerson: String = '' // 申请人
  private applyTime: String = '' // 申请时间
  private data1: Array<Object> = []
  private data2: Array<Object> = []
  private data3: Array<Object> = []
  private categoryData: Array<Object>
  private loading: Boolean = false
  private addCar: Boolean = false
  private isShown: Boolean = true
  private modifyGatherItemModal: Boolean = false
  private changeGatherItemModal: Boolean = false
  private materialTabs: String = 'pay-detail'
  private disabledStatus: String = '' // 子组件中输入框禁用flag
  private orderList: Array<any> = []
  private dataSet: Array<any> = []
  private checkOrderId: Number = 0
  private saveData: any = {
    orderId: '', // 订单id
    bankListk: [], // 客户开户信息
    itemList: [], // 付款明细
    refundType: '', // 付款类型
    remark: '', // 备注
    resourceList: [] // 上传资料
  }

  created() {
    this.applyPerson = this.$store.state.userData.username
    let time = new Date()
    this.applyTime =
      time.getFullYear() +
      '-' +
      (time.getMonth() + 1) +
      '-' +
      time.getDate() +
      ' ' +
      time.getHours() +
      ':' +
      time.getMinutes() +
      ':' +
      time.getSeconds()
  }
  /**
   * 清空
   */
  clearAll() {
    this.$Modal.confirm({
      title: '提示',
      content:
        '您有未保存的提前结清申请,清空会删除页面内容，是否确认清空申请内容！',
      onOk: () => {
        this.resetAll()
        // 显示遮罩
        this.disabledStatus = 'block'
        // 清空orderId
        this.checkOrderId = 0
      }
    })
  }
  /**
   * 页面重置
   */
  resetAll() {
    let _form: any = this.$refs['customer-form']
    _form.resetFields()
    this.applyData = {}
    let _gatherDetail: any = this.$refs['payDetail']
    _gatherDetail.resetTable()
    let _uploadFodder: any = this.$refs['upload-the-fodder']
    _uploadFodder.reset()
  }
  /**
   * 证件号、订单号、客户姓名查询订单/账户/付款信息
   */
  getAllMessage() {
    this.refundApplicationService
      .getAllMessageByParams(this.applyData)
      .subscribe(
        data => {
          if (data) {
            this.orderList = data.filter(v => v.orderId)
            if (data[0] && data[0].orderNumber) {
              this.applyData.name = data[0].name
              this.applyData.mobileNumber = data[0].mobileNumber
            }
            this.dataSet = data
          }
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }

  submitData(item) {
    this.refundApplicationService
      .saveSubmitApplication(this.paramsData)
      .subscribe(val => {
        console.log(val)
      })
  }
  /**
   * 保存草稿
   */
  saveDraft() {
    let _message: any = this.$refs['payDetail']
    this.saveData.bankListk = _message.accountInfoList
    let gatherItem: any = Object.assign(_message.gatherItemList)
    this.saveData.refundTotalAmount =
      gatherItem.length > 0
        ? gatherItem.find(v => v.itemLabel === '合计（元）').refundAmount
        : ''
    this.saveData.recordStatus = 1128
    this.saveData.refundType = this.applyData.refundType
    this.saveData.remark = this.applyData.remark
    this.saveData.itemList = gatherItem.splice(
      0,
      _message.gatherItemList.length - 1
    )
    this.refundApplicationService
      .saveSubmitApplication(this.saveData)
      .subscribe(
        data => {
          this.$Message.success('保存并提交成功！')
          this.resetAll()
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
  /**
   * 保存并提交
   */
  saveSubmit() {
    let customerform: any = this.$refs['customer-form']
    customerform.validate(valid => {
      if (!valid) {
        return false
      } else {
        let _message: any = this.$refs['payDetail']
        this.saveData.bankListk = _message.accountInfoList
        let gatherItem: any = Object.assign(_message.gatherItemList)
        this.saveData.refundTotalAmount =
          gatherItem.length > 0
            ? gatherItem.find(v => v.itemName === 'totalPayment').refundAmount
            : ''
        this.saveData.recordStatus = 1129
        this.saveData.refundType = this.applyData.refundType
        this.saveData.remark = this.applyData.remark
        this.saveData.itemList = gatherItem.splice(
          0,
          _message.gatherItemList.length - 1
        )
        let _uploadthefodder: any = this.$refs['upload-the-fodder']
        console.log('dhfjgdfjgdjf')
        this.saveData.resourceList = _uploadthefodder.fodderList.map(v => {
          return {
            materialUrl: v.url
            // type:v.response.type,
            // name:v.name,
            // id:v.response.id
          }
        })
        this.refundApplicationService
          .saveSubmitApplication(this.saveData)
          .subscribe(
            data => {
              this.$Message.success('保存并提交成功！')
              this.resetAll()
            },
            ({ msg }) => {
              this.$Message.error(msg)
            }
          )
      }
    })
  }
  /**
   * 输入姓名搜索
   */
  searchInfo() {
    this.getAllMessage()
  }
  /**
   * 订单号change
   */
  changeOrder(item) {
    if (item) {
      this.saveData.orderId = this.dataSet.find(
        v => v.orderNumber === item
      ).orderId
      this.checkOrderId = this.dataSet.find(v => v.orderNumber === item).orderId
      let _message: any = this.$refs['payDetail']
      _message.refresh(this.dataSet.find(v => v.orderNumber === item))
    }
  }
  multipleSelect(selection) {}
  modifyGatherItem() {
    this.modifyGatherItemModal = true
  }
  /**
   * 变更收款项
   */
  changeGatherItem() {
    this.changeGatherItemModal = true
  }
  /**
   * 根据证件号码搜索
   */
  showTab() {
    if (this.applyData.certificateNumber.length === 18) {
      this.disabledStatus = 'none'
      this.getAllMessage()
    }
  }
}
</script>

<style lang="less" scoped>
.page.early-payment-apply {
  .data-form {
    margin-top: 10px;
    margin-right: 10px;
    .command-item {
      font-size: 16px;
      cursor: pointer;
      display: inline-block;
      margin-left: 10px;
      color: #3367a7;
      span {
        font-size: 12px;
      }
    }
  }
  .shade {
    width: 98%;
    height: 666px;
    background: rgba(250, 250, 250, 0.4);
    position: absolute;
    left: 21px;
    top: 315px;
    z-index: 999;
  }
}
</style>
<style lang="less">
.page.early-payment-apply.special-input {
  .special-input {
    .ivu-input {
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }
  .bigSelect {
    .ivu-select-selection {
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }
  .early-payment-apply {
    .ivu-select-selection {
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }
  .early-pay-tabs {
    .ivu-tabs-bar {
      border-bottom: 1px solid #dddee1;
      .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
        margin: 0;
        margin-right: 4px;
        padding: 5px 16px 4px;
        border: 1px solid #dddee1;
        border-bottom: 0;
        border-radius: 4px 4px 0 0;
        transition: all 0.3s ease-in-out;
      }
    }
  }
}
</style>