<!--提前结清申请-->
<template>
  <section class="page early-payment-apply">
    <page-header title="提前结清申请" hiddenExport>
      <command-button label="添加新申请" @click="clearAll"></command-button>
    </page-header>

    <!-- 搜索表单-start -->
    <div class="search-container">
      <i-form ref="customer-form" :model="applyModel" :rules="applyRule" :label-width="90">
        <i-row :gutter="20">
          <i-col span="10">
            <i-form-item label="证件号码" prop="idCard">
              <i-input type="text" v-model="applyModel.idCard" placeholder="请输入证件号码" :disabled="transFlag" @on-change="getUserInfo" :maxlength="18">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="10">
            <i-form-item label="客户姓名" prop="customerName">
              <i-input type="text" v-model="applyModel.customerName" placeholder="请输入客户姓名">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row :gutter="20">
          <i-col span="10">
            <i-form-item label="客户电话" prop="mobileMain">
              <i-input type="text" v-model="applyModel.mobileMain" placeholder="请输入客户电话">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="10">
            <i-form-item label="选择订单" prop="orderId">
              <i-input v-model="applyModel.orderNumber" :readonly="true" v-if="transFlag"></i-input>
              <i-select v-model="applyModel.orderId" placeholder="请选择订单" @on-change="changeOrderId" v-else>
                <i-option v-for="item in orderNumberIdModels" :key="item.orderId" :value="item.orderId" :label="item.orderNumber"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col>
            <i-form-item label="备注" prop="remark">
              <i-input type="text" class="remark" v-model="applyModel.remark" placeholder="请输入备注">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>

      </i-form>
    </div>

    <i-tabs v-show="applyModel.orderId" v-model="materialTabs" class="info-container">
      <i-tab-pane name="gather-detail-early-pay" label="收款明细">
        <gather-detail-early-pay :checkOrderId="checkOrderId" ref="gather-detail-early-pay"></gather-detail-early-pay>
      </i-tab-pane>
      <i-tab-pane name="upload-the-fodder" label="上传素材">
        <upload-the-fodder ref="upload-the-fodder"></upload-the-fodder>
      </i-tab-pane>
    </i-tabs>

    <div v-show="!applyModel.orderId" class="emptyText">
      请先填写证件信息
    </div>
    <div v-show="applyModel.orderId" class="fixed-container">
      <i-button size="large" class="highButton" @click="saveAndCommit">保存并提交</i-button>
    </div>

  </section>
</template>
<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import DataBox from '~/components/common/data-box.vue'
import { PageService } from '~/utils/page.service'
import SvgIcon from '~/components/common/svg-icon.vue'
import { Layout } from '~/core/decorator'
import UploadTheFodder from '~/components/purchase-manage/upload-the-fodder.vue'
import ModifyGatherItem from '~/components/purchase-manage/modify-gather-item.vue'
import ChangeGatherItem from '~/components/purchase-manage/change-gather-item.vue'
import GatherDetailEarlyPay from '~/components/purchase-manage/gather-detail-early-pay.vue'
import { WithdrawApplicationService } from "~/services/manage-service/withdraw-application.service"
import { setTimeout } from 'core-js/library/web/timers'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    SvgIcon,
    UploadTheFodder,
    ModifyGatherItem,
    ChangeGatherItem,
    GatherDetailEarlyPay
  }
})
export default class EarlyPaymentApply extends Page {
  @Dependencies() private pageService: PageService
  @Dependencies(WithdrawApplicationService) private withdrawApplicationService: WithdrawApplicationService

  // 传值过来的页面
  private transFlag: boolean = false
  // 当前页面验证通过的身份证号
  private currentIdCard: string = ""

  // 当前form 表单
  private customerForm: any = {}
  private gatherDetail: any = {}
  private uploadthefodder: any = {}


  private applyModel: any = {}
  private applyRule: any = {}

