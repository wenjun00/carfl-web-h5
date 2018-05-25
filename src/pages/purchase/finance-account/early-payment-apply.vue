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
        <gather-detail-early-pay :typeData="false" ref="gather-detail-early-pay"></gather-detail-early-pay>
      </i-tab-pane>
      <i-tab-pane name="upload-the-fodder" label="上传素材">
        <upload-the-fodder ref="upload-the-fodder"></upload-the-fodder>
      </i-tab-pane>
    </i-tabs>

    <div v-show="!applyModel.orderId" class="emptyText">
      请先填写证件信息
    </div>
    <div v-show="applyModel.orderId && !hasApprove" class="fixed-container">
      <i-button size="large" class="highButton" @click="saveAndCommit">保存并提交</i-button>
    </div>

  </section>
</template>
<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import UploadTheFodder from '~/components/purchase-manage/upload-the-fodder.vue'
import GatherDetailEarlyPay from '~/components/purchase-manage/gather-detail-early-pay.vue'
import { WithdrawApplicationService } from "~/services/manage-service/withdraw-application.service"

@Layout('workspace')
@Component({
  components: {
    UploadTheFodder,
    GatherDetailEarlyPay
  }
})
export default class EarlyPaymentApply extends Page {
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

  private orderNumberIdModels: Array<any> = []
  private personalId: Number = 0
  private checkOrderId: Number = 0
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
  private hasApprove = true; // 改订单不可被提交

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

  private async getUserInfo() {
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

  private resetPage(newIdCard?: string) {
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
  private changeOrderId(val) {
    if (val) {
      this.checkOrderId = val // 将选择的订单号传给变更收款项按钮点击事件中
      this.saveDraftModel.orderId = val // 保存草稿所需orderId

      //先让收费项目获取基础数据，
      this.gatherDetail.changeGatherItem(val).then(() => {
        //然后设置还原数据
        this.withdrawApplicationService
          .getAdvanceRevokeApplicationInfo(this.personalId, val)
          .subscribe(
            data => {
              this.applyModel.remark = data.remark
              this.applyModel.withdrawType = data.withdrawType
              // 获取收款项和备注信息
              this.gatherDetail.makeListdataSet(data)
              if (data.personalBank && data.personalBank.personalName) {
                this.saveDraftModel.accountName = data.personalBank.personalName // 获取保存草稿时需要的accountName
              }
              this.hasApprove = false
            }, err => this.$Message.error(err.msg))
      }).catch(() => { })
    }
  }

  private getModel() {
    this.saveDraftModel.financeUploadResources = this.uploadthefodder.fodderList
    this.saveDraftModel.remark = this.applyModel.remark

    // 获取各项费用
    for (let key in this.saveDraftModel) {
      let row = this.gatherDetail.saleItemList.find(v => v.itemName === key && v._checked)
      if (row) {
        this.saveDraftModel[key] = row.itemMoney
      }
    }
    this.saveDraftModel.totalPayment = this.gatherDetail.totalMoney
  }

  /**
   * 保存并提交
   */
  private saveAndCommit() {
    let customerform: any = this.$refs['customer-form']
    customerform.validate(valid => {
      if (!valid) {
        return false
      } else {
        if (this.gatherDetail.totalMoney === 0) {
          this.$Message.warning('未添加收款项，请添加收款项！')
          return false
        }
        this.getModel()
        let saveAndCommitModel = this.saveDraftModel
        this.withdrawApplicationService
          .saveAdvancePayoffApplication(saveAndCommitModel)
          .subscribe(
            data => {
              this.$Message.success('保存并提交成功！')
              this.resetPage()
            }, err => this.$Message.error(err.msg))
      }
    })
  }





  /**
   * 获取订单信息
   */
  private getOrderInfo() {
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
  private clearAll() {
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