  private purchaseData: Object = {
    province: '',
    city: '',
    company: ''
  }
  private applyPerson: String = '' // 申请人
  private applyTime: String = '' // 申请时间
  private orderNumberIdModels: Array<any> = []
  private loading: Boolean = false
  private addCar: Boolean = false
  private personalId: Number = 0
  private checkOrderId: Number = 0
  private isShown: Boolean = true
  private materialTabs: String = 'gather-detail-early-pay'
  private disabledStatus: String = '' // 子组件中输入框禁用flag
  private saveDraftModel: any = {
    addFinanceUploadResources: [], // 新增上传资料列表
    delFinanceUploadResources: [], // 删除上传资料Id列表
    financeUploadResources: [], // 上传素材相关信息
    accountName: '',
    advancePayoffFee: 0, // 提前结清手续费
    id: '', // 申请id
    orderId: '', // 订单id
    otherFee: 0,
    surplusManageFee: 0, // 剩余管理费
    surplusPenalty: 0, // 剩余罚息
    surplusPenaltyFreeze: 0, // 剩余冻结罚金
    surplusPrincipal: 0, // 剩余本金
    totalPayment: 0, // 收款总额
    remark: '', // 备注
    businessId: ''
  }
  private saveDraftItem: any = []
  private saveDraftDisabled: Boolean = false
  private msg: any = ''

  created() {
    this.applyModel = {
      idCard: '',
      customerName: '',
      mobileMain: '',
      salesManName: '',
      orderId: '',
      remark: ''
    }
    this.applyRule = {
      idCard: { required: true, message: '请输入证件号码', trigger: 'blur' },
      customerName: { required: true, message: '请输入客户姓名', trigger: 'blur' },
      mobileMain: { required: true, validator: this.$validator.phoneNumber, trigger: 'blur' }
    }
  }

  mounted() {
    this.customerForm = this.$refs['customer-form']
    this.gatherDetail = this.$refs['gather-detail-early-pay']
    this.uploadthefodder = this.$refs['upload-the-fodder']
  }

  async getUserInfo() {
    // 检测身份证
    if (!await this.checkIdCardValid()) {
      return;
    }

    if (this.currentIdCard && this.currentIdCard !== this.applyModel.idCard) {
      this.$Modal.confirm({
        title: "提醒",
        content: "证件号码更新,是否要重置申请信息?",
        onOk: this.resetPage(this.applyModel.idCard)
      });
    }

    this.currentIdCard = this.applyModel.idCard
    this.getOrderInfo()
  }

  async checkIdCardValid() {
    if (this.applyModel.idCard.length < 18) {
      return;
    }
    // 验证身份证信息
    return await new Promise((reslove, reject) => {
      this.customerForm.validateField('idCard', error => reslove(!error))
    })
  }

  resetPage(newIdCard?: string) {
    this.transFlag = false
    this.orderNumberIdModels = []
    this.customerForm.resetFields()
    this.applyModel.idCard = newIdCard
    this.gatherDetail.resetTable()
    this.uploadthefodder.fodder.reset()
  }



  /**
   * 订单号change
   */
  changeOrderId(val) {
    if (val) {
      this.checkOrderId = val // 将选择的订单号传给变更收款项按钮点击事件中
      this.saveDraftModel.orderId = val // 保存草稿所需orderId
      this.withdrawApplicationService
        .getAdvancePayoffApplicationInfo({
          personalId: this.personalId,
          orderId: val
        })
        .subscribe(
        data => {
          this.applyModel.remark = data.remark
          // 获取收款项和备注信息
          let _gatherDetail: any = this.$refs['gather-detail-early-pay']
          _gatherDetail.makeList(data)
          if (data.personalBank && data.personalBank.personalName) {
            this.saveDraftModel.accountName = data.personalBank.personalName // 获取保存草稿时需要的accountName
          }
          if (data.withdrawId) {
            this.saveDraftModel.id = data.withdrawId // 获取保存草稿时需要的id
            this.saveDraftModel.businessId = data.withdrawId
          }
        },
        ({ msg }) => {
          this.$Message.error(msg)
          this.msg = msg
        }
        )
    }
  }

  getModel() {
    let _gatherDetail: any = this.$refs['gather-detail-early-pay']
    let itemList = _gatherDetail.getItem()
    this.saveDraftItem = itemList
    this.saveDraftModel.otherFee = _gatherDetail.getOtherFee()
    this.saveDraftModel.remark = this.applyModel.remark
    let surplusManageFee = itemList.find(v => v.itemName === 'surplusManageFee')
    this.saveDraftModel.surplusManageFee = surplusManageFee
      ? surplusManageFee.itemMoney
      : 0

    let surplusPenalty = itemList.find(v => v.itemName === 'surplusPenalty')
    this.saveDraftModel.surplusPenalty = surplusPenalty
      ? surplusPenalty.itemMoney
      : 0

    let surplusPenaltyFreeze = itemList.find(
      v => v.itemName === 'surplusPenaltyFreeze'
    )
    this.saveDraftModel.surplusPenaltyFreeze = surplusPenaltyFreeze
      ? surplusPenaltyFreeze.itemMoney
      : 0

    let surplusPrincipal = itemList.find(v => v.itemName === 'surplusPrincipal')
    this.saveDraftModel.surplusPrincipal = surplusPrincipal
      ? surplusPrincipal.itemMoney
      : 0

    let advancePayoffFee = itemList.find(v => v.itemName === 'advancePayoffFee')
    this.saveDraftModel.advancePayoffFee = advancePayoffFee
      ? advancePayoffFee.itemMoney
      : 0

    // let otherFee = itemList.find(v => v.itemName === "otherFee");
    // this.saveDraftModel.otherFee = otherFee ? otherFee.itemMoney : 0;

    let totalPayment = itemList.find(v => v.itemName === 'totalPayment')
    this.saveDraftModel.totalPayment = totalPayment ? totalPayment.itemMoney : 0

    let _uploadFodder: any = this.$refs['upload-the-fodder']
    this.saveDraftModel.financeUploadResources = _uploadFodder.fodderList
  }



  /**
   * 保存并提交
   */
  saveAndCommit() {
    let customerform: any = this.$refs['customer-form']
    customerform.validate(valid => {
      if (!valid) {
        return false
      } else {
        if (this.msg === '该订单已有一个未处理的提前结清申请') {
          this.$Message.warning('请先审批未处理的申请订单！')
          return false
        }
        this.getModel()
        let saveAndCommitModel = this.saveDraftModel
        if (this.saveDraftItem.length == 0) {
          this.$Message.warning('未添加收款项，请添加收款项！')
          return false
        }
        this.withdrawApplicationService
          .saveAdvancePayoffApplication(saveAndCommitModel)
          .subscribe(
          data => {
            this.$Message.success('保存并提交成功！')
            this.saveDraftDisabled = true
            this.resetPage()
          },
          ({ msg }) => {
            this.$Message.error(msg)
          }
          )
      }
    })
  }





  /**
   * 获取订单信息
   */
  getOrderInfo() {
    this.withdrawApplicationService
      .getPersonalProductOrderInfoForAdvance({
        idCard: this.applyModel.idCard,
        customerName: this.applyModel.customerName,
        mobileMain: this.applyModel.mobileMain
      })
      .subscribe(
      data => {
        if (data[0] && data[0].orderNumberIdModels) {
          this.orderNumberIdModels = data[0].orderNumberIdModels
          this.applyModel.customerName = data[0].name
          this.applyModel.mobileMain = data[0].mobileMain
          this.personalId = data[0].personalId
        }
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
      )
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
        this.resetPage()
        // 显示遮罩
        this.disabledStatus = 'block'
        // 清空orderId
        this.checkOrderId = 0
        // 停止禁用保存草稿
        this.saveDraftDisabled = false
      }
    })
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding: 15px;
}
.info-container {
  margin-bottom: 100px;
}

.fixed-container {
  height: 65px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 10;
  text-align: right;
  padding: 10px 20px;
  box-shadow: 0px -5px 10px #ccc;
}

.emptyText {
  font-size: 32px;
  color: #ccc;
  font-weight: bold;
  background: #f2f2f2;
  height: 500px;
  text-align: center;
  line-height: 500px;
  letter-spacing: 1px;
  box-shadow: 0px 0px 5px #ccc;
}

.remark {
  width: 80% !important;
}
</style>
